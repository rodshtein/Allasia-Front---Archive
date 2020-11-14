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
header
  h1.h1 Клиники
  p.subheader-h1-I Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
  .illustration

pre {JSON.stringify(Q, 0, 2)}
</template>

<style lang='postcss'>

@import "../../style/mixins.sss"

header
  display: grid
  grid-template: auto / 1fr
  justify-items: center
  grid-row-gap: 20px
  padding:
    top: 50px
    right: 15px
    bottom: 0
    left: 15px
  margin-bottom: 20px

  @media( width > 450px )
    grid-template: 1fr / auto 30%
    grid-column-gap: 80px
    justify-items: start
    padding:
      bottom: 50px

    &::after
      content: ''
      margin-top: 50px
      width: 100%
      grid-area: span 1 / span 2
      @mixin devider


  @media( width > 800px )
    grid-column-gap: 120px
    padding-top: 100px
    padding-bottom: 50px
    grid-row-gap: 15px

  .subheader-h1-I
    @media( width <= 450px )
      display: none

  .illustration
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/plus.svg')
    max-width: 360px
    width: 100%
    height: 110px
    order: -1

    @media( width > 450px )
      height: 100%
      margin-bottom: 0
      grid-area: 1 / 2 / span 2

</style>