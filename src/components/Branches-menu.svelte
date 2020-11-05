<script>
  import { nailer } from './nailer';
  import { fly, fade } from 'svelte/transition';
  import { showMenu, branchId } from './Store-branches.js';
  import { client } from "../utils";
  import { BRANCHES } from '../queries';
  import { sort } from "../helpers";

  import CardWrapper from './Card-wrapper.svelte';

  let styleMapBranches = {};
  let menuBranches;


  client.watchQuery({ query: BRANCHES }).subscribe(
    (result) => {
      if (result.errors) {
        console.log({ 'result error':result.errors })
      } else {
        prepareData(result.data.allMedicalBranches)
      }
    },
    (error) => console.log({ 'request error':error  })
  );


  function prepareData(queryResult){
    menuBranches = sort(queryResult.filter(item => !item.parent));
  }

  $: {
    if(menuBranches && menuBranches.length) {
      styleMapBranches = columnMark({L:menuBranches.length})
    }
  }

  function columnMark(
    {
      L, // ← arr length
      C = 3, // ← column count
      f = 'first',
      l = 'last',
      m = 'middle',
      o = 'only',
      sep = '--',
    }) {
    // if(L == 0) return [o];

    let map = [];
    let col = {};

    function mark(i, name){
      map[i] = map[i] ? map[i]+' '+name : name;
    }

    for (let colCount = 1; colCount <= C; colCount++) {

      // Actual
      let rowsInCol = Math.ceil( L / colCount );
      let currCol = 1;

      // Store rows count in cur column conf
      col[colCount] = rowsInCol;

      // class names
      let _f = colCount < 1 ? f : f+sep+colCount;
      let _l = colCount < 1 ? l : l+sep+colCount;
      let _o = colCount < 1 ? o : o+sep+colCount;

      for (let i = 1; i <= L; i++) {
        let x = i-1;
        let colItemsSum = rowsInCol * currCol;
        let isOnlyChild = L == i && L < colItemsSum;

        // First column child
        if(
          i == colItemsSum - rowsInCol + 1 &&   // first in cur column
          rowsInCol > 1 &&                      // ony if more than one row
          !isOnlyChild                          // only if not only
          ) mark(x, _f)


        // last column child
        if(
          colItemsSum == i &&                   // last in curr col
          rowsInCol > 1 ) mark(x, _l)           // ony if more than one row

        if( i == L &&                           // last child
          rowsInCol > 1 &&                      // ony if more than ome row
          L != rowsInCol * (colCount - 1) + 1   // ony if not only one in col
          ) mark(x, _l)

        // only column child
        if(
          rowsInCol == 1 || isOnlyChild
         ) mark(x, _o)

        // Fill empty
        if(!map[x]) map[x] = '';

        // Define next column
        if(i === rowsInCol * currCol) currCol++
      }
    }

    return {map, col, L}
}

  //Nailer
  let overflowL = false;
  let overflowR = false;

  function eventHandler(e){
    if(e.detail.type == "overflowL") {
      overflowL = e.detail.status;
    }
    if(e.detail.type == "overflowR") {
      overflowR = e.detail.status;
    }
  }

  let props = {
    leftShift: 15
  };
</script>

<template lang="pug">
+if('!menuBranches')
  p Loading...
+if('menuBranches')
  .container
    +if('overflowL')
      .left-side(transition:fade='{{duration: 300}}')
        button.nailer_btn(
          bind:this='{props.prevBtn}'
          transition:fly='{{duration: 400, x: 25}}'
          )
    +if('overflowR')
      .right-side(transition:fade='{{duration: 300}}')
        button.nailer_btn(
          bind:this='{props.nextBtn}'
          transition:fly='{{duration: 400, x: -25}}'
        )

    .slider-wrapper
      ul.slider(
        use:nailer='{props}'
        on:update='{eventHandler}'
        style=`--columns--3:{styleMapBranches.col[3]};`
        )
        +each('menuBranches as branch, i')
          li.item-grid.item.branch(class='{styleMapBranches.map[i]}')
            button( on:click!=`{() => {
                showMenu.set(true)
                branchId.set(branch.id)
              }}`)
              span.ellipsis {branch.name}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.container
  position: relative
  margin-left: -15px
  margin-right: -15px

  @media( width < 900px )
    margin:
      left: -30px
      right: -30px

    @media( width < 600px )
      margin:
        left: -15px
        right: -15px

  .left-side, .right-side
    display: block
    position: absolute
    width: 1px
    height: 100%
    background: var(--BLUE)
    z-index: 2
    transition: all .3s ease-out
    @media(width < 800px)
      display: none


  .left-side
    left: 0

    & .nailer_btn
      right: 0
      &:after
        background-image: url('/icons/25/short_arrow-l.svg')

  .right-side
    right: 0

    & .nailer_btn
      left: 0
      &:after
        background-image: url('/icons/25/short_arrow-r.svg')

  & .nailer_btn
    position: absolute
    background-color: transparent
    border-width: 0
    height: 100%
    width: 67px
    padding: 15px
    cursor: pointer
    &:after
      content: ''
      display: block
      background-position: center
      background-repeat: no-repeat
      border-radius: 50%
      width: 37px
      height: 37px
      transition: all .3s ease-out

    &:hover:after
      background-color: var(--LIGHT-PURPLE)


.slider-wrapper
  position: relative
  overflow: hidden
  padding: 0
  padding:
    top: 15px
    bottom: 15px
  margin:
    top: -15px
    bottom: -15px

.slider
  margin: 0 15px
  @media(width < 900px)
    margin: 0 30px
  @media(width < 600px)
    margin: 0 15px

  list-style: none
  padding: 0
  margin:
    top: 0
    bottom: 0

  display: grid
  grid-auto-flow: column
  grid-column-gap: 15px
  grid-template-rows: repeat(var(--columns--3), max-content)
  grid-auto-columns: calc(83% - 15px)

  @media( width > 600px)
    grid-auto-columns: calc(83% / 2)

  @media( width > 900px)
    grid-auto-columns: calc((100% - 30px) / 3)



  .item
    position: relative
    user-select: none
    border-radius:
      var(--radius--menu-item)
    border:
      solid
      1px
      var(--color--borders---card-white)
    background-color:
      var(--color--bg--card)
    @mixin shadow

    &:hover
      border-color: var(--color--btn-border---active)

    &:active
      transform: translateY(-2px)

    a, & button
      display: flex
      justify-content: space-between
      align-items: center
      padding: 10px 15px
      min-height: 44px
      text-decoration: none
      color: var(--LIGHT-BLACK)
      font-style: normal
      font-weight: normal
      font-size: 14px
      line-height: 130%
      cursor: pointer
      background-color: #fff0
      border: none
      width: 100%

    .branch button:after
      content: url("/icons/25/arrow-r.svg")
      align-self: flex-start
      margin-left: 12px

    .page a:after
      content: url("/icons/25/new-page.svg")
      align-self: flex-start
      margin-left: 12px


    span
      display: block
      text-align: left

      &.ellipsis
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis


  .item-grid
    border-radius: 0

    &.first--3
      border-radius:
        var(--radius--menu-item)
        var(--radius--menu-item)
        0 0
    &.last--3
      border-radius:
        0 0
        var(--radius--menu-item)
        var(--radius--menu-item)
    &.only--3
      border-radius:
        var(--radius--menu-item)
</style>