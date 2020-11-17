<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { CLINICS_COUNTRY_CLINICS } from '../../queries';

  export async function preload(page) {

    let query = await client.query({
        query: CLINICS_COUNTRY_CLINICS
      });

    return {
      DATA: query.data,
      Q: query.data.allClinicCountries,
    };
  }

</script>

<script>
  export let DATA;
  export let Q;

  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Clinic from '../../components/Card-clinic.svelte';
  import Clinics from '../../components/Slider-clinics.svelte';

  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: CLINICS_COUNTRY_CLINICS,
      data: DATA
    })
  });

  function sortClinics(data){
    if(!data) return null
    let sortedCountry = [];

    data.forEach(country => {
      if(country.clinics.length) {

          // Sort clinics by country name
          if(country.clinics.length > 1){
            let clinics = country.clinics.slice().sort((a, b) => {
              a = a.name_ru ? a.name_ru : '';
              b = b.name_ru ? b.name_ru : '';
              return a.localeCompare(b)
            });
            sortedCountry.push(Object.assign({}, country, { clinics }))
          } else {
            sortedCountry.push(Object.assign({}, country ))
          }
      }
    });

    // Sort country's with sorted clinics
    sortedCountry.sort((a, b) => {
      a = a.name ? a.name : '';
      b = b.name ? b.name : '';
      return a.localeCompare(b)
    });

    return sortedCountry
  }
</script>

<template lang='pug'>
header
  h1.h1 Клиники
  p.p-large Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
  .illustration

+each('sortClinics(Q) as country')
  CardWrapper
    CardHeader(header!='{country.name}')
    .clinics-container
      +each('country.clinics as clinic')
        Clinic(data='{clinic}')

</template>

<style lang='postcss'>
@import "../../style/mixins.sss"

.clinics-container
  display: grid
  grid-template-columns: 1
  grid-gap: 10px
  @media( width > 450px )
    grid-template-columns: repeat( 2, 1fr )
    grid-gap: 20px 10px
  @media( width > 850px )
    grid-template-columns: repeat( 3, 1fr )


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

  .p-large
    text-align: center
    @media( width >= 450px )
      text-align: left

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