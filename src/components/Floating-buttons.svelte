<script>
import { onMount } from 'svelte';
import { chatIsLoaded } from './stores/Store-chat.js';
import { contacts, showCallModal } from './stores/Store-contacts.js';

function callModalHandler(){
  showCallModal.set(true)
}

let showCallBtn = true;
let showMsgBtn = true;


$: $chatIsLoaded, setTimeout(()=>showCallBtn=false, 800);
$: $contacts, setTimeout(()=>showMsgBtn=false, 600);


</script>

<template lang="pug">
.floating-wrap
  button.call( class:loading='{showCallBtn}' disabled='{!$contacts}' on:click!='{callModalHandler}')
  button.message( class:loading='{showMsgBtn}' on:click!="{()=> Chatra('openChat', false)}")
</template>

<style lang='postcss'>
.floating-wrap
  position: fixed
  bottom: 25px
  right: 20px
  display: flex
  flex-direction: column
  justify-content: center
  z-index: 10
    @media(width < 600px)
      right: 10px
      bottom: 15px


  button
    border-width: 0
    cursor: pointer
    height: 61px
    width: 61px
    padding: 10px
    background-size: contain
    background-color: rgba(212, 221, 254, 0.45)
    backdrop-filter: blur(5px)
    background-position: center
    background-repeat: no-repeat
    border-radius: 50%
    box-shadow: 0 3px 12px 1px rgba(0,0,0,.2)
    will-change: transform
    transition: all .5s ease-in-out

    @media(width < 600px)
      height: 51px
      width: 51px

    &:hover
      border-color: var(--color--btn-border)

    &.loading
      transform: translateX(100px)

  .message
    background-image: url('/icons/49/chat.svg')

  .call
    background-image: url('/icons/49/handset.svg')
    margin-bottom: 10px
</style>



