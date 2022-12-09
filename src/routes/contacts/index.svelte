<script context="module">
  export async function preload(){
    let res = await this.fetch(`contacts/data.json`);
    let json = await res.json()
    return { DATA: json };
  }
</script>

<script>
  export let DATA;

  import { stores } from '@sapper/app';
  import { sort } from '../../helpers';

  import CardPromotion from '../../components/Card-promotion.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Contact from '../../components/contacts/body.svelte';
</script>

<template lang='pug'>
svelte:head
  title Контакты
  
header
  h1.h1 Контакты
  p.subheader-h1 Организуем лечение из любого города России, Казахстана или Кыргызстана
  .illustration

+each('DATA as country')
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