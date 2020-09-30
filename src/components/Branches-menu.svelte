<script>
  export let branchQuery;

  import { branchId } from './Store-branches.js';

	const showMenu = async (id) => {
    $branchId = null
    $branchId = id
	}
</script>

<template lang="pug">

.branches_block
  ul.slider
    +await('$branchQuery')
      p Loading...
      +then('result')
        +each('result.data.allMedicalBranches as baranch')
          +if('!baranch.parent')
            li
              button.items(
                on:click!='{() => showMenu(baranch.id) }'
              ) {baranch.name}

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
    width: 100%

    color: var(--LIGHT-BLACK)
    border-radius:
      var(--radius--menu-item)
    border:
      solid
      1px
      var(--color--borders---card-white)
    background-color:
      var(--color--bg--card)
    cursor: pointer

    font-style: normal
    font-weight: normal
    font-size: 15px
    line-height: 110%
    @mixin shadow

    &:after
      content: url("/icons/25/arrow-r.svg")

    &:hover
      border-color: var(--color--btn-border---active)

    &:active
      transform: translateY(2px)

</style>