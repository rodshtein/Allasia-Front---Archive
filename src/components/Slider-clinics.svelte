<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import Button from './Button.svelte';
  import Clinic from './Card-clinic.svelte';

  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };

</script>

<template lang='pug'>
Nailer
  +each('data as el (el.id + data.length)')
    div(class!='{cls("card-wrap")}')
      Clinic(data='{el}')
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

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

</style>