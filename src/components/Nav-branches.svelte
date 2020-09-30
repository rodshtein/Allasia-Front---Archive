<script>
import { client } from "../utils";
import { sort } from "../helpers";
import { BRANCHES } from '../queries';
import { tick } from 'svelte';
import {
  showMenu,
  branchId,
  searchResult } from './Store-branches.js';
import Popup from './Popup.svelte';
import SearchBox from './Search-box.svelte';

let branches;

// Level Data
let mainBranches;
let menuHeader = 'Разделы медицины';
let menuBrunchName;
let backButtonName;
let menuParentId;
let menuPages;
let menuBranches;
let searchString;

// search results
let foundPages;
let foundBranches;

// if id comes from the store
$: findChildrenById($branchId)
$: $searchResult, setFirstLevelData()
// $: console.log($searchResult)

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

function prepareData(data){
  branches = data
  mainBranches = sort(data.filter(item => !item.parent));
  setFirstLevelData()
}

async function setFirstLevelData(){

  if($searchResult.searchString) {
    menuPages = null
    menuBranches = null

    searchString = `
      Нашлось по запросу «${$searchResult.searchString}»:`
    await tick();
    foundBranches = searchResult.branches
    foundPages = searchResult.pages

  } else {
    foundBranches = null
    foundPages = null

    searchString = null
    menuHeader = 'Разделы медицины'
    menuBrunchName = null
    menuPages = null
    backButtonName = null
    menuParentId = null
    menuBranches = mainBranches
  }
}


function findChildrenById(id) {

  if(!mainBranches) return

  if(id){
    let item = branches.find(item => item.id == id);

    menuHeader = null
    menuBrunchName = item.name
    menuPages = sort(item.pages)
    backButtonName = item.parent
    ? item.parent.name
    : 'Все разделы'; // TODO There we need check to search result
    menuParentId = item.parent ? item.parent.id : null;
    menuBranches = item.children.length ? sort(item.children) : null;

  } else {
    setFirstLevelData()
  }

  $showMenu = true;
}



function clickHandler() {
  $branchId = menuParentId ? menuParentId : null;
}

</script>

<template lang='pug'>


Popup(
  bind:show!='{ $showMenu }'
  header='{ menuHeader }'
  btnText='{ backButtonName }'
  on:click='{ clickHandler }'
)
  .search_wrapper
    SearchBox
  +if('searchString')
    h2.h3 {searchString}
  +if('menuBrunchName')
    h2.h3 {menuBrunchName}
  ul.slider

    +if('menuPages')
      +each('menuPages as el')
        li.items.page
          a(
            rel=prefetch
            href=`/medical-pages/{el.id}`
            on:click!='{() => $showMenu = false}'
          )
            span {el.name}

    +if('foundPages')
      +each('foundPages as item')
        ul.folder
          h4.folder-header {item.name}
          +each('item.pages as el')
            li.items.page
              a(
                rel=prefetch
                href=`/medical-pages/{el.id}`
                on:click!='{() => $showMenu = false}'
              )
                span {el.name}

    +if('menuBranches')
      +each('menuBranches as el')
        li.items.branch
          button(
            on:click!='{() => $branchId = el.id }'
          )
            span {el.name}


</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.search_wrapper
  margin-bottom: 15px

.h3
  max-width: 300px

.folder-header
  font-family: IBM Plex Sans
  font-size: 11px
  font-style: normal
  font-weight: 500
  line-height: 12px
  letter-spacing: 0px
  text-align: left
  color: var(--color--btn-txt---blue)
  margin-bottom: 8px

.slider
  display: grid
  column-gap: 15px
  row-gap: 5px
  list-style: none
  padding: 0
  grid-auto-flow: row

.folder
  display: grid
  list-style: none
  column-gap: 15px
  row-gap: 0
  padding: 0
  grid-auto-flow: row
  margin:
    top: 0
    bottom: 15px

  & li
    border-radius: 0

  & li:first-of-type
    border-radius:
      var(--radius--menu-item)
      var(--radius--menu-item)
      0 0

  & li:last-of-type
    border-radius:
      0 0
      var(--radius--menu-item)
      var(--radius--menu-item)

  & li:only-of-type
    border-radius:
      var(--radius--menu-item)

.items
  border-radius:
    var(--radius--menu-item)
  border:
    solid
    1px
    var(--color--borders---card-white)
  background-color:
    var(--color--bg--card)
  @mixin shadow

  & a, & button
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 15px
    min-height: 44px
    width: 320px
    text-decoration: none
    color: var(--LIGHT-BLACK)
    font-style: normal
    font-weight: normal
    font-size: 15px
    line-height: 110%
    cursor: pointer
    background-color: #fff0
    border: none

  &.branch button:after
    content: url("/icons/25/arrow-r.svg")

  &.page a:after
    content: url("/icons/25/new-page.svg")

  &:hover
    border-color: var(--color--btn-border---active)

  &:active
    transform: translateY(2px)

  & span
    overflow: hidden
    white-space: nowrap
    display: block
    text-overflow: ellipsis

</style>