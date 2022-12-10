<script>
  // export let segment;

  import Button from './Button.svelte';
  import { nailer } from './nailer';
  import { branchId, showMenu } from './stores/Store-branches.js';
  import { chatIsLoaded } from './stores/Store-chat.js';
  import { searchString } from './stores/Store-search';
  import { afterUpdate } from 'svelte';

  function searchHandler(){
    if($searchString) {
      showMenu.set(true)
    } else {
      branchId.set(null)
      showMenu.set(true)
    }
  }
</script>


<template lang="pug">
.head
  a.full_logo(sapper:prefetch href='.')
    span Главная страница

  nav.nav
    .slider-wrap
      ul.slider(use:nailer)
        li
          a.short_logo(sapper:prefetch href=".")
            span Главная страница
        li
          Button(
            iconR='search---light'
            text='Поиск лечения'
            on:click!='{searchHandler}'
          )
        li
          Button(
            loading='{!$chatIsLoaded}'
            iconR='chat---light'
            text='Задать вопрос'
            on:click!="{()=> Chatra('openChat', false)}"
          )
        li
          Button( text='Вопрос-ответ' href='./wiki')
        li
          Button( text='Клиники' href='./clinics')
        li
          Button( text='Акции' href='./promotion')
        li
          Button( text='Контакты' href='./contacts')
</template>


<style lang='postcss'>
@import "../style/mixins.sss"
.head
  & .full_logo
    display: block
    width: 150px
    height: 50px
    margin: 10px auto 0

    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/icons/special/logo.svg')

    @media ( width < 900px )
      display: none

    & span
      opacity: 0


  & .short_logo
    display: block
    width: 32px
    height: 30px

    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/icons/special/logo--short.svg')

    @media ( width > 900px )
      display: none

    & span
      opacity: 0

  & .nav
    flex-wrap: wrap
    display: flex
    justify-content: center
    padding: 10px

    @media ( width < 900px )
      position: fixed
      width: 100%
      top: 0
      z-index: 10
      padding: 0

    & .slider-wrap
      position: relative
      padding: 0

      @media( width < 900px )
        overflow-x: hidden
        padding: 0
        border-radius: 16px
        backdrop-filter: blur(17px)

      & .slider
        display: inline-grid
        align-items: center
        column-gap: 20px
        list-style: none
        padding:
          top: 10px
          bottom: 10px
          left: 0
          right: 0
        margin: 0 15px
        grid-auto-flow: column

        & li
          &:not(:first-child)
            border-radius: 12px
            @mixin light_shadow

</style>
