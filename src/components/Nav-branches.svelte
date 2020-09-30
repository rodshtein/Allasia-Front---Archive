<script>
import { client } from "../utils";
import { query } from "svelte-apollo";
import { showMenu, branchId } from './Store-branches.js';
import { BRANCHES } from '../queries';
import Popup from './Popup.svelte';
import SearchBox from './Search-box.svelte';


let branchQuery = query(client, {
    query: BRANCHES,
  });

let queryResult;
let menuHeader;
let menuBrunchName;
let backButtonName;
let menuParentId;
let menuPages;
let menuChildren;

$branchQuery.then(
  result => {
    queryResult = result.data.allMedicalBranches
  }
)

function findChildrenById(id) {

  if(!queryResult) return

  if(id){
    let item = queryResult.find(item => item.id == id);

    menuHeader = null
    menuBrunchName = item.name
    menuPages = item.pages

    backButtonName = item.parent
    ? item.parent.name
    : 'Все разделы';

    menuParentId = item.parent ? item.parent.id : null;
    menuChildren = item.children.length ? item.children : null;

  } else {
    let items = queryResult.filter(item => !item.parent);

    menuHeader = 'Разделы медицины'
    menuBrunchName = null
    menuPages = null
    backButtonName = null
    menuParentId = null
    menuChildren = items
  }

  $showMenu = true;
}


// if id comes from the store
$: findChildrenById($branchId)

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
  +if('menuBrunchName')
    h2.h3 {menuBrunchName}
  ul.slider
    +if('menuPages')
      +each('menuPages as el')
        li
          a.items.page(
            rel=prefetch
            href=`/medical-pages/{el.id}`
            on:click!='{() => $showMenu = false}'
          )
            span {el.name}

    +if('menuChildren')
      +each('menuChildren as el')
        li
          button.items.branch(
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

.slider
  display: grid
  column-gap: 15px
  row-gap: 5px
  list-style: none
  padding: 0
  grid-auto-flow: row



.items
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 15px
  min-height: 44px
  width: 320px

  text-decoration: none
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

  &.branch:after
    content: url("/icons/25/arrow-r.svg")

  &.page:after
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