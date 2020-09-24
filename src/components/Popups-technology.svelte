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
      .content
        +html('serialize(JSON.parse(data.description.document))')
    +else
      Popup(
        bind:show!='{showTechnology}'
        header='{data.name}'
      )
        .content
          +html('serialize(JSON.parse(data.description.document))')


</template>
