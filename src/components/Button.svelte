<script>
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';

  /** How to call user */
  export let text = false;
  export let href = false;
  export let invert = false;
  export let disabled = false;
  export let loading = false;
    /**
   * Specify the kind of button
   * @type {"regular" | "mini" | "small" | "micro"} [size="regular"]
   */
  export let size= 'regular';
  export let iconL= false;
  export let iconR= false;

  let bgClass = invert ? 'invert' : 'base-color';
  let showIcons = size === 'regular' || size === 'mini'
    ? true
    : false;
  // showing only one side icon
  let iconLclass = iconL && !iconR ? iconL : '';
  let iconRclass = iconR ? iconR: '';
  let showIconL = showIcons && iconL && !iconR ? 'showIconL': '';
  let showIconR = showIcons && iconR ? 'showIconR': '';

  let cls = `
    ${bgClass} ${size}
    ${showIconL} ${iconLclass}
    ${showIconR} ${iconRclass}
  `;


  // onMount(() => {
  //   console.log('onMount');
  //   disabled = false
  // });

  // beforeUpdate(() => {
  //   console.log('beforeUpdate');
  //   disabled = true
  // });

  // afterUpdate(() => {
  //   console.log('afterUpdate');
  //   disabled = false
  // });

</script>

<template lang="pug">

  //- TODO Подумать над rel='prefetch' и rel='external'

+if('href')
  a.btn( href='{href}' class='{cls}' disabled='{disabled || loading}' on:click )
    +if('text')
      span {text}

  +else
    button.btn( class='{cls}' class:loading disabled='{disabled || loading}' on:click )
      +if('text')
        span {text}

//- for tests

</template>


<style lang='postcss'>

// icons syles
@define-mixin icons--base $size
  &.short_arrow-b
    &:after, &:before
      content: url('/icons/$(size)/short_arrow-b.svg')
  &.arrow-l
    &:after, &:before
      content: url('/icons/$(size)/arrow-l.svg')
  &.arrow-r
    &:after, &:before
      content: url('/icons/$(size)/arrow-r.svg')
  &.handset
    &:after, &:before
      content: url('/icons/$(size)/handset.svg')
  &.question
    &:after, &:before
      content: url('/icons/$(size)/question.svg')
  &.search
    &:after, &:before
      content: url('/icons/$(size)/search.svg')
  &.spinner
    &:after, &:before
      content: url('/icons/$(size)/spinner.svg')
  &.search---light
    &:before
      content: url('/icons/$(size)/search-l-w.svg')
    &:after
      content: url('/icons/$(size)/search-r-w.svg')
  &.chat---light
    &:before
      content: url('/icons/$(size)/chat-l-w.svg')
    &:after
      content: url('/icons/$(size)/chat-r-w.svg')


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
  display: flex
  position: relative
  justify-content: center
  align-items: center

  color: var(--color--btn--txt---main)
  font-family: var(--font--main)
  font-style: normal
  font-weight: 400
  text-align: center
  white-space: nowrap

  border-width: 1px
  border-style: solid
  border-color: var(--color--btn--border---main)
  border-radius: 12px

  /* overflow: hidden
  width: 100% */

  /* transition: transform .2s

  BUG Transition on buttons cause flash with popups
  */
  cursor: pointer
  user-select: none

  &:hover
    border-color: var(--color--btn--border---active)

  &:focus
    outline: none

  &:active
    transform: translateY(2px)

  &:disabled
    & span
      opacity: .3
    &:hover
      border-color: var(--color--btn--border---main)
    &:active
      transform: translateY(0)
    &:after, &:before
      opacity: .2

  // icons styles
  &:after, &:before
    display: none

  &.showIconL:before,
  &.showIconR:after
    display: inline-block

  &.regular
    height: 33px
    padding: 0 12px

    font-size: 17px
    line-height: 1.2

    &:before, &:after
      margin-top: 4px
      margin-left: -8px
      margin-right: -8px

    & span
      margin-bottom: 2px

    &.showIconL span
      margin-left: 12px

    &.showIconR span
      margin-right: 16px

    &.base-color
      font-weight: 450
      background-color: var(--color--btn--bg---light)
      @mixin icons--base 23

    &.invert
      background-color: none
      border-color: var(--color--btn--border---invert)
      color: var(--color--btn--txt---invert)

      &:hover
        border-color: var(--color--btn--border---invert---active)



  &.mini
    height: 29px
    padding: 0 12px
    padding-bottom: 1px

    font-size: 15px
    line-height: 1.2
    font-weight: 450

    &.showIconL span
      margin-left: 12px

    &.showIconR span
      margin-right: 12px

    &:before, &:after
      margin-top: 4px
      margin-left: -6px
      margin-right: -6px

    &.base-color
      background-color: var(--color--btn--bg---light)
      @mixin icons--base 17

    &.invert
      background-color: none
      border-color: var(--color--btn--border---invert)
      color: var(--color--btn--txt---invert)

      &:hover
        border-color: var(--color--btn--border---invert---active)

  &.small
    height: 21px
    padding: 0 8px
    padding-bottom: 1px

    font-size: 12px
    font-weight: 450
    line-height: 14px
    letter-spacing: .3px

    &.base-color
      background-color: var(--color--btn--bg---light)

    &.invert
      background-color: none
      border-color: var(--color--btn--border---invert)
      color: var(--color--btn--txt---invert)

      &:hover
        border-color: var(--color--btn--border---invert---active)

.loading
  animation: pulse 2.5s infinite
  cursor: progress
  span
    opacity: .3
  &:hover
    border-color: var(--color--btn--border---active)
  &:active
    transform: translateY(0)
  &:after, &:before
    opacity: .2

@keyframes pulse
  0%
    opacity: .1
  70%
    opacity: 1
  100%
    opacity: .1

</style>