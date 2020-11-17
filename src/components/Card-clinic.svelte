<script>
  export let data;

  import Button from './Button.svelte';
  import { colorFilter } from '../color-filter';

  let cls = data.head_img && data.head_img.publicUrl
    ? 'card_decor__img' : 'card_decor__white';
</script>

<template lang='pug'>

.clinic-card(
  class='{cls}'
  use:colorFilter='{data.head_img}'
)
  .head
    +if('data.country && data.country.name')
      p.subheader-h3 {data.country.name}
    +if('data.name_ru')
      h3.h3 {data.name_ru}
    +if('data.full_name_ru && data.name_ru && data.name_ru !== data.full_name_ru')
      p.p-mini {data.full_name_ru}

  .btn-wrap
    Button(
      size='small'
      text='Подробнее'
      href='#'
    )

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.clinic-card
  padding:
    top: 19px
    right: 19px
    bottom: 23px
    left: 19px
  position: relative
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between

  &.card_decor__img
    background-size: cover
    background-position: center
    background-color: var(--PURPLE)

    & .h3, .p-mini, .subheader-h3
      color: white

    & .p-mini
      font-weight: 450

.head
  display: block
  margin-bottom: 25px

  & .subheader-h3
    margin-top: 0
    margin-bottom: 10px

  & .h3
    margin-bottom: 5px

</style>