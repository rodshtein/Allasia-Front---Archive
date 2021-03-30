<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../tinyClient';
  import { CONTACTS } from './contacts/queries.js';

  export async function preload() {
    return { DATA : await client(CONTACTS) };
  }

</script>

<script>
  export let DATA;
  import Contact from '../components/contacts/numbers.svelte';
  import { sort } from '../helpers';


  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: CONTACTS
      }),
      DATA
    )
  });

</script>

<template lang='pug'>
+each('sort(DATA.allContactCountries) as country')
  +if('country?.name')
    h2.h3 {country.name}
    +each('sort(country.contacts, "city") as contact')
      Contact('{contact}')

</template>

<style lang='postcss'>
.h3
  margin-bottom: 10px

</style>