<script>
export let branchesQuery;
// afterUpdate(() =>{ new Swiper .... })
</script>

<template lang="pug">

.branches_block
  ul.slider
    +await('$branchesQuery')
      li Loading...
      +then('result')
        +each('result.data.allMedicalBranches as baranch')
          +if('!baranch.parent')
            li.items {baranch.name}

      +catch('error')
        pre {error}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.branches_block
  overflow-y: scroll
  padding-bottom: 50px

  .slider
    display: grid
    column-gap: 15px
    row-gap: 5px
    list-style: none
    padding: 0 15px
    grid-auto-flow: column
    grid-template-rows: repeat(7, 44px)
    grid-template-columns: repeat(3, max-content)
    width: max-content

  .items
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 15px
    min-height: 44px

    color: var(--LIGHT-BLACK)
    border-radius:
      var(--radius--menu-item)
    border:
      solid
      1px
      var(--color--borders---card-white)
    background-color:
      var(--color--bg--card)


    font-style: normal
    font-weight: normal
    font-size: 15px
    line-height: 110%
    @mixin shadow

    &:after
      content: url("/icons/25/arrow-r.svg")

</style>