<script>
  export let align = 'left';

  let blockAlign = align === 'center' ? 'center' : 'start';
  let textAlign = align === 'center' ? 'center' : 'left';
  let justify = align === "left"
    ? "justify-content: space-between"
    : "justify-content: center";

  import Button from './Button.svelte';
</script>

<template lang="pug">
.block(style='align-items:{blockAlign}')
  .info(style='text-align:{textAlign}') Единый, бесплатный номер в РФ
  .wrap(style='{justify}')
    .phone-number(class='{align}') 8 800 250 82 97
    .button-wrap
      Button(size='mini' iconR='short_arrow-b' text="Номера представительств")

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.block
  display: flex
  flex-direction: column
  padding: 0
  width: 100%

.info
  font-style: normal
  font-size: 13px
  line-height: 120%
  color: var(--color--txt---light-blue)
  margin-bottom: 10px
  padding-bottom: 7px
  @mixin devider_border_bottom

.wrap
  display: flex
  flex-wrap: wrap
  width: 100%

  .button-wrap
    margin-bottom: 15px

  .phone-number
    font-style: normal
    font-weight: 700
    font-size: 33px
    line-height: 85%
    margin-bottom: 20px
    @media(width < 380px)
      font-size: 27px
    &.center
      width: 100%
      text-align: center
    &.left
      @media(width > 420px)
        margin-right: 40px

</style>