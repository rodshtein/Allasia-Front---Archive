<script>
import { client } from "../utils";
import { orderSplice, getRootBranch } from "../helpers";
import { BRANCHES } from '../queries';
import { showMenu } from './Store-branches.js';
import {  searchInProgress,
          searchString,
          prevSearchString,
          searchResult, } from './Store-search.js';

let branches = [];
let disabled = true;

client.watchQuery({ query: BRANCHES }).subscribe(
  (result) => {
    if (result.errors) {
      console.log({ 'result error':result.errors })
    } else {
      branches = result.data.allMedicalBranches
      disabled = false
      // console.log(result.data);
    }
  },
  (error) => console.log({ 'request error':error  })
);

$: $searchString, searchThrottle();

function searchThrottle() {

  if(!$searchString) {
    prevSearchString.set(null)
    searchResult.set({
      success: false,
      pages: null,
      branches: null,
      count: {
        pages: null,
        branches: null
      }
    })
    return
  }

  if(
    $searchInProgress ||
    !branches.length ||
    $prevSearchString === $searchString
    ) return

  searchInProgress.set(true)

  setTimeout(() => {
    searchInProgress.set(false)
    if($searchString) search()
    }, 300);
}

function search () {

  let string = $searchString;
  string = string ? string.trim().toLowerCase() : null;

  let foundBranches = [];
  let foundPages = [];
  let branchCount = 0;
  let pageCount = 0;

  /*
    foundBranches = [
      // eg. branch
      {
        id: '',       // 0 if root
        name: '',
        branches: [
          {
            id: '',
            name: '',
          }
        ]
      },
    ]

    Branch folder name = branch.parent ? branch.parent : 'root';


    Pages folder name = branch.parent ? branch.parent : branch;


  */

  branches.forEach( branch => {
    if(branch.pages.length) pageSearch(branch)

    if (branch.name.toLowerCase().includes(string)) {
      let rootBranch = getRootBranch(branch);
      let alreadyBranch = foundBranches.find(
          item => item.id === rootBranch.id
        );
      if(alreadyBranch) {
        branchCount++
        let item = {
          id: branch.id,
          name: branch.name,
        };
        orderSplice(alreadyBranch.branches, item, 'name')
      } else {
        branchCount++
        let item = {
          id: rootBranch.id,
          name: rootBranch.name,
          branches: [{
            id: branch.id,
            name: branch.name,
          }]
        };
        orderSplice(foundBranches, item, 'name')
      }
    }
  });

  /*
  foundPages = [
    // eg. branch
    {
      id: '';
      name: '';
      pages: [
        {
          id: ''
          name: ''
        },

      ];
    },
  ]
  */

  function pageSearch(branch){
    branch.pages.forEach(page => {

      // basic search methods
      let matchedPage = page.name.toLowerCase().includes(string);
      let matchedDisease = page.diseases.find(disease => {
        let matchName = disease.name.toLowerCase().includes(string);
        let matchAdName = disease.ad_name ? disease.ad_name.toLowerCase().includes(string): false;
        return matchName || matchAdName
      })

      if(matchedPage || matchedDisease ) {
        let rootBranch = getRootBranch(branch, 1);
        let alreadyBranch = foundPages.find(
            (item) => item.id === rootBranch.id
          );

        if(alreadyBranch){
          pageCount++
          orderSplice(alreadyBranch.pages, page, 'name')
        } else {
          pageCount++
          let item = {
            id: rootBranch.id,
            name: rootBranch.name,
            pages: [
              page,
            ]
          };
          orderSplice(foundPages, item, 'name')
        }
      }
    });
  }

  searchResult.set({
    success: pageCount + branchCount,
    pages:foundPages,
    branches:foundBranches,
    count: {
      pages: pageCount,
      branches: branchCount,
    }
  })

  prevSearchString.set($searchString)
}

function keyHandler(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    if(e.target.value)
    showMenu.set(true)
  }

  if (e.key === 'Escape'|| e.keyCode == 27 ){
    if ($searchString) {
      e.stopPropagation()
    }
  }
}

</script>


<template lang="pug">
.wrapper(class=`{disabled}`)
  input(
    class=`{$searchInProgress ? 'in_action' : ''}`
    type="search"
    bind:value='{$searchString}'
    placeholder=`{ disabled
      ? 'Поиск, загружаю данные…'
      : 'Поиск, например: пластика'
    }`
    on:keydown='{keyHandler}'
    disabled='{disabled}'
    )
</template>

<style lang="postcss">

.wrapper
  position: relative
  width: 100%

  &:after
    content: url('/icons/25/search.svg')
    position: absolute
    left: 5px
    top: 5px

  &.disabled:after
    animation:
      icon-pulse
      1.3s infinite linear

input
  position: relative
  font-family: var(--font--main)
  font-style: normal
  font-weight: 450
  font-size: 16px
  line-height: 19px

  height: 35px
  width: 100%
  border: 1px solid var(--color--borders---inputs)
  box-sizing: border-box
  border-radius: 9px
  padding-left: 35px
  padding-right: 10px

  appearance: none
  caret-color: var(--color--txt-placeholder)
  color: var(--color--txt-subheaders)

  &::-webkit-search-cancel-button
    -webkit-appearance: none
    cursor: pointer
    content: url("/icons/17/x.svg")
    display: block
    margin-right: 0px

  &.in_action::-webkit-search-cancel-button
    content: url("/icons/17/spinner.svg")

  &::placeholder
    color: var(--color--txt-placeholder)

  &:hover, &:focus
    border-color: var(--color--btn-border---active)

  &:disabled
    animation:
      pulse
      1.3s infinite linear

@keyframes pulse
  0%
    opacity: .2
    background: rgb(255 255 255 / 0)
  50%
    opacity: 1
    background: rgb(255 255 255 / 1)
  100%
    opacity: .2
    background: rgb(255 255 255 / 0)

@keyframes icon-pulse
  0%
    opacity: .0
  50%
    opacity: .4
  100%
    opacity: .0


</style>