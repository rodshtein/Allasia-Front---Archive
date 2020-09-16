<script>
import { onMount, onDestroy} from 'svelte';
import { fly } from 'svelte/transition';
import { sineOut } from 'svelte/easing';
import Button from './Button.svelte'
import Header from './Popup-header.svelte'

export let show = false;
export let header = false;

let isMounted = false;
let modal;
let previouslyFocused;

onMount(() => {
  isMounted=true
  // show=true;
  });

$:show, fix_content(show);

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

  if (!window.fix_content__content_scroll) {
    window.fix_content__content_scroll = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  }

  if (param) {
    window.fix_scroll_value = fix_content__content_scroll;
    // Фиксируем контейнер
    container.classList.add('fixed');
    container.style.top = '-' + ( fix_content__content_scroll + 0 ) + 'px';

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Keyboard control
    document.addEventListener( 'keydown', handleKeydown);
    previouslyFocused = typeof document !== 'undefined' && document.activeElement;

  } else {
    document.removeEventListener( 'keydown', handleKeydown);
    if (previouslyFocused) previouslyFocused.focus();

    // Убираем фикс
  	container.classList.remove('fixed');
    container.style.top = "";

    document.body.scrollTop = fix_scroll_value;
    document.documentElement.scrollTop = fix_scroll_value;
    delete window.fix_scroll_value;
    delete window.fix_content__content_scroll;
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
+if('show')
  .popup(
    role='dialog'
    aria-modal='true'
    bind:this='{modal}'
    use:portalAction
    )
    .wrapper
      .body(in:fly='{{duration: 300, y: 100, opacity: 0.5, easing: sineOut}}')
        Header(bind:show='{show}' header='{header}' on:click)
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
      background: #f5f7ffa6
      backdrop-filter: blur(0)
      opacity: 0
      transition:
        opacity .4s ease-in,
        top .0s ease-in .4s
      z-index: 100
      will-change: opacity, backdrop-filter

    &.fixed
      position: fixed
      width: 100%

      &:before
        backdrop-filter: blur(20px)
        top: 0
        opacity: 1
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

.wrapper
  display: flex
  justify-content: center
  margin: 20px

.body
  display: block
  width: fit-content
  z-index: 1
  position: relative
  margin-bottom: 100px
  padding: 0
  max-width: 600px

  background: #ffffffa6
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
</style>