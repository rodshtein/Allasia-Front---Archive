<script>
  export let header = 'Header';
  export let text = null;
  export let btnText = null;

  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import { mainContact, contactsIsLoaded, showCallModal } from './stores/Store-contacts.js';
  import { chatIsLoaded } from './stores/Store-chat.js';

  function callModalHandler(){
    showCallModal.set(true)
  }

  function openChat(){
    window.carrotquest.open();
  }
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
            loading='{!$chatIsLoaded}'
            size='mini'
            iconR='chat---light'
            text='{btnText}'
            on:click!="{()=> Chatra('openChat', false)}"
            )
  +if('$mainContact')
    .tel-wrap
      .block
        +if('$mainContact?.main_number_desc')
          p.p-small {$mainContact?.main_number_desc}
        .number-wrap
          a.phone-number(href='{$mainContact?.tel_link}') {$mainContact?.tel}
          .button-wrap
            Button(
              disabled='{!$contactsIsLoaded}'
              size='mini'
              iconR='short_arrow-b'
              text="Номера представительств"
              on:click!='{callModalHandler}'
            )

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
  background-color: var(--color--card--bg---accent)
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

  .number-wrap
    width: 100%
    display: grid
    grid-auto-flow: rows
    grid-template-columns: max-content
    grid-gap: 20px
    @media(width > 660px)
      grid-auto-flow: column

    .phone-number
      font-style: normal
      font-weight: 700
      font-size: 33px
      line-height: 85%
      margin-top: 8px
      padding-top: 10px
      text-decoration: none
      color: var(--color--txt--headers)
      @mixin divider_top
      @media(width < 380px)
        font-size: 27px

    .button-wrap
      @media(width > 660px)
        justify-self: end
        align-self: end

</style>