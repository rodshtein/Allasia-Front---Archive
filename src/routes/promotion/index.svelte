<script context="module">
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { sort } from '../../helpers.js';
  import { contactsIsLoaded, showCallModal, contacts } from '../../components/stores/Store-call.js';
  import { PROMO_PAGES } from './queries';
  import { CONTACTS } from './../contacts/queries';

  export async function preload() {
    return {
      DATA : await client(PROMO_PAGES),
      _CONTACTS: await client( CONTACTS )
    };
  }

</script>

<script>
  export let DATA;
  export let _CONTACTS;

  import CardPromotion from '../../components/Card-promotion.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';


  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: PROMO_PAGES
      }),
      DATA
    )
    cache.set(
      JSON.stringify({
        query: CONTACTS,
        variables : {
          first: 3
        }
      }),
      _CONTACTS
    )
  });

  let date = new Date(Date.now())

  function check(start, finish){
    return date >= new Date(start) && date < new Date(finish)
  };

  /*
  // better arrangement

  function calcCards(name){
    let q = DATA.allPromotions.reduce(
      (val, el) => check(el.date_start, el.date_finish) ? ++val : val,
    0);
    let qty = isInteger(q / 3) ? 'full' : q;

    return name + qty
  }
 */

   // Load and process contacts
   const { preloading, session } = stores();
  let shift = {field: "ISO", search: $session.geo || "RU"};
  let _contacts = sort(_CONTACTS.allContactCountries, "name", shift);
  let contact = _contacts[0].contacts.find(el=>el.main_number) || _contacts[0].contacts[0];

  if(!$contacts) contacts.set(_contacts)
  contactsIsLoaded.set(true)

</script>

<template lang='pug'>
header
  h1.h1 Промоакции
  p.subheader-h1 Скидки, специальные предложения, выездные консультации, бесплатное лечение
  .illustration

CardWrapper
  .promo-container
    +each('DATA.allPromotions as promo')
      +if('check(promo.date_start, promo.date_finish)')
        CardPromotion(data='{promo}' href='./promotion/')
CardWrapper
  CallToAction(
    {contact}
    header='Есть вопросы?'
    text='Напишите или позвоните, расскажите какая акция вас интересует — мы вам поможем.'
    btnText='Заполнить заявку'
  )
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
    background-image: url('/illustration/promo.svg')
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

.promo-container
  display: grid
  grid-template-columns: 1
  grid-gap: 10px
  @media( width > 450px )
    grid-template-columns: repeat( 2, 1fr )
    grid-gap: 20px 10px
  @media( width > 850px )
    grid-template-columns: repeat( 3, 1fr )

</style>