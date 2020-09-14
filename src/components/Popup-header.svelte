<script>
  export let show;
  export let header = 'Header'
  export let button = false
  export let icon = 'arrow-l'

  let headerClass = header.length < 28 ? 'h2':'h3';
  import Button from './Button.svelte'
</script>


<template lang="pug" >
header
  .wrapper
    +if('button')
      Button(size='mini' iconL='{icon}' on:click text='{button}' btnHamdler)
      +else
        h1(class="{headerClass}") {header}
    button.closeBtn(on:click!='{() => show=!show}')
</template>

<style lang="postcss">
header
  padding: 15px

.wrapper
  display: grid
  grid-template-columns: 1fr min-content
  column-gap: 30px
  align-items: start

button
  background-color: transparent
  padding: 0
  border: 0
  border-radius: 0
  appearance: none

.closeBtn
  position: relative
  cursor: pointer
  &:after
    position: relative
    content: url('/icons/25/x.svg')
</style>