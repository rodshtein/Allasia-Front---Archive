<script>
  export let invert;
  export let href;
    /**
   * Specify the kind of button
   * @type {"regular" | "mini" | "micro"} [type="regular"]
   */
  export let type;
  export let iconL;
  export let iconR;


  let bgClass = invert ? 'invert' : 'base-color';
  let typeClass = type ? type : 'regular';
  let iconLclass = iconL ? iconL : '';
  let iconRclass = iconR ? iconR : '';
  let showIconL = iconL ? 'showIconL': '';
  let showIconR = iconR ? 'showIconR': '';

  let cls = `${bgClass} ${typeClass}
    ${showIconL} ${iconLclass}
    ${showIconR} ${iconRclass}`;

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">
+if('href')
  a.btn( href='{href}' class='{cls}' )
    slot
  +else
    button.btn( class='{cls}' )
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

  color: var( --color--btn-txt---blue)
  font-style: normal
  font-weight: normal
  text-align: center

  border-width: 1px
  border-style: solid
  border-color: var(--color--btn-bg---light-blue)
  border-radius: 12px

  transition: .2s
  cursor: pointer

  &:hover
    border-color: var(--color--btn-border---active)

  &:focus
    outline: none

  &:active
    transform: translateY(2px)

  // icons styles
  &:after, &:before
    display: none

  &.showIconL:before,
  &.showIconR:after
    display: block

  &.regular
    height: 33px
    padding: 0 14px

    font-size: 17px
    line-height: 1.2

    &:before
      margin-top: 4px
      margin-left: -9px
      margin-right: 7px

    &:after
      margin-top: 4px
      margin-left: 7px
      margin-right: -9px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)

      &.arrow-b---short
        &:after, &:before
          content: url('/icons/23/arrow-b---short.svg')
      &.arrow-l
        &:after, &:before
          content: url('/icons/23/arrow-l.svg')
      &.arrow-r
        &:after, &:before
          content: url('/icons/23/arrow-r.svg')
      &.handset
        &:after, &:before
          content: url('/icons/23/handset.svg')
      &.question
        &:after, &:before
          content: url('/icons/23/question.svg')
      &.search
        &:after, &:before
          content: url('/icons/23/search.svg')
      &.spinner
        &:after, &:before
          content: url('/icons/23/spinner.svg')

    &.invert
      background-color: var(--color--btn-bg---white)

      &.search
        &:after, &:before
          content: url('/icons/23/search---w.svg')
      &.chat
        &:after, &:before
          content: url('/icons/23/chat---w.svg')

  &.mini
    height: 29px
    padding: 0 1.4rem
    padding-bottom: 0.1rem

    font-size: 1.4rem
    line-height: 1.2

    &:before
      margin-top: 4px
      margin-left: -9px
      margin-right: 6px

    &:after
      margin-top: 4px
      margin-left: 6px
      margin-right: -9px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)

      &.arrow-b---short
        &:after, &:before
          content: url('/icons/17/arrow-b---short.svg')
      &.arrow-l
        &:after, &:before
          content: url('/icons/17/arrow-l.svg')
      &.arrow-r
        &:after, &:before
          content: url('/icons/17/arrow-r.svg')
      &.handset
        &:after, &:before
          content: url('/icons/17/handset.svg')
      &.question
        &:after, &:before
          content: url('/icons/17/question.svg')
      &.search
        &:after, &:before
          content: url('/icons/17/search.svg')

    &.invert
      background-color: var(--color--btn-bg---white)

      &.search
        &:after, &:before
          content: url('/icons/17/search---w.svg')
      &.chat
        &:after, &:before
          content: url('/icons/17/chat---w.svg')

</style>