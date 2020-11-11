<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { CLINICS_COUNTRY_CLINICS } from '../../queries';

  export async function preload(page) {

    let query = await client.query({
        query: CLINICS_COUNTRY_CLINICS
      });

    return {
      PAGE: page,
      DATA: query.data,
      Q: query.data.allClinicCountries,
    };
  }

</script>

<script>
  export let PAGE;
  export let DATA;
  export let Q;

  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: CLINICS_COUNTRY_CLINICS,
      data: DATA
    })
  });

</script>

<template lang='pug'>

</template>