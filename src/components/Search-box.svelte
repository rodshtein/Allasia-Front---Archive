<script>

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">
.wrapper
  input(type="search" placeholder="Например: Рак желудка")
</template>

<style lang="postcss">

.wrapper
  position: relative
  width: 100%

  /* &:focus-within:after
    content: ''
    position: absolute
    border: solid 1px var(--color--ORANGE)
    border-radius: 10px
    left: -5px
    right: -5px
    top: -5px
    bottom: -5px */
.wrapper:after
  content: url('/icons/25/search.svg')
  position: absolute
  left: 5px
  top: 5px

input
  position: relative
  font-style: normal
  font-weight: normal
  font-size: 15px
  line-height: 19px

  height: 35px
  width: 100%
  border: 1px solid var(--color--borders---inputs)
  box-sizing: border-box
  border-radius: 9px
  padding-left: 35px
  padding-right: 10px

  appearance: none
  caret-color: var(--color--txt-placeholder)
  color: var(--color--txt-subheaders)

  &::-webkit-search-cancel-button
    -webkit-appearance: none
    cursor: pointer
    content: url("/icons/17/x.svg")
    display: block


  &::placeholder
    color: var(--color--txt-placeholder)

  &:hover
    border-color: var(--color--btn-border---active)


</style>