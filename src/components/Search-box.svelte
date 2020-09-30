<script>
import { client } from "../utils";
import { BRANCHES } from '../queries';
import { showMenu, searchResult } from './Store-branches.js';
import { get } from 'svelte/store';

let branches = [];
let isDisabled = true;

$: $searchResult, search();


client.watchQuery({ query: BRANCHES }).subscribe(
  (result) => {
    if (result.errors) {
      console.log({ 'result error':result.errors })
    } else {
      branches = result.data.allMedicalBranches
      isDisabled = false
      // console.log(result.data);
    }
  },
  (error) => console.log({ 'request error':error  })
);

function search () {

  let string = $searchResult.searchString;
  string = string ? string.trim().toLowerCase() : null;

  if(!string) {
    searchResult.pages = null
    searchResult.branches = null
    return
  }

  let filteredPages = [];

  let filteredBranches = branches.filter((branch) => {
    if(branch.pages.length) pageSearch(branch)
    return branch.name.toLowerCase().includes(string)
  });

  /*
  filteredPages = [
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
      let pageMatched = page.name.toLowerCase().includes(string);
      let matchedDisease = page.diseases.find(diseas => {
        return diseas.name.toLowerCase().includes(string)
      })

      if(pageMatched || matchedDisease != undefined) {
        let alreadyBranch = filteredPages.find((item) => item.id === branch.id);
        if(alreadyBranch == undefined){
          filteredPages.push({
            id: branch.id,
            name: branch.name,
            pages: [
              page,
            ]
          })
        } else {
          alreadyBranch.pages.push(page)
        }
      }
    });
  }

  // console.log(filteredPages)
  // console.log(filteredBranches)

  searchResult.pages =  filteredPages
  searchResult.branches = filteredBranches

}

function keyHandler(e) {
    if(e.target.value) $showMenu = true
  }

</script>

<!-- svelte-ignore css-unused-selector -->
<template lang="pug">
.wrapper(class=`{ isDisabled ? 'disabled' : ''}`)
  input(
    type="search"
    bind:value='{$searchResult.searchString}'
    placeholder=`{ isDisabled
      ? 'Поиск, загружаю данные…'
      : 'Поиск, например: пластика'
    }`
    on:search='{keyHandler}'
    disabled='{isDisabled}'
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
  font-style: normal
  font-weight: normal
  font-size: 15px
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