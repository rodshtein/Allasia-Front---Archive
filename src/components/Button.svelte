<script>
  import ArrowL from './icons/23/arrow---l.svg'
  import ArrowR from './icons/23/arrow---R.svg'

  export let regular;
  export let iconL = false;
  export let iconR = false;

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">

+if('regular')
  button.btn
    svelte:component(this="{iconL}")
    span
      slot
        span button
    svelte:component(this="{iconR}")

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
  font-size: 1.7rem
  line-height: 1.2
  padding: .6rem
  gap: 8px

  border-width: 2px
  border-style: solid

  font-style: normal
  font-weight: normal
  text-align: center

  display: inline-flex
  justify-content: center
  align-items: center

  background-color: var(--color--btn-bg---light-blue)
  color: var( --color--btn-txt---blue)
  border-color: transparent
  border-radius: 12px
  transition: .2s
  cursor: pointer

  &:hover
    background-color: hsl(220, 90%, 50%)

  &:focus
    outline: none
    box-shadow: 0px 0px 0px 2px hsla(220, 90%, 56%, 0.2)

  &:active
    transform: translateY(2px)

  span
    margin-left: 8px
    margin-right: 8px

</style>