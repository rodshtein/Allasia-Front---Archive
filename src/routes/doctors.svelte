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

  const DOCS = gql`{
    allDoctors (first: 20) {
      name
    },
  }`;

  //restore(client, DOCS, cache.data);

  let client =  getContext('apollo');
  let Query = query(client, { query: DOCS });

</script>

<template lang='pug'>

+await('$Query')
  +then('result')
    +each('result.data.allDoctors as el')
      .p {el.name}



  +catch('error')
    pre {error}

</template>
