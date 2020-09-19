<script>
  import Popup from './Popup.svelte';
  import Button from './Button.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import Tel from './Tel.svelte';

  export let header = 'Header';
  export let text = null;
  export let btnText = null;
  export let tel = null;

</script>

<template lang='pug'>
CardWrapper
  .card
    .header
      .wrap
        h2.h2 {header}
        +if('text')
          p.p {text}
      +if('btnText')
        Button(size='mini' invert iconR='chat' text='{btnText}')
    +if('tel')
      .tel-wrap
        Tel

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.card
  padding: 20px
  width: 100%
  position: relative
  @mixin cards_decor__withe

.header
  background-color: var(--LIGHT-PURPLE)
  padding: 20px
  border-radius: 15px

  .wrap
    display: grid
    grid-auto-flow: row
    justify-items: left
    row-gap: 10px
    margin-bottom: 25px

.tel-wrap
  padding:
    top: 30px
    left: 20px
    right: 20px
    bottom: 15px

</style>