<script>
  export let show;
  export let header = 'Header'
  export let header2 = false
  export let imageURL = false
  export let btnText = false
  export let btnIcon = 'arrow-l'

  let headerClass = header && header.length > 28 ? 'h3':'h2';
  import Button from './Button.svelte'
</script>


<template lang="pug" >
+if('imageURL')
  header.tall(style="background-image: url({imageURL})")
    .wrapper
      +if('btnText')
        Button(size='mini' iconL='{btnIcon}' on:click text='{btnText}')
        +else
          h1(class="{headerClass}") {header}
      button.closeBtn(on:click!='{() => show=!show}')
    h2.h1 {header2}

  +else
    header
      .wrapper
        +if('btnText')
          Button(size='mini' iconL='{btnIcon}' on:click text='{btnText}')
          +else
            h1(class="{headerClass}") {header}
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
    background-color: #6b6b6b94
    background-blend-mode: multiply
    color: white
    & h1, h2
      color: white
    & h2
      max-width: 50%

    & .closeBtn:after
      content: url('/icons/25/x---w.svg')

.wrapper
  display: grid
  grid-template-columns: 1fr min-content
  column-gap: 30px
  justify-items: start

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