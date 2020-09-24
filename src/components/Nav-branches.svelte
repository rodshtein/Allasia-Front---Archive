<script>
import { client } from "../utils";
import { query } from "svelte-apollo";
import { isShowing, branchId } from './Store-branches.js';
import { BRANCHES } from '../queries';
import Popup from './Popup.svelte';



let branchQuery;
let paitPopup = false;

function getBranch(id){
  if(id) {
    paitPopup = true;
    branchQuery = query(client, {
      query: BRANCHES,
    });

    $branchQuery
    .then(
      result => {
        console.log('ready')
      }
    )
  }
}

$: getBranch($branchId)

</script>

<template lang='pug'>
Popup(
  bind:show!='{paitPopup}'
  header='id={$branchId}'
)
  +await('$branchQuery')
    p Loading...
    +then('result')
      +each('result.data.allMedicalBranches as el, i')
        +if('el.id == $branchId')
          pre {JSON.stringify(el, 0, 2)}

    +catch('error')
      pre {error}


</template>

<style lang='postcss'>

</style>