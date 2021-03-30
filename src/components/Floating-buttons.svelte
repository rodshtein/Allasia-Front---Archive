<script>
import { onMount } from 'svelte';
import { chatIsLoaded } from './stores/Store-chat.js';
import { contactsIsLoaded, showCallModal } from './stores/Store-call.js';

function openChatra(){
  window.Chatra('openChat', true)
}

function callModalHandler(){
  showCallModal.set(true)
}

</script>

<template lang="pug">

.floating-wrap
  button.message( class:loading='{!$chatIsLoaded}' on:click='{openChatra}' )
  button.call( class:loading='{!$contactsIsLoaded}' disabled='{!$contactsIsLoaded}' on:click!='{callModalHandler}')

</template>

<style lang='postcss'>

.floating-wrap
  position: fixed
  right: 0
  bottom: 0
  display: flex
  flex-direction: row
  justify-content: center
  z-index: 10
  padding-bottom: 10px
  width: 100%

  @media(width > 550px)
    flex-direction: column
    width: auto
    padding:
      bottom: 50px
      right: 40px

  button
    border-width: 0
    cursor: pointer
    height: 61px
    width: 61px
    padding: 10px
    background-color: rgba(212, 221, 254, 0.45)
    backdrop-filter: blur(5px)
    background-position: center
    background-repeat: no-repeat
    border-radius: 50%

    &.loading
      animation: pulse 2.5s infinite
      cursor: progress
      &:hover
        border-color: var(--color--btn-border)
      &:active
        transform: translateY(0)
      &:after, &:before
        opacity: .2

  .message
    background-image: url('/icons/49/chat.svg')

  .call
    background-image: url('/icons/49/handset.svg')

@keyframes pulse
  0%
    opacity: .3
  70%
    opacity: .7
  100%
    opacity: .3
</style>