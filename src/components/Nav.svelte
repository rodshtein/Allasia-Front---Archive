<script>
  export let segment;

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

  function openChatra(){
    window.Chatra('openChat')
  }


  let layout_shift = segment ? true : false;
  afterUpdate( () => layout_shift = segment ? true : false );

</script>


<template lang="pug">

.head(class:layout_shift)
  a.full_logo(sapper:prefetch href='.')
    span Главная страница

  nav.nav
    .slider-wrap
      ul.slider(use:nailer)
        li
          a.short_logo(sapper:prefetch href=".")
            span Главная страница
        li
          Button(invert iconR='search' text='Поиск лечения'
            on:click!='{searchHandler}')
        li
          Button(loading='{!$chatIsLoaded}' invert iconR='chat' text='Задать вопрос' on:click!='{openChatra}')
        li
          Button(invert text='Вопрос-ответ' href='./wiki')
        li
          Button(invert text='Клиники' href='./clinics')
        li
          Button(invert text='Акции' href='./promotion')
        li
          Button(invert text='Контакты' href='./contacts')

</template>


<style lang='postcss'>
@import "../style/mixins.sss"
.head
  transform: none

  @media ( width >= 900px )
    transition: transform .3s ease-out
    transform: translateY(65px)

    &.layout_shift
      transform: translateY(130px)

      & .full_logo
        opacity: 1


  & .full_logo
    display: block
    position: absolute
    width: 150px
    height: 50px

    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/icons/special/logo.svg')

    top: -70px
    opacity: 0
    left: calc( ( 100% / 2 ) - 75px )
    transition: all .5s ease-out

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
