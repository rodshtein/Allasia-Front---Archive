<script context="module">
  import { client } from "../../utils";
  import { gql } from "apollo-boost";

  const PAGES = gql`
    query{
      allMedicalPages (sortBy:name_ASC) {
        id
        name
        branch {
          id
          name
        }
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

.wrap
  +each('$pagesQuery.data.allMedicalPages as item')
    .item
      +if('item.branch && item.branch.name')
        .branch {item.branch.name}
      a(alt='{item.name}' href='{PAGE.path}/{item.id}') {item.name}


</template>


<style lang='postcss'>
/* @import "../style/mixins.sss" */
.wrap
  padding: 20px

.item
  margin-bottom: 5px

.branch
  display: block
  font-size: 11px
  color: #888
  margin-bottom: -3px

a
  display: block
  color: black
  text-decoration: none
  font-size: 17px
  &:hover
    color: red

</style>
