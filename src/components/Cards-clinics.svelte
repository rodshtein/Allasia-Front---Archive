<script>
  export let data;

  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
  import Button from './Button.svelte';


</script>

<template lang='pug'>
mixin body
  .head
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

mixin items
  +if('el.head_img && el.head_img.publicUrl')
    .slider-item.with-img(
      style='background-image: url({el.head_img.publicUrl})'
      )
      +body
    +else
      .slider-item.without-img
        +body

CardWrapper
  CardHeader(header='Клиники')
  +if('data[1]')
    .slider
      .slider-wrapper
        +each('data as el')
          +items

    +else
      .slider-wrapper.single
        +each('data as el')
          +items
</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider
  position: relative
  // overflow: hidden
  padding: 0 0 20px
  margin-bottom: -20px
  overflow-x: scroll
  margin:
    left: -10px
    right: -10px

.slider-wrapper
  display: grid
  grid-auto-flow: column
  grid-column-gap: 20px
  grid-auto-columns: 83%
  // grid-auto-columns: max-content
  margin: 0 10px

  &:last-child:after
    content: ''
    width: 17%

  &.single
    grid-auto-columns: 100%
    margin: 0

    &:last-child:after
      display: none

.slider-item
  padding:
    top: 19px
    right: 19px
    bottom: 23px
    left: 19px
  position: relative
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  max-height: 260px

  &.without-img
    @mixin cards_decor__withe

  &.with-img
    background-size: cover
    background-position: center
    background-color: #6b6b6b94
    background-blend-mode: multiply
    @mixin cards_decor__img

    & .h2, .p, .subheader-h3
      color: white

.head
  display: block
  margin-bottom: 25px

  & .subheader-h3
    margin-top: 0
    margin-bottom: 10px

  & .h2
    margin-bottom: 5px

</style>