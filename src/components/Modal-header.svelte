<script>
  export let show;
  export let header = 'Header'
  export let header2 = false
  export let imageData = false
  export let addTopBtnWithCaption = false
  export let btnIcon = 'arrow-l'
  let headerClass = header && header.length > 28 ? 'h3':'h2';
  import Button from './Button.svelte'
  import { colorFilter } from '../color-filter';
</script>


<template lang="pug" >
+if('imageData.publicUrl')
  header.tall( use:colorFilter='{imageData}')
    .wrapper
      +if('addTopBtnWithCaption')
        Button(size='mini' iconL='{btnIcon}' on:click text='{addTopBtnWithCaption}')
        +else
          h1(class="{headerClass}") {header}
      button.closeBtn(on:click!='{() => show=!show}')
    h2.h1 {header2}

  +else
    header
      .wrapper
        +if('addTopBtnWithCaption')
          Button(size='mini' iconL='{btnIcon}' on:click text='{addTopBtnWithCaption}')
          +else
            h1(class="{headerClass}" ) {header}
        button.closeBtn(on:click!='{() => show=!show}')

</template>

<style lang="postcss">
header
  padding: 15px

  &.tall
    display: flex
    flex-direction: column
    justify-content: space-between
    margin-bottom: 15px
    height: 300px
    background-size: cover
    background-position: center
    background-color: var(--LIGHT-GRAY)
    color: white
    .h1, .h2
      color: white

    .h1
      max-width: 80%
      @media( width > 640)
        font-size: 40px
        max-width: 90%

    & .closeBtn:after
      content: url('/icons/25/x---w.svg')

.wrapper
  position: relative
  display: grid
  min-height: 29px
  grid-template-columns: 1fr min-content
  column-gap: 30px
  justify-items: start
  align-items: flex-start

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