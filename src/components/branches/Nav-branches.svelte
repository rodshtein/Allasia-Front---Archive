<script>
import { client }  from '../../tinyClient';
import { sort, numDeclension, columnMark } from '../../helpers';
import { BRANCHES } from './queries';

import { showMenu, branchId } from '../stores/Store-branches.js';
import { searchInProgress, searchString, backPointId, searchResult } from '../stores/Store-search.js';

// Components
import Popup from '../Popup.svelte';
import SearchBox from '../search/Search-box.svelte';

let branches;

// Level Data
let mainBranches;
let menuBrunchName;
let menuParentId;
let currentLevelId;
let menuPages;
let menuBranches;
let styleMapBranches = {};
let styleMapPages = {};


client(BRANCHES).then(
    result => prepareData(result.allMedicalBranches),
    error => console.error(error)
  );

function prepareData(queryResult){
  branches = queryResult
  mainBranches = sort(queryResult.filter(item => !item.parent));
  paintMainLevel()
  // showMenu.set(true)
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
  menuPages = item.pages.length ? sort(item.pages) : null
  menuParentId = item.parent ? item.parent.id : null;
  menuBranches = item.children.length ? sort(item.children) : null;
}

// Paint Main Level When search
$: $searchResult, searchHandler();

// Levels Paint by watch branchID
$: $branchId, branchHandler();

// Clear unsuccess search
// $: $showMenu, searchCleaner();


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
    let words2 = ['страница',  'страницы', 'страниц'];
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

// Calc columns group
$: {
  if(menuBranches && menuBranches.length) {
    styleMapBranches = columnMark({L:menuBranches.length})
  }
}
$: {
  if(menuPages && menuPages.length) {
    styleMapPages = columnMark({L:menuPages.length})
  }
}


</script>

<template lang='pug'>

Popup(
  bind:show!='{ $showMenu }'
  header="{ $branchId ? null : 'Разделы медицины' }"
  btnText='{ backButtonName() }'
  on:click='{ backHandler }'
  width=800
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
    .info
      h2.h4 Ничего не нашлось
      p.p Попробуйте написать иначе или ищите в разделах ниже. Если не можете ничего найти — напишите или позвоните нам, мы поможем.

    h2.h3 Все разделы

  //- ############# SEARCH MENU #############
  //- Shows only if we search,
  //- or view to first lvl (defines by branch id == null)
  +if('!$branchId && $searchString')
    +if('$searchResult.count.pages')
      h2.h4 { foundPagesHeader() }
      .search-result-wrap
        +each('$searchResult.pages as branch')
          .single-folder-wrap
            +if('branch.name')
              h4.p-small.folder-header { branch.name }
              +else
                h4.p-small.folder-header Корневой раздел
            ul.single-folder
              +each('branch.pages as page')
                li.item-col.item.light_shadow.page
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
      .search-result-wrap
        +each('$searchResult.branches as branch')
          .single-folder-wrap
            +if('branch.name')
              h4.p-small.folder-header { branch.name }
              +else
                h4.p-small.folder-header Корневые разделы
            ul.single-folder
              +each('branch.branches as branch')
                li.item-col.item.light_shadow.branch
                  button( on:click!=`{() => {
                      branchId.set(branch.id)
                      backPointId.set(branch.id)
                    }}`)
                    span { branch.name }

  //- ############# DEFAULT MENU #############
  //- Shows only if search result is no success
  //- or if we showing a second level (defines by branch id)
  +if('!$searchResult.success || $branchId')
    +if('menuPages')
      ul.folder(style=`
        --columns--1:{styleMapPages.col[1]};
        --columns--2:{styleMapPages.col[2]};
        --columns--3:{styleMapPages.col[3]};`)
        +each('menuPages as page, i')
          li.item-grid.item.light_shadow.page(class='{styleMapPages.map[i]}')
            a(
              rel=prefetch
              href=`/medical-pages/{page.id}`
              on:click!='{() => showMenu.set(false)}'
            )
              span.ellipsis {page.name}

    +if('menuBranches')
      +if('menuPages')
        h2.h4 Подразделы
      ul.folder(style=`
        --columns--1:{styleMapBranches.col[1]};
        --columns--2:{styleMapBranches.col[2]};
        --columns--3:{styleMapBranches.col[3]};`)
        +each('menuBranches as branch, i')
          li.item-grid.item.light_shadow.branch(class='{styleMapBranches.map[i]}')
            button( on:click!=`{() => {
                branchId.set(branch.id)
                searchCleaner()
              }}`)
              span.ellipsis {branch.name}


</template>

<style lang='postcss'>
@import "../../style/mixins.sss"

.search_wrapper
  margin-bottom: 15px

.h3, .h4
  margin:
    right: 50px
    bottom: 10px

.info
  display: block
  background-color: var(--LIGHT-GRAY)
  padding: 10px 13px
  border-radius: 15px
  margin-bottom: 20px

  .h4
    margin-bottom: 4px
  p
    max-width: 620px


.folder-header
  margin-bottom: 8px

/* Folder mixins */
@define-mixin first-child
  border-radius:
    var(--radius--menu-item)
    var(--radius--menu-item)
    0 0
@define-mixin last-child
  border-radius:
    0 0
    var(--radius--menu-item)
    var(--radius--menu-item)
@define-mixin only-child
  border-radius:
    var(--radius--menu-item)

.search-result-wrap
  display: block
  columns: 3
  column-gap: 20px
  @media ( 450px <= width < 650px )
    columns: 2
  @media  ( width < 450px )
    columns: 1

.single-folder-wrap
  display: block
  break-inside: avoid-column
  padding-bottom: 25px

.single-folder
  display: block
  list-style: none
  padding: 0
  margin: 0

  & .item-col
    border-radius: 0
    break-inside: avoid-column
    &:first-child
      @mixin first-child
    &:last-child
      @mixin last-child
    &:only-child
      @mixin only-child


.folder
  list-style: none
  padding: 0
  margin:
    top: 0
    bottom: 0

  display: grid
  grid-auto-flow: column
  grid-column-gap: 20px
  grid-template-rows: repeat(var(--columns--3), max-content)
  grid-auto-columns: calc((100% - 40px)/3)
  @media ( 450px <= width < 650px )
    grid-auto-columns: calc((100% - 20px)/2)
    grid-template-rows: repeat(var(--columns--2), max-content)
  @media  ( width < 450px )
    grid-auto-columns: 100%
    grid-template-rows: repeat(var(--columns--1), max-content)

  & .item-grid
    border-radius: 0
    @media ( width >= 650px )
      &.first--3
        @mixin first-child
      &.last--3
        @mixin last-child
      &.only--3
        @mixin only-child
    @media ( 450px <= width < 650px )
      &.first--2
        @mixin first-child
      &.last--2
        @mixin last-child
      &.only--2
        @mixin only-child
    @media  ( width < 450px )
      &.first--1
        @mixin first-child
      &.last--1
        @mixin last-child
      &.only--1
        @mixin only-child


.item
  position: relative
  border-radius:
    var(--radius--menu-item)
  border:
    solid
    1px
    var(--color--card--border---main)
  background-color:
    var(--color--card--bg---main)

  & a, & button
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 15px
    min-height: 44px
    text-decoration: none
    color: var(--LIGHT-BLACK)
    font-style: normal
    font-size: 15px
    line-height: 130%
    cursor: pointer
    background-color: #fff0
    border: none
    width: 100%

  &.branch button:after
    content: url("/icons/25/arrow-r.svg")
    height: 25px
    align-self: flex-start
    margin-left: 12px

  &.page a:after
    content: url("/icons/25/new-page.svg")
    height: 25px
    align-self: flex-start
    margin-left: 12px

  &:hover
    border-color: var(--color--btn--border---active)

  &:active
    transform: translateY(-2px)

  & span
    display: block
    text-align: left

    &.ellipsis
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis


</style>