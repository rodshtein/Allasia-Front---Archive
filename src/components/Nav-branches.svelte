<script>
import { client } from "../utils";
import { sort, numDeclension } from "../helpers";
import { BRANCHES } from '../queries';
import { tick } from 'svelte';

import { showMenu, branchId } from './Store-branches.js';
import { searchInProgress, searchString, backPointId,
  prevSearchString, searchResult } from './Store-search.js';

// Components
import Popup from './Popup.svelte';
import SearchBox from './Search-box.svelte';

let branches;

// Level Data
let mainBranches;
let menuBrunchName;
let menuParentId;
let currentLevelId;
let menuPages;
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
  branches = queryResult
  mainBranches = sort(queryResult.filter(item => !item.parent));
  paintMainLevel()
}

function paintMainLevel(){
  menuBrunchName = null
  menuPages = null
  menuParentId = null
  menuBranches = mainBranches
}

function paintSubLevel() {
  let item = branches.find(item => item.id == $branchId);
  menuBrunchName = item.name
  menuPages = sort(item.pages)
  menuParentId = item.parent ? item.parent.id : null;
  menuBranches = item.children.length ? sort(item.children) : null;
}

// Paint Main Level When search
$: $searchResult, searchHandler();

// Levels Paint by watch branchID
$: $branchId, branchHandler();

// Clear unsuccess search
$: $showMenu, searchCleaner()


// Handlers
function searchHandler(){
  if( !$searchString || $searchInProgress ) return;
  branchId.set(null)
}

function searchCleaner(){
  if( $searchString && !$searchResult.success && !$searchInProgress ){
    $searchString = '';
  }
}

function branchHandler(){
  if($branchId){
    paintSubLevel()
  } else {
    paintMainLevel()
  }
}

function backHandler() {
  let id = $branchId === $backPointId
    ? null
    : menuParentId
      ? menuParentId
      : null;

  branchId.set(id);
}

// Reactive Pain Functions

$: backButtonName = () => {
  let sublevel = $branchId
  ? branches.find(item => item.id == $branchId)
  : null;

  let name = sublevel
  ? $branchId === $backPointId
    ? 'Результаты поиска'
    : sublevel.parent
      ? sublevel.parent.name
      : 'Все разделы'
  : null;

  return name;
}

$: foundPagesHeader = () => {
    let length = $searchResult.count.pages;
    let words = ['Нашлась',  'Нашлось', 'Нашлось'];
    let sign = numDeclension(length, words)
    let words2 = ['странца',  'страницы', 'страниц'];
    let sign2 = numDeclension(length, words2)
    return `${sign} ${length} ${sign2}`
}

$: foundBranchesHeader = () => {
    let length = $searchResult.count.branches;
    let words = ['Нашелся',  'Нашлось', 'Нашлось'];
    let sign = numDeclension(length, words);
    let words2 = ['раздел',  'раздела', 'разделов'];
    let sign2 = numDeclension(length, words2);
    return `${sign} ${length} ${sign2}`
}
</script>

<template lang='pug'>

Popup(
  bind:show!='{ $showMenu }'
  header="{ $branchId ? null : 'Разделы медицины' }"
  btnText='{ backButtonName() }'
  on:click='{ backHandler }'
)

  //- If search is on we show search box only on top level
  +if('!$branchId || (!$searchResult.success && $branchId)')
    .search_wrapper
      SearchBox

  //- Show sublevel header only in sublevel
  //- (defines by branch id)
  +if('$branchId')
    h2.h3 { menuBrunchName }
  +if('$searchString && !$searchResult.success && !$searchInProgress')
    p.p.info Ничего не нашлось
    h2.h3 Все разделы
  ul.slider


    //- Search block
    //- Shows only if we search,
    //- or view to first lvl (defines by branch id == null)
    +if('!$branchId && $searchString')
      +if('$searchResult.count.pages')
        h2.h4 { foundPagesHeader() }
        +each('$searchResult.pages as branch')
          ul.folder
            +if('branch.name')
              h4.folder-header { branch.name }
            +each('branch.pages as page')
              li.items.page
                a(
                  rel=prefetch
                  href=`/medical-pages/{page.id}`
                  on:click!=`{() => {
                      backPointId.set(page.id)
                      showMenu.set(false)
                    }}`)
                  span { page.name }

      +if('$searchResult.count.branches')
        h2.h4 { foundBranchesHeader() }
        +each('$searchResult.branches as branch')
          ul.folder
            +if('branch.name')
              h4.folder-header { branch.name }
            +each('branch.branches as branch')
              li.items.branch
                button( on:click!=`{() => {
                    branchId.set(branch.id)
                    backPointId.set(branch.id)
                  }}`)
                  span { branch.name }

    //- Menu block
    //- Shows only if search result is no success
    //- or if we showing a second level (defines by branch id)
    +if('!$searchResult.success || $branchId')
      +if('menuPages')
        +each('menuPages as page')
          li.items.page
            a(
              rel=prefetch
              href=`/medical-pages/{page.id}`
              on:click!='{() => showMenu.set(false)}'
            )
              span {page.name}

      +if('menuBranches')
        +each('menuBranches as branch (branch.id)')
          li.items.branch
            button( on:click!=`{() => {
              branchId.set(branch.id)
              searchCleaner()
              }}`)
              span {branch.name}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.search_wrapper
  margin-bottom: 15px

.h3, .h4
  margin-right: 50px

.h4
  margin-bottom: 10px

.info
  margin-bottom: 20px

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