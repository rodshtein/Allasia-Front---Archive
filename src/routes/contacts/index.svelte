<script context="module">
  import { client, cache }  from '../../tinyClient';
  import { CONTACTS } from './queries';

  export async function preload() {
    return { DATA : await client(CONTACTS) };
  }

</script>

<script>
  export let DATA;

  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import { sort } from '../../helpers';
  import { contacts, contactsIsLoaded } from '../../components/stores/Store-call.js';

  import CardPromotion from '../../components/Card-promotion.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Contact from '../../components/contacts/body.svelte';

  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: CONTACTS
      }),
      DATA
    )
  });

  // Load and process contacts
  const { preloading, session } = stores();
  let shift = {field: "ISO", search: $session.geo || "RU"};
  let _contacts = sort(DATA.allContactCountries, "name", shift);
  if(!$contacts) contacts.set(_contacts)
  contactsIsLoaded.set(true)

</script>

<template lang='pug'>
header
  h1.h1 Контакты
  p.subheader-h1 Организуем лечение из любого города России, Казахстана или Кыргызстана
  .illustration

+each('_contacts as country')
  CardWrapper
    CardHeader(header='{country?.name}')
    +each('sort(country.contacts, "city") as contact')
      .contact-card.card_decor__white
        Contact('{contact}')

</template>

<style lang='postcss'>
@import "../../style/mixins.sss"

header
  display: grid
  grid-template: auto / 1fr
  justify-items: center
  grid-row-gap: 20px
  padding:
    top: 0
    right: 15px
    bottom: 0
    left: 15px
  margin-bottom: 20px

  @media( width >= 800px )
    grid-template: auto / auto 50%
    grid-column-gap: 40px
    grid-row-gap: 15px
    justify-items: start
    padding:
      bottom: 50px
      top: 50px

  .subheader-h1
    max-width: 500px
    text-align: center
    @media( width >= 800px )
      text-align: left

  .illustration
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/address.svg')
    width: 100%
    height: 156px
    order: -1

    @media( width > 650px )
      height: 220px
      margin-bottom: 20px

    @media( width > 800px )
      height: 200%
      max-height: 230px
      max-width: 350px
      justify-self: end
      align-self: center
      margin-bottom: 0
      grid-area: 1 / 2 / span 2

.contact-card
  display: flex
  flex-direction: column
  justify-content: space-between
  max-width: 600px
  padding: 23px 19px
  margin-bottom: 20px


</style>