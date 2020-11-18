<script>
  import Popup from './Popup.svelte';
  import Button from './Button.svelte';
  import { serialize } from '../helpers.js';

  // Content
  export let header ='No header';
  export let subHeader = null;
  export let content = 'No content';
  export let btnTxt = 'Читать полностью';

  let showContent;
  let CH,WH;
  let showBtn = (CH,WH) => { return(CH-40 < WH) };

  $: description = serialize(JSON.parse(content))
</script>

<template lang='pug'>
.list-wrapper
  .list-1
    .content(bind:offsetHeight='{CH}')
      .wrap(bind:offsetHeight='{WH}')
        .content.medical-page-description
          +html('description')
    +if('showBtn(CH,WH)')
      Button(
        size="small"
        text="{btnTxt}"
        on:click!='{() => showContent=!showContent}'
      )
      Popup(
        bind:show!='{showContent}'
        header='{header}'
        header2='{subHeader}'
      )
        .content
          +html('description')
  .list-2
  .list-3
</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.list-wrapper
  position: relative
  margin-bottom: 15px

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
    box-shadow:
      6px 10px 6px -7px rgb(165 184 253 / 35%)

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
      mask-image:
        linear-gradient(
          to top,
          transparent 5%,
          black 30%,
          black 100%
        )

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
    box-shadow:
      6px 10px 6px -6px rgb(165 184 253 / 35%)

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
    box-shadow:
      0px 3px 8px rgb(165 184 253 / 0.2),
      0px 3px 1px rgb(165 184 253 / 0.05)

.medical-page-description
  position: relative

</style>