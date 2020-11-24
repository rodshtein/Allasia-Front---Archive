// pan swipe
// reel ribbon

import { onMount, afterUpdate, tick } from 'svelte';
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

  // Calc step cords
  function calcSteps(){
    // We use Set Array for prevent double values
    // from multiline slider
    let stepCordsSet = new Set();
    let cards = node.children;
    // sizes
    let wrapperWidth = node.parentNode.clientWidth;
    let margin = wrapperWidth - node.offsetWidth;
    let viewport = wrapperWidth - margin;
    let sliderWidth = node.scrollWidth;
    let viewportOverflowWidth = sliderWidth - viewport;

    for(let card of cards) {

      if( card.offsetLeft <= viewportOverflowWidth ){
        stepCordsSet.add( card.offsetLeft*-1 )

      } else {
        // I have no idea why I make it, temp off
        // and off second condition depends off it ↓↓↓
        // if (!stepCordsSet.size) stepCordsSet.add(0)

        // align last item ro right
        // adds right shift by the way
        // temp off, read ↑↑↑
        // if (  stepCordsSet.size >= 1 && sliderWidth > viewport || sliderWidth > viewport
        if( sliderWidth > viewport ){
            stepCordsSet.add( (sliderWidth - wrapperWidth + margin + rightShift)/-1 )
            break
        }

      }
    }

    let stepCords = [...stepCordsSet]

    // Sort cords because we can get unsorted data from
    // multiline sliders
    stepCords.sort( (a, b) => b - a );

    // adds left shift for all item except first and last
    // we can do it only after sort, because slide can be multiline
    // and item on next line can be closer to left/right than first
    if(leftShift){
      for (let i = 1; i < stepCords.length - 1 ; i++) {
        stepCords[i] += leftShift
      }
    }

    node.NAILER.hiPoint = stepCords[stepCords.length-1]
    node.NAILER.stepCords = stepCords;
  }

  function checkOverflow(){
    // throttle
    if(!node.NAILER.throttleCheckOverflow) {

      node.NAILER.throttleCheckOverflow = true

      setTimeout(()=> {
        checkOverflow()
        node.NAILER.throttleCheckOverflow = false
      }, 50)

      return
    };

    // Events
    let e = (data) => new CustomEvent( "update", { detail: data });

    // get bigger cordinate from cords array
    let lastCord = node.NAILER.stepCords[node.NAILER.stepCords.length-1];

    // console.log(node)
    // console.log(node.NAILER)
    // console.log(lastCord)

    // Overside starts
    // - left
    if( Math.round(node.NAILER.x) < 0 && !node.NAILER.overflowL) {
      node.NAILER.overflowL = true
      node.dispatchEvent(e({type: "overflowL", status: true}));
    }
    // - right
    if(	Math.round( node.NAILER.x) > lastCord && !node.NAILER.overflowR) {
      node.NAILER.overflowR = true
      node.dispatchEvent(e({type: "overflowR", status: true}));
    }

    //Overside ends
    // - left
    if( Math.round(node.NAILER.x) >= 0 && node.NAILER.overflowL){
      node.NAILER.overflowL = false
      node.dispatchEvent(e({type: "overflowL", status: false}));
     }
    // - right
    if(Math.round( node.NAILER.x) <= lastCord && node.NAILER.overflowR) {
      node.NAILER.overflowR = false
      node.dispatchEvent(e({type: "overflowR", status: false}));
    }
  }

  // Reactive functions
  // onMount(init)
  // afterUpdate(()=>init(true))

  init()
  afterUpdate(init)

  function init(update){
    // TODO why is tick here?
    // await tick();
    node.addEventListener('mousedown', onDown);
    node.addEventListener('touchstart', onDown);
    if(!node.NAILER || update) node.NAILER = {
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
    // BUG node.style.willChange = 'transform'
    // ↑ it causes a splash on mobile devices
    node.style.transform = 'translate(0)'
    // need to fix freeze over mouse move
    node.parentNode.style.zIndex = '1'
    node.style.zIndex = '1'
    calcSteps()
    checkOverflow()

    // resizeObserver(node, function(){
    //   console.log(this.offsetWidth + ' x ' + this.offsetHeight)
    // });
  }

  function resizeObserver(node, handler){
    let frame = document.createElement('iframe');
    frame.style.cssText = `
      position:absolute;
      left:0;
      top:-100%;
      width:100%;
      height:100%;
      margin:1px 0 0;
      border:none;
      opacity:0;
      visibility:hidden;
      pointer-events:none;`;
    node.parentNode.appendChild(frame)
    frame.contentWindow.onresize = () => { handler.call(node.parentNode) };
  }

  function onDown(e) {
    // Prevent click && drag on links
    if(e.type != "touchstart") e.preventDefault()

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

    // Prevent click && drag on links
    node.onclick = () => false;

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

    // Allow click && drag on links
    // Timeout for prevent event after drag
    setTimeout(()=>{
      node.onclick = () => true;
    }, 1)

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