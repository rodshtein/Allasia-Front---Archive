<script>
import Popup from './Popup.svelte';
import Contact from './contacts/numbers.svelte';
import { sort } from './../helpers';
import { showCallModal, contactsIsLoaded } from './stores/Store-call.js';
import { client }  from '../tinyClient';
import { CONTACTS } from './contacts/queries.js';

let DATA;

client(CONTACTS).then(
    result => setData(result.allContactCountries),
    error => console.error(error)
);

function setData(data){
  console.log('is loaded')
  DATA = data
  contactsIsLoaded.set(true)
}
</script>

<template lang='pug'>
Popup(
  bind:show!='{ $showCallModal }'
  header='Телефоны')

  +each('sort(DATA) as country')
    +if('country?.name')
      h2.h3 {country.name}
      +each('sort(country.contacts, "city") as contact')
        Contact('{contact}')


</template>

<style lang='postcss'>

.h3
  margin-bottom: 10px

</style>