// pan swipe
// reel ribbon

import { onMount, afterUpdate } from 'svelte';
import { closest, morph } from './helpers'
import { animate, easing, back } from './animate'

export function nailer(node, {
  time = 1430,
  switchPoint = 100,
  calcA = 60,
  calcB = 4,
  calcTimeout = 100,
  leftShift = 0,
  rightShift = 0,
}={}) {

  // initial props
  let downX, nodeX, pathX, pointerX;

  // Cacl force
  let force, vectorForce, Tmark, Xmark;

  // Buttons Handlers
  function setBtn(node, direction){
    // node
  }

  function slideTo(direction){

    cancelAnimationFrame(node.NAILER.animation)
    let cords = node.NAILER.stepCords;
    let startPos = node.NAILER.x;

    if (direction == 'right'){
      for (let i = 0; i < cords.length; i++) {
        if( cords[i] >= startPos && startPos >= cords[i+1]) {
          if(cords[i] == startPos) {
            if (i + 1 < cords.length) slide(cords[i + 1])
            break
          } else {
            if (i + 2 < cords.length) slide(cords[i + 2])
            break
          }
        }
      }
    }

    if (direction == 'left'){
      for(var i = cords.length; i--;) {

        if( cords[i] <= startPos && startPos <= cords[i-1]) {
          if(cords[i] == startPos) {
            if (i-1 >= 0) slide(cords[i-1])
            break
          } else {
            if (i-2 >= 0) slide(cords[i-2])
            break
          }
        }
      }
    }

    function slide(point) {
      let calc = point - startPos;
      node.NAILER.animationId++
      animate({
        id: node.NAILER.animationId,
        node,
        duration: 1000,
        timing: easing.easeOutQuart,
        draw: (progress) => {
          node.style.transform = `translate(${startPos + (progress * calc)}px)`
          node.NAILER.x = startPos + (progress * calc)
          checkOverflow()
        },
      })
    }
  }

  function calcForce() {
    let Tcurr = performance.now();

    // flash every x ms
    if(Tcurr - Tmark < calcTimeout) return

    let Tdiff = Tcurr - Tmark;

    // calc posistion diff
    let diff = pointerX - Xmark > 0
      ? pointerX - Xmark
      : Xmark - pointerX ;
    let vectorDiff = pointerX - Xmark;

    force = diff/Tdiff
    vectorForce = vectorDiff/Tdiff

    // next loop
    Tmark = Tcurr
    Xmark = pointerX
  }

  function calcSteps(){
    // Calc step cords
    let stepCords=[];
    let children = node.childNodes;
    let wrapWidth = node.parentNode.clientWidth;
    let nodeWidth = node.scrollWidth;
    let margin = node.offsetLeft;

    // TODO need change array to set
    // to prevent unique values (for multiline sliders)
    // https://learn.javascript.ru/map-set#set

    for (let node of children) {
      if ( node.offsetLeft <= nodeWidth - wrapWidth - margin * 2 ){
        stepCords.push(node.offsetLeft*-1);
      } else {
        if (!stepCords.length) stepCords.push(0)
        // align last item ro right
        // adds right shift by the way
        if (stepCords.length >= 1 && nodeWidth > wrapWidth - margin * 2 ||
          nodeWidth > wrapWidth - margin * 2){
            stepCords.push((nodeWidth - wrapWidth + margin * 2 + rightShift)/-1)
            break
        }
      }
    }

    stepCords.sort( (a, b) => b - a );
    // adds left shift for all item except first and last
    // we can do it only after sort, because slide can be multiline
    // and item on next line can be closer to left/right than first
    for (let i = 1; i < stepCords.length - 1 ; i++) {
        stepCords[i] += leftShift
    }

    node.NAILER.hiPoint = stepCords[stepCords.length-1]
    node.NAILER.stepCords = stepCords;
  }

  function checkOverflow(){
    // Events
    let e = (data) => new CustomEvent( "update", { detail: data });

    let lastCord = node.NAILER.stepCords[node.NAILER.stepCords.length-1];
    // Overside starts
    if( Math.round(node.NAILER.x) < 0 && !node.NAILER.overflowL) {
      node.NAILER.overflowL = true
      node.dispatchEvent(e({type: "overflowL", status: true}));
    }
    if(	Math.round( node.NAILER.x) > lastCord && !node.NAILER.overflowR) {
      node.NAILER.overflowR = true
      node.dispatchEvent(e({type: "overflowR", status: true}));
    }

    //Overside ends
    if( Math.round(node.NAILER.x) >= 0 && node.NAILER.overflowL){
      node.NAILER.overflowL = false
      node.dispatchEvent(e({type: "overflowL", status: false}));
     }
    if(Math.round( node.NAILER.x) <= lastCord && node.NAILER.overflowR) {
      node.NAILER.overflowR = false
      node.dispatchEvent(e({type: "overflowR", status: false}));
    }
  }

  // Reactive functions
  onMount(init)
  afterUpdate(init)

  function init(){
    node.addEventListener('mousedown', onDown);
    node.addEventListener('touchstart', onDown);
    if(!node.NAILER) node.NAILER = {
      x: 0,
      hiPoint: 0,
      animationId: 1,
      animDirection: null,
      isAnimated: false,
      isMovedTo: false,
    };

    // init styling
    node.style.cursor = 'grab'
    node.style.touchAction = 'pan-y'
    node.style.willChange = 'transform'
    node.style.transform = 'translate(0)'
    // need to fix freeze over mouse move
    node.parentNode.style.zIndex = '1'
    node.style.zIndex = '1'
    calcSteps()
    checkOverflow()
  }

  function onDown(e) {

    calcSteps()

    // Stop All Animation by change anim id
    // TODO make reactive add speed if allready scroll
    // Prevent kill animation if we contine slide
    // on prev directoin
    node.NAILER.animationId++

    // cacl Force initial values
    downX = morph(e).clientX;
    Tmark = performance.now()
    Xmark = downX
    node.style.cursor = 'grabbing'


    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  }

  function onMove(e) {

    pointerX = morph(e).clientX
    pathX = pointerX - downX
    nodeX = node.NAILER.x


    // corner grips
    let point = nodeX+pathX;
    let moveToPoint = point;
    let easePoint = pointerX // ← if is 0 nothing calculate
      ? nodeX + ( pathX / ( pointerX / ( pointerX / 5 )))
      : nodeX;


    // if is get over left border
    if (point > 0) {
      moveToPoint = easePoint
    }
    // if is get over right border
    if ((point) < node.NAILER.hiPoint ) {
      moveToPoint = easePoint
    }

    node.style.transform = `translate(${moveToPoint}px)`

    calcForce()

    node.NAILER.x = moveToPoint

    downX = morph(e).clientX

    // TODO infinity drag
    // need to calc windows size and position on screen
    // and move down point if pointer on edge
    // downX = morph(e).clientX + window.screenLeft
    // 	? morph(e).clientX >= window.screen.width-1
    // 		? morph(e).clientX - 6
    // 		: morph(e).clientX
    // 	: 6

    checkOverflow()
  }

  function onUp() {
    // Fixed issue when you drag a mouse
    // and freeze for some time at the end point
    calcForce()

    // let closestPos = cb(closest(node.NAILER.stepCords, node.NAILER.x));
    let closestPos = closest(node.NAILER.stepCords, node.NAILER.x);
    // let startPos = node.NAILER.ss != node.NAILER.x ? node.NAILER.ss : node.NAILER.x ;
    let startPos = node.NAILER.x;

    // force scroll
    let distance = calcA * vectorForce * calcB * vectorForce;
    let endPoint = vectorForce > 0
      ? startPos + distance
      : startPos - distance;
    // let closesForcePoint = cb(closest(node.NAILER.stepCords, endPoint));
    let closesForcePoint = closest(node.NAILER.stepCords, endPoint);
    let duration = force * time;

    // prepare
    let _duration = duration > switchPoint &&
        // duration always more than 1000
        duration > 1000 &&
         // ↓ if is no scrollble set time to 1000
        startPos > node.NAILER.hiPoint &&
        startPos < 0
        ? duration < 1500
          ? duration
          : 1500
        : 1000;
    let finish = duration > switchPoint &&
        // duration always more than 1000
        duration > 1000 &&
        // ↓ if is no scrollble set time to 1000
        startPos > node.NAILER.hiPoint &&
        startPos < 0
        ? closesForcePoint
        : closestPos
    let calc = finish - startPos;


    node.NAILER.animDirection = finish < startPos ? 'left' : 'right';


    function makeEaseOut(timing) {
      return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }


    let timing = 0 < endPoint || endPoint < node.NAILER.hiPoint
      ?  node.NAILER.hiPoint < startPos && startPos < 0
        ? makeEaseOut(back)
        : easing.easeOutQuart
      : easing.easeOutQuart;


    animate({
      id: node.NAILER.animationId,
      node,
      duration: _duration,
      // timing: easing.easeOutQuart,
      timing,
      draw: (progress) => {
        node.style.transform = `translate(${startPos + (progress * calc)}px)`
        node.NAILER.x = startPos + (progress * calc)
        checkOverflow()
      },
    })


    node.style.cursor = 'grab'
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
  }
  return {
    update(props) {
      if(props.time ) time = props.time
      if(props.switchPoint) switchPoint = props.switchPoint
      if(props.calcA) calcA = props.calcA
      if(props.calcB) calcB = props.calcB
      if(props.leftShift) leftShift = props.leftShift
      if(props.rightShift) rightShift = props.rightShift

      if(props.nextBtn) props.nextBtn.addEventListener(
        'click',()=>slideTo('right')
        );
      if(props.prevBtn) props.prevBtn.addEventListener(
        'click',()=>slideTo('left')
        );

    },
    destroy() {
      node.removeEventListener('mousedown', onDown);
      node.removeEventListener('touchstart', onDown);
    }
  };
}