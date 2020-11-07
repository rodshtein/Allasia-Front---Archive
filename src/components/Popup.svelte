<script>
import { onMount } from 'svelte';
import Button from './Button.svelte';
import Header from './Popup-header.svelte';

export let show = false;
export let width = 600;
export let header = false;
export let header2 = false;
export let imageURL = false;
export let btnText = false;

let isMounted = false;
let paintModal = false;
let modal;
let previouslyFocused;

onMount(() => {
  isMounted=true
  // show=true;
  });

$: fix_content(show);

function portalAction(node,parent){
  parent = parent || document.body;
  parent.appendChild(node);
}

//  Фиксируем контент при показе попапов
function fix_content(param) {
  if (!isMounted) return;

  var body = document.body,
    docEl = document.documentElement,
    container = document.getElementById('sapper');


  if (param) {
    let scrollY = window.pageYOffset
      || docEl.scrollTop
      || body.scrollTop;

    window.fix_scroll_value = scrollY;
    // Фиксируем контейнер
    container.classList.add('fixed');
    container.setAttribute( 'aria-hidden', 'true');

    container.style.top = '-' + ( scrollY + 0 ) + 'px';

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    paintModal = true;

    // Keyboard control
    document.addEventListener( 'keydown', handleKeydown);
    previouslyFocused = typeof document !== 'undefined' && document.activeElement;

  } else {
    paintModal = false;

    document.removeEventListener( 'keydown', handleKeydown);
    if (previouslyFocused) previouslyFocused.focus();

    // Убираем фикс
    container.classList.remove('fixed');
    container.removeAttribute( 'aria-hidden' );
    container.style.top = "";

    document.body.scrollTop = fix_scroll_value;
    document.documentElement.scrollTop = fix_scroll_value;
    delete window.fix_scroll_value;
  }
}

// Keyboard control
function handleKeydown(e) {
  if (e.keyCode == 27 || e.key === 'Escape' && show) {
    show = false;
    return
  }

  if (e.keyCode == 9 || e.key === 'Tab') {
    // trap focus
    const nodes = modal.querySelectorAll('*');
    const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

    let index = tabbable.indexOf(document.activeElement);
    if (index === -1 && e.shiftKey) index = 0;

    index += tabbable.length + (e.shiftKey ? -1 : 1);
    index %= tabbable.length;

    tabbable[index].focus();
    e.preventDefault();
  }
}


</script>


<template lang="pug">
+if('paintModal')
  .popup(
    role='dialog'
    aria-modal='true'
    bind:this='{modal}'
    use:portalAction
    )
    .wrapper
      .body(style='max-width: {width}px')
        Header(
          bind:show='{show}'
          header='{header}'
          header2='{header2}'
          imageURL='{imageURL}'
          btnText='{btnText}'
          on:click
        )
        .slot-wrapper
          slot
        footer
          Button( on:click!='{() => show=!show}' text='Закрыть')

</template>

<style lang="postcss">
@import "../style/mixins.sss"

:global
  #sapper
    &:before
      content: ""
      display: block
      position: fixed
      height: 100%
      width: 100%
      top: -100vh
      left: 0px
      background: var(--MILK-BLUE)
      opacity: 0
      transition:
        opacity .4s ease-in,
        top .0s ease-in .4s
      z-index: 100
      will-change: opacity

    &.fixed
      position: fixed
      width: 100%

      &:before
        top: 0
        opacity: .9
        will-change: opacity
        transition:
          opacity .5s ease-out,
          top .0s ease-out .0s


.popup
  display: block
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  @media( width < 650px )
    top: 30vh

.wrapper
  display: flex
  justify-content: center
  margin: 20px

  animation:
    name: showUp, opacity
    duration: 400ms, 500ms
    timing-function: ease-out, ease-in

.body
  display: block
  width: 100%
  z-index: 1
  position: relative
  margin-bottom: 100px
  padding: 0
  overflow: hidden

  background: #ffffff
  border: solid 1px var(--color--borders---popup)
  border-radius: var(--radius--popup)
  @mixin popup_shadow

  .slot-wrapper
    padding:
      left: 15px
      right: 15px
      bottom: 15px

  footer
    display: flex
    flex-direction: column
    padding: 15px


@keyframes showUp
  0%
    transform: translateY(50px)
  100%
    transform: translateY(0px)

@keyframes opacity
  0%
    opacity: 0
  100%
    opacity: 1
</style>