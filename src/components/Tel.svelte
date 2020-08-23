<script>
  import Button from './Button.svelte';
  import ArrowL from './icons/23/arrow---l.svg'
  import ArrowR from './icons/23/arrow---R.svg'
</script>

<template lang="pug">
.block
  .wrapper
    .info Единый, бесплатный номер в РФ
    .devider
    .number.phone 8 800 250 82 97

  Button(regular iconL='ArrowL' alt="Номера представитльств") Номера представитльств

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.block
  display: flex
  flex-direction: column
  align-items: center
  padding: 15px
  width: 100%
  border-radius: var(--radius--block)
  background-color: var(--blocks-bg)
  @mixin shadow

.wrapper
  margin-bottom: 20px

.info
  font-style: normal
  font-weight: normal
  font-size: 13px
  line-height: 120%
  text-align: center
  color: var(--color--txt-light---blue)
  margin-bottom: 7px

.devider
  margin-bottom: 9px

</style>