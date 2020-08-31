<script>
  import { onMount } from 'svelte';

  export let invert;
  export let href;
  export let type; // regular| mini | micro
  export let iconL;
  export let iconR;


  let bgClass = invert ? 'invert' : '';
  let typeClass = type ? type : 'regular';
  let iconLClass = invert ? iconL + '---w': iconL;
  let iconRClass = invert ? iconR + '---w': iconR;
  let id = iconL || iconR
    ? 's' + Math.random().toString(36).substr(2, 9) + 's'
    : '';

  let iconSize = {
    regular: 23,
    mini: 17
  }

  let iconsClases = {
    '_': '',
    'arrow-b---short': 'arrow-b---short',
    'arrow-l': 'arrow-l',
    'arrow-r': 'arrow-r',
    'handset': 'handset',
    'question': 'question',
    'search': 'search',
    'search---w': 'search--w',
    'chat---w': 'chat--w',
    'spinner': 'spinner',
    'x': 'x',
  }

  // because if use content url path as --var
  // it's become as glith on hover animation
  // we create custom style tag and add uniq id on btn
  // then, on destroy we clean unused styles by the id

  if (id) {
    onMount(() => {
      let style = createStyle().sheet;
      let count = 0;
      if (iconL) {
        style.insertRule(`
          #${id}::before { content: url('/icons/${iconSize[type]}/${iconsClases[iconLClass]}.svg') }
      `, style.cssRules.length)
        count++
      }
      if (iconR) {
        style.insertRule(`
          #${id}::after { content: url('/icons/${iconSize[type]}/${iconsClases[iconRClass]}.svg') }
      `, style.cssRules.length)
        count++
      }
      if (count) return () => removeStyle(id, count)
    });
  }



  function createStyle(){
    let style = document.getElementById('specialStyle');
    if (style) return style;

    let head = document.head;
    style = document.createElement('style');
    style.id = 'specialStyle';
    head.appendChild(style);
    style.type = 'text/css';

    return style;
  }

  function removeStyle(id, count){
    let style = document.getElementById('specialStyle');
    if(style && style.sheet && style.sheet.cssRules){
      let nodes = style.sheet.cssRules;
      let reg = new RegExp(id,'g');

      let i = 0;
      let con = true;
      let delCount = 0;
      while (con) {
        if(nodes[i].selectorText.match(reg)){
          style.sheet.deleteRule(i)
          delCount++
        } else {
          i++
        }
        con = i < nodes.length || delCount < count
        ? true
        : false;
      }
    }
  }

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">
+if('href')
  a.btn(
      id='{id}'
      href='{href}'
      class='{bgClass, typeClass, iconRClass, iconLClass}'
    )
    slot
  +else
    button.btn(
        id='{id}'
        class='{bgClass, typeClass, iconRClass, iconLClass}'
      )
      slot
</template>

<style lang='postcss'>
// ### Buttons @@@
// reset

button
  background-color: transparent
  padding: 0
  border: 0
  border-radius: 0
  appearance: none
a
  text-decoration: none

.btn
  display: inline-flex
  position: relative
  justify-content: center
  align-items: center

  font-style: normal
  font-weight: normal
  text-align: center

  border-width: 1px
  border-style: solid
  border-color: transparent

  background-color: var(--color--btn-bg---light-blue)
  color: var( --color--btn-txt---blue)

  transition: .2s
  cursor: pointer

  border-radius: 12px

  &.regular
    height: 35px
    padding: 0 1.4rem
    // gap: 18px

    font-size: 1.7rem
    line-height: 1.2

  &.mini
    height: 29px
    padding: 0 1.4rem
    padding-bottom: 0.1rem
    // gap: 14px

    font-size: 1.4rem
    line-height: 1.2

  &:hover
    border-color: var(--color--btn-border---light-blue)

  &:focus
    outline: none

  &:active
    transform: translateY(2px)

</style>