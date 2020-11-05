<script>

</script>

<template lang="pug">

.floating-wrap
  button.message
  button.call

</template>

<style lang='postcss'>

.floating-wrap
  position: fixed
  right: 0
  bottom: 0
  display: flex
  flex-direction: row
  justify-content: center
  z-index: 2
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


  .message
    background-image: url('/icons/49/chat.svg')
  .call
    background-image: url('/icons/49/handset.svg')

</style>