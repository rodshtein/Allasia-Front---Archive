<script>
import { client } from "../utils";
import { query } from "svelte-apollo";
import { gql } from "apollo-boost";
import { onMount } from "svelte";

import Popup from './Popup.svelte';

export let branchId;
export let showBranch;

const BRANCHES = gql`
  query ($id: ID!){
    MedicalBranch (where:{id: $id}) {
      name
    	pages (sortBy:name_ASC){
        id
        name
      }
      children (sortBy:name_ASC){
        name
        id
      }
      parent {
        name
        id
      }
    }
  }`;

  let branchQuery;

  $: {
    console.log(branchId)

    if(branchId) {
      branchQuery = query(client, {
        query: BRANCHES,
        variables: {
            id: branchId
          }
      });
    }
  }
</script>

<template lang='pug'>
+if('$branchQuery')
  Popup(
    bind:show!='{showBranch}'
    header='test')


</template>

<style lang='postcss'>

</style>