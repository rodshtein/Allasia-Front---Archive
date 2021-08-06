<script>
import { onMount } from 'svelte';
import { chatIsLoaded } from './stores/Store-chat.js';
import { contactsIsLoaded, showCallModal } from './stores/Store-call.js';

function openChatra(){
  window.carrotquest.open();
}

function callModalHandler(){
  showCallModal.set(true)
}

</script>

<template lang="pug">
  button.call( class:loading='{!$contactsIsLoaded}' disabled='{!$contactsIsLoaded}' on:click!='{callModalHandler}')

</template>

<style lang='postcss'>
button
  position: fixed
  z-index: 10
  background-size: contain
  right: 25px
  bottom: 100px
  border-width: 0
  cursor: pointer
  height: 60px
  width: 60px
  background-color: #fff
  background-position: center
  background-repeat: no-repeat
  border-radius: 50%
  box-shadow: 0 3px 12px 1px rgba(0,0,0,.2)
  transition: all .3s ease

  &.loading
    opacity: 0
    cursor: none

.call
  background-image: url('/icons/49/handset.svg')
</style>