<script>
import Popup from './Popup.svelte';
import Button from './Button.svelte';
import { serialize } from '../helpers.js';

export let data;
export let showTechnology;

</script>

<template lang='pug'>

+if('data')
  +if('data.head_img && data.head_img.publicUrl')
    Popup(
      bind:show!='{showTechnology}'
      header='Технологии'
      header2='{data.name}'
      imageURL='{data.head_img.publicUrl}'
    )
      .technology_wrapper
          +html('serialize(JSON.parse(data.description.document))')
    +else
      Popup(
        bind:show!='{showTechnology}'
        header='{data.name}'
      )
        .technology_wrapper
          +html('serialize(JSON.parse(data.description.document))')


</template>

<style lang='postcss'>


:global
  .technology_wrapper
    h2
      margin-top: 10px
      margin-bottom: 5px
      color: var(--color--p)

    p
      margin-bottom: 15px
      color: var(--color--p)

    ul
      padding-left: 15px
      margin-bottom: 15px
      margin-top: 0
      list-style: '− '

    blockquote
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

      p
        font-style: italic


</style>