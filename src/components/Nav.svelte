<script>
  import Branches from './Nav-branches.svelte';
  import Button from './Button.svelte';
  import { showMenu } from './Store-branches.js';

  export let segment;
</script>


<template lang="pug">

.header
  .logo_wrap
    +if('segment')
      a(rel='prefetch' href=".")
        img.logotype(alt="logotype" src="icons/special/logo.svg")

  nav.nav
    .slider-wrap
      ul.slider
        li
          a(rel='prefetch' href=".")
            img.logo(alt="logo" src="icons/special/logo--short.svg")
        li
          Button(invert iconR='search' text='Поиск лечения'
            on:click!='{() => $showMenu = true }')
        li
          Button(invert iconR='chat' text='Задать вопрос')
        li
          Button(invert text='Клиники')
        li
          Button(invert text='Акции')
        li
          Button(invert text='Вопрос-ответ')
        li
          Button(invert text='Контакты')

//- Nav Popup
Branches
</template>


<style lang='postcss'>


.logo_wrap
  display: block
  max-width: 150px
  margin: 0 auto
  padding:
    top: 66px
    bottom: 40px
  @media(width < 900px)
    display: none

.nav
  display: flex
  flex-wrap: wrap
  justify-content: center
  @media(width < 900px)
    padding: 10px

.slider-wrap
  position: relative
  padding: 0
  overflow-x: scroll
  @media(width < 900px)
    padding:
      top: 10px
      bottom: 10px
    border-radius: 16px
    background:
      linear-gradient(
        90deg,
        #E6EBFF -2.82%,
        #E6EBFF 74.45%,
        #BFCDFF 102.11%
      )


.slider
  display: grid
  column-gap: 20px
  list-style: none
  padding: 0
  margin: 0
  grid-auto-flow: column
  @media(width < 900px)
    &:after, &:before
      content: ''
      width: 1px
      margin-left: -1px

  & li:first-child
    display: none
    @media(width < 900px)
      display: block

</style>
