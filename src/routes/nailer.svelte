<script >
  import CardWrapper from '../components/Card-wrapper.svelte';
  import Nailer from '../components/nailer/Nailer.svelte';

</script>


<template lang='pug'>
CardWrapper
  Nailer
    +each('new Array(20) as el, i')
      .card-wrap
        .clinic-card
          h1 {i}

</template>


<style lang='postcss'>
@import "../style/mixins.sss"
.card-wrap
  position: relative
  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  margin-right: 15px

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px


  &:last-child
    margin-right: 0

.clinic-card
  padding:
    top: 19px
    right: 19px
    bottom: 23px
    left: 19px
  position: relative
  width: 100%
  height: 100%
  min-height: 200px
  background-color: lightgray
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between

</style>
