<script>
  export let type; // regular| mini | micro
  export let iconL;
  export let iconR;

  let iconSize = {
    regular: 23,
    mini: 17
  }
</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">
button(class='btn {type}')
  +if('iconL')
    img(class='logo' alt='Иконка' src='icons/{iconSize[type]}/{iconL}.svg')
  slot
  +if('iconR')
    img(class='logo' alt='Иконка' src='icons/{iconSize[type]}/{iconR}.svg')
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

    img
      margin: 0 -10px

  &.mini
    height: 29px
    padding: 0 1.4rem
    padding-bottom: 0.1rem
    // gap: 14px

    font-size: 1.4rem
    line-height: 1.2

    img
      margin: 0 -9px

  &:hover
    border-color: var(--color--btn-border---light-blue)

  &:focus
    outline: none

    &:before
      content: ''
      position: absolute
      border: solid 1px var(--color--ORANGE)
      border-radius: 16px
      left: -5px
      right: -5px
      top: -5px
      bottom: -5px


  &:active
    transform: translateY(2px)



</style>