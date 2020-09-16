<script>
  import Popup from './Popup.svelte';
  import Button from './Button.svelte';

  // Content
  export let header;
  export let content;
  export let btnTxt = 'Читать полностью';

  let showContent;
  let CH,WH;

</script>

<template lang='pug'>

.list-wrapper
  .list-1
    .content(bind:offsetHeight='{CH}')
      .wrap(bind:offsetHeight='{WH}')
        .medical-page-description
          +html('content')
    +if('CH < WH')
      Button(
          size="small"
          text="{btnTxt}"
          on:click!='{() => showContent=!showContent}'
        )
      Popup(
        bind:show!='{showContent}'
        header='{header}')
        .popup-devider.devider
        .medical-page-description
          +html('content')
  .list-2
  .list-3

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.list-wrapper
  position: relative

  .list-1
    display: flex
    flex-direction: column
    align-items: flex-start
    position: relative
    z-index: 3
    padding: 23px 19px
    margin-right: 10px
    border-radius: var(--radius--block)
    border: solid 1px var(--color--borders---card-white)
    background-color: var(--color--bg--card)
    box-shadow: 0px 3px 2px rgba(165, 184, 253, 0.61)
    &:before
      content: url('/icons/special/clip.svg')
      position: absolute
      bottom: 20px
      right: -19px
      z-index: 4

    .content
      overflow: hidden
      max-height: 230px
      margin-bottom: 20px
      position: relative

      &:after
        content: ''
        position: absolute
        background:
          linear-gradient(
            180deg,
            #ffffff00 0%,
            #ffffffa8 41.71%,
            #FFFFFF 86.98%
          )
        height: 40px
        width: 100%
        position: absolute
        bottom: 0

  .list-2
    position: absolute
    top: 7px
    left: 5px
    height: 100%
    width: calc(100% - 10px)
    z-index: 2
    border-radius: var(--radius--block)
    border: solid 1px var(--color--borders---card-white)
    background-color: var(--color--bg--card)
    box-shadow: 0px 3px 2px rgba(165, 184, 253, 0.61)

  .list-3
    position: absolute
    top: 14px
    left: 10px
    height: 100%
    width: calc(100% - 10px)
    z-index: 1
    border-radius: var(--radius--block)
    border: solid 1px var(--color--borders---card-white)
    background-color: var(--color--bg--card)
    @mixin shadow


.popup-devider
  margin-bottom: 15px

:global
  .medical-page-description
    position: relative

    & .h4
      margin-top: 10px
      margin-bottom: 5px
      color: var(--color--p)

    & .p
      margin-bottom: 13px

    & ul
      padding-left: 15px
      margin: 0
      list-style: '− '

    & blockquote
      position: relative
      padding-left: 16px
      margin: 0
      margin-left: -16px

      &:after
        content: ""
        background: var(--ORANGE)
        position: absolute
        top: 3px
        bottom: 1px
        left: 0
        width: 2px
        border-radius: 10px

      & p
        font-style: italic

  </style>