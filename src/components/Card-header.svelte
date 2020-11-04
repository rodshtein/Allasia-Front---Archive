<script>
  import Popup from './Popup.svelte';
  import Button from './Button.svelte';

  // Content
  export let header = null;
  export let subHeader = null;
  export let btnTxt = null;
  export let action = null;

</script>

<template lang='pug'>
.header
  .wrap
    +if('header')
      h2.h2 {header}
    +if('subHeader')
     .subheader-h2 {subHeader}

  +if('btnTxt')
    Button(
        size="mini"
        text="{btnTxt}"
        on:click!='{action}'
      )
</template>

<style lang='postcss'>
@import "../style/mixins.sss"
.header
  display: flex
  justify-content: space-between
  padding:
    bottom: 15px
  .wrap
    margin-right: 20px
  .subheader-h2
    margin-top: 10px
</style>