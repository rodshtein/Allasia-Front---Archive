<script>
  export let invert;
  export let href;
    /**
   * Specify the kind of button
   * @type {"regular" | "mini" | "small" | "micro"} [size="regular"]
   */
  export let size;
  export let iconOnly;
  export let iconL;
  export let iconR;


  let iconOnlyClass = iconOnly ? 'iconOnly' : '';
  let bgClass = invert ? 'invert' : 'base-color';
  let typeClass = size ? size : 'regular';
  let showIcons = typeClass === 'regular' || size === 'mini'
    ? true
    : false;
  // showing only one side icon
  let iconLclass = iconL && !iconR ? iconL : '';
  let iconRclass = iconR ? iconR: '';
  let showIconL = showIcons && iconL && !iconR ? 'showIconL': '';
  let showIconR = showIcons && iconR ? 'showIconR': '';

  let cls = `
    ${bgClass} ${typeClass} ${iconOnlyClass}
    ${showIconL} ${iconLclass}
    ${showIconR} ${iconRclass}
  `;

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

  div(style='display: flex; flex-direction: column; align-items: center;gap: 20px; margin-top: 100px')

      Button( href='#' iconL='arrow-l' iconR='arrow-r') Вопрос-ответ
      Button( href='#' iconR='arrow-r' iconOnly)
      Button( invert iconL='search' ) Вопрос-ответ

      Button( href='#' size='mini' iconR='arrow-r' ) Вопрос-ответ
      Button( size='mini' invert  iconR='chat' ) Вопрос-ответ
      Button( size='small' invert  iconR='chat' ) Мелкая кнопка

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

  &.iconOnly span
    display: none

  &.regular
    height: 33px
    padding: 0 12px

    font-size: 17px
    line-height: 1.2

    &.showIconL span
      margin-left: 16px

    &.showIconR span
      margin-right: 16px

    &:before, &:after
      margin-top: 4px
      margin-left: -8px
      margin-right: -8px

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

</style>