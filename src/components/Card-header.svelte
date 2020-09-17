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
.wrap
  +if('header')
    h2.h2 {header}
  +if('btnTxt')
    Button(
        size="small"
        text="{btnTxt}"
        on:click!='{action}'
      )
+if('subHeader')
  .subheader-h2 {subHeader}
</template>

<style lang='postcss'>
@import "../style/mixins.sss"
.wrap
  display: flex
  justify-content: space-between
  padding:
    top: 15px
    bottom: 15px

</style>