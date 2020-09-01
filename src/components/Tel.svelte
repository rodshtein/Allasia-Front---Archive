<script>
  import Button from './Button.svelte';
</script>

<template lang="pug">
.block
  .wrapper
    .info Единый, бесплатный номер в РФ
    .devider
    .phone-number 8 800 250 82 97
  .wrappp(style="display: flex;flex-direction: column;gap: 20px;align-items: center;")
    Button(size='mini' iconR='short_arrow-b') Номера представитльств

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.block
  display: flex
  flex-direction: column
  align-items: center
  padding: 15px
  width: 100%
  @mixin cards_decor__withe

.wrapper
  margin-bottom: 20px

.info
  font-style: normal
  font-weight: normal
  font-size: 13px
  line-height: 120%
  text-align: center
  color: var(--color--txt---light-blue)
  margin-bottom: 7px

.devider
  margin-bottom: 9px

</style>