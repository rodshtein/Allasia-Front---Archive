<script>
  import Popup from './Popup.svelte';
  import Button from './Button.svelte';
  import CardWrapper from './Card-wrapper.svelte';

  export let header = 'Header';
  export let text = null;
  export let btnText = null;
  export let tel = null;

</script>

<template lang='pug'>

.card.card_decor__white
  .header
    h2.h2 {header}
    .text-wrap
      +if('text')
        p.p {text}
      +if('btnText')
        .button-wrap
          Button(
            size='mini'
            invert iconR='chat'
            text='{btnText}')
  +if('tel')
    .tel-wrap
      .block
        p.p-small Единый, бесплатный номер в РФ
        .number-wrap
          p.phone-number 8 800 250 82 97
          .button-wrap
            Button(
              size='mini'
              iconR='short_arrow-b'
              text="Номера представительств")

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.card
  padding: 20px
  width: 100%
  position: relative

.header
  display: flex
  flex-wrap: wrap
  background-color: var(--LIGHT-PURPLE)
  padding: 20px
  border-radius: 15px

  .h2
    margin-bottom: 10px

  .text-wrap
    display: grid
    grid-auto-flow: row
    justify-items: left
    grid-gap: 25px
    width: 100%
    @media(width > 660px)
      grid-auto-flow: column
      grid-gap: 80px

    .p
      max-width: 500px

    .button-wrap
      @media(width > 660px)
        justify-self: end
        align-self: end

.tel-wrap
  padding:
    top: 20px
    left: 20px
    right: 20px
    bottom: 15px

  .block
    display: flex
    flex-direction: column
    align-items: start
    padding: 0
    width: 100%

  .p-small
    text-align: left
    margin-bottom: 10px
    padding-bottom: 7px
    @mixin devider_bottom

  .number-wrap
    width: 100%
    display: grid
    grid-auto-flow: row
    grid-gap: 20px
    @media(width > 660px)
      grid-auto-flow: column

    .phone-number
      font-style: normal
      font-weight: 700
      font-size: 33px
      line-height: 85%
      @media(width < 380px)
        font-size: 27px

    .button-wrap
      @media(width > 660px)
        justify-self: end
        align-self: end

</style>