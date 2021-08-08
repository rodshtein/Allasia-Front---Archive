<script>
import { onMount } from 'svelte';
import { chatIsLoaded } from './stores/Store-chat.js';
import { contacts, showCallModal } from './stores/Store-call.js';

function openChatra(){
  window.carrotquest.open();
}

function callModalHandler(){
  showCallModal.set(true)
}

</script>

<template lang="pug">
  button( class:bottom='{!$chatIsLoaded}' disabled='{!$contacts}' on:click!='{callModalHandler}')
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
  background-image: url('/icons/49/handset.svg')
  border-radius: 50%
  box-shadow: 0 3px 12px 1px rgba(0,0,0,.2)
  transition: all .3s ease

  &.bottom
    bottom: 25px

  &:disabled
    animation: pulse 2.5s infinite
    cursor: progress


@keyframes pulse
  0%
    opacity: .1
  70%
    opacity: 1
  100%
    opacity: .1
</style>