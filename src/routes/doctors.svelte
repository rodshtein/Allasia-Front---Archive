<!-- <script context="module">
  // Here we import the graphql client
  import { client } from "../utils";
  import { gql } from "apollo-boost";

  const DOCS = gql`{
    allDoctors (first: 20) {
      name
    },
  }`;

  export async function preload() {
    return {
      cache:
        await client.query({
          query: DOCS,
        })
    };
  }

</script> -->

<script>
  import { query } from "svelte-apollo";
  import { getContext } from "svelte";
  import { gql } from "apollo-boost";
  import { client } from "../utils";
  import BranchesMenu from '../components/Branches-menu.svelte';

  const DOCS = gql`{
    allDoctors (first: 20) {
      name
    },
  }`;

  const BRANCHES = gql`{
    allMedicalBranches (sortBy:name_ASC) {
      name
      children {
        name
      }
      parent {
        name
      }
    }
  }`;

  let Query = query(client, { query: DOCS });
  let branchesQuery = query(client, { query: BRANCHES });
</script>

<template lang='pug'>
BranchesMenu('{branchesQuery}')
+await('$Query')
  +then('result')
    +each('result.data.allDoctors as el')
      .p {el.name}



  +catch('error')
    pre {error}

</template>
