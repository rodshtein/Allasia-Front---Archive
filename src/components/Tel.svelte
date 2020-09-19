<script>
  export let align = 'left';

  let blockAlign = align === 'center' ? 'center' : 'start'
  let textAlign = align === 'center' ? 'center' : 'left'
  import Button from './Button.svelte';
</script>

<template lang="pug">
.block(style='align-items:{blockAlign}')

  .info(style='text-align:{textAlign}') Единый, бесплатный номер в РФ
  .devider
  .phone-number 8 800 250 82 97
  Button(size='mini' iconR='short_arrow-b' text="Номера представитльств")

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
  font-weight: normal
  font-size: 13px
  line-height: 120%
  color: var(--color--txt---light-blue)

  &:after
    content: ''
    margin: 8px 0
    @mixin devider

.phone-number
  margin-bottom: 20px
</style>