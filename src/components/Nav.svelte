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

  let layout_shift = segment ? true : false;
  afterUpdate( () => layout_shift = segment ? true : false );

</script>


<template lang="pug">

.info
  h2.h4 ⚠️ Это архив сайта Allasia 
  p.p Компания больше не работает. Все услуги и предложения утратили актуальность

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

.info
  display: block
  background-color: var(--WITHE)
  padding: 10px 13px
  margin-bottom: 20px
  text-align: center

  .h4
    margin-bottom: 4px

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
