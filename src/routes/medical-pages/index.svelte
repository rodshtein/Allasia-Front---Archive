<script context="module">
  import { client } from "../../utils";
  import { gql } from "apollo-boost";

  const PAGES = gql`
    query{
      allMedicalPages {
        id
        name
      }
    }
  `;

  export async function preload(page) {
    // redirect
		// return this.redirect(301, '/');
    return {
      PAGE: page,
      cache: await client.query({
        query: PAGES
      })
    };
  }

</script>

<script>
// components
  import Button from '../../components/Button.svelte';
  // Appolo
  import { onMount } from "svelte";
  import { restore, query, } from "svelte-apollo";
  export let cache;
  export let PAGE;

  restore(client, PAGES, cache.data);

  let pagesQuery = query(client, { query: PAGES });

</script>


<template lang='pug'>

svelte:head
  title Медицинские направления

+each('$pagesQuery.data.allMedicalPages as item')
  a(alt='{item.name}' href='{PAGE.path}/{item.id}') {item.name}
</template>


<style lang='postcss'>
/* @import "../style/mixins.sss" */

.devider
  margin: 0 15px

</style>
