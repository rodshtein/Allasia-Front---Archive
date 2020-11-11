<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
  import Button from './Button.svelte';
  import { colorFilter } from '../color-filter';

  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };

</script>

<template lang='pug'>
mixin body
  .head.fixed_font_size
    +if('el.country && el.country.name')
      p.subheader-h3 {el.country.name}
    +if('el.name_ru')
      h3.h2 {el.name_ru}
    +if('el.full_name_ru && el.name_ru && el.name_ru !== el.full_name_ru')
      p.p {el.full_name_ru}


  .btn-wrap
    Button(
      size='small'
      text='Подробнее'
      href='#'
    )


CardWrapper
  CardHeader(header!='{data.length > 1 ? "Клиники" : "Клиника" }')
  Nailer
    +each('data as el (el.id + data.length)')
      +if('el.head_img && el.head_img.publicUrl')
        .slider-item.with-img(
            class!='{cls("slider-item")}'
            use:colorFilter='{el.head_img.publicUrl}'
          )
          +body
        +else
          .slider-item.without-img(
              class!='{cls("slider-item")}'
            )
            +body

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider-item
  padding:
    top: 19px
    right: 19px
    bottom: 23px
    left: 19px
  position: relative
  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  margin-right: 15px
  @mixin cards_decor__withe

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)

  &:last-child
    margin-right: 0

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

  &.without-img
    @mixin cards_decor__withe

  &.with-img
    background-size: cover
    background-position: center
    background-color: var(--PURPLE)
    @mixin cards_decor__img

    & .h2, .p, .subheader-h3
      color: white

    & .p
      font-weight: 450

.head
  display: block
  margin-bottom: 25px

  & .subheader-h3
    margin-top: 0
    margin-bottom: 10px

  & .h2
    margin-bottom: 5px

</style>