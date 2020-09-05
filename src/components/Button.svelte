<script>
  export let invert;
  export let href;
    /**
   * Specify the kind of button
   * @type {"regular" | "mini" | "micro"} [size="regular"]
   */
  export let size;
  export let iconL;
  export let iconR;


  let bgClass = invert ? 'invert' : 'base-color';
  let typeClass = size ? size : 'regular';
  // Buttons can be showing only whith one icon
  console.log (iconL && iconR === undefined )
  let iconLclass = iconL && iconR === undefined ? iconL : '';
  let iconRclass = iconR;
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
    span
      slot
  +else
    button.btn( class='{cls}' )
      span
        slot

//- for tests

  div(style='display: flex; flex-direction: column; align-items: center;gap: 20px')
    Button( href='#' iconR='arrow-r' iconL='arrow-r' ) Вопрос-ответ
    Button( invert iconL='search' ) Вопрос-ответ

    Button( href='#' type='mini' iconR='arrow-r' ) Вопрос-ответ
    Button( type='mini' invert  iconR='chat' ) Вопрос-ответ

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
  display: flex
  position: relative
  justify-content: center
  align-items: center

  color: var( --color--btn-txt---blue)
  font-style: normal
  font-weight: normal
  text-align: center

  border-width: 1px
  border-style: solid
  border-color: var(--color--btn-border)
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
    display: inline-block

  &.regular
    column-gap: 16px
    height: 33px
    padding: 0 12px

    font-size: 17px
    line-height: 1.2

    &:before, &:after
      margin-top: 4px
      margin-left: -8px
      margin-right: -8px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)

      &.short_arrow-b
        &:after, &:before
          content: url('/icons/23/short_arrow-b.svg')
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
          content: url('/icons/23/search-w.svg')
      &.chat
        &:after, &:before
          content: url('/icons/23/chat-w.svg')

  &.mini
    column-gap: 12px
    height: 29px
    padding: 0 12px
    padding-bottom: 1px

    font-size: 14px
    line-height: 1.2


    &:before, &:after
      margin-top: 4px
      margin-left: -6px
      margin-right: -6px

    &.base-color
      background-color: var(--color--btn-bg---light-blue)

      &.short_arrow-b
        &:after, &:before
          content: url('/icons/17/short_arrow-b.svg')
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
          content: url('/icons/17/search-w.svg')
      &.chat
        &:after, &:before
          content: url('/icons/17/chat-w.svg')

</style>