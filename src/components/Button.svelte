<script>
  /** How to call user */
  export let text = false;
  export let href = false;
  export let invert = false;
  export let disabled = false;
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

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">

//- TODO Подумать над rel='prefetch' и rel='external'
+if('href')
  a.btn( rel='prefetch' href='{href}' class='{cls}' disabled='{disabled}' on:click )
    +if('text')
      span {text}

  +else
    button.btn( class='{cls}' disabled='{disabled}' on:click )
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

@define-mixin icons--invert $size
  &.search
    &:after, &:before
      content: url('/icons/$(size)/search-w.svg')
  &.chat
    &:after, &:before
      content: url('/icons/$(size)/chat-w.svg')

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

  color: var( --color--btn-txt---blue)
  font-style: normal
  font-weight: normal
  text-align: center
  white-space: nowrap

  border-width: 1px
  border-style: solid
  border-color: var(--color--btn-border)
  border-radius: 12px

  /* overflow: hidden
  width: 100% */

  transition: .2s
  cursor: pointer

  &:hover
    border-color: var(--color--btn-border---active)

  &:focus
    outline: none

  &:active
    transform: translateY(2px)

  &:disabled
    cursor: default
    & span
      opacity: .3
    &:hover
      border-color: var(--color--btn-border)
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

    &.showIconL span
      margin-left: 12px
      // visual compensation
      margin-bottom: 0


    &.showIconR span
      margin-right: 16px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)
      @mixin icons--base 23

    &.invert
      background-color: var(--color--btn-bg---white)
      @mixin icons--invert 23



  &.mini
    height: 29px
    padding: 0 12px
    padding-bottom: 1px

    font-size: 14px
    line-height: 1.2

    &.showIconL span
      margin-left: 12px

    &.showIconR span
      margin-right: 12px

    &:before, &:after
      margin-top: 4px
      margin-left: -6px
      margin-right: -6px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)
      @mixin icons--base 17

    &.invert
      background-color: var(--color--btn-bg---white)
      @mixin icons--invert 17

      &.search
        &:after, &:before
          content: url('/icons/17/search-w.svg')
      &.chat
        &:after, &:before
          content: url('/icons/17/chat-w.svg')

  &.small
    height: 21px
    padding: 0 8px
    padding-bottom: 1px

    font-size: 11px
    line-height: 14px
    letter-spacing: .3px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)

    &.invert
      background-color: var(--color--btn-bg---white)


</style>