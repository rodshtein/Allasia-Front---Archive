<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { PROMOMOTION } from './queries';

  export async function preload(page) {

    let query = await client(
      PROMOMOTION,
      { url: page.params.slug }
    );

    return {
      PAGE: page,
      _DATA: query,
    };
  }

</script>

<script>
  export let PAGE;
  export let _DATA;

  import { serialize } from '../../helpers.js';

  // components
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Clinics from '../../components/Slider-clinics.svelte';
  import Doctors from '../../components/Slider-doctors.svelte';
  import Technology from '../../components/Slider-technology.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';


  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: PROMOMOTION,
        variables : {
          url: PAGE.params.slug
        }
      }),
      _DATA
    )
  });

  // Short data path
  $: DATA = _DATA.allPromotions[0]


</script>

<template lang='pug'>

+if('!DATA')
  p Что-то пошло не так…

+if('DATA')
  header
    .wrap
      h1.h1 {DATA.name}

  CardWrapper
    .content
      +html('serialize(JSON.parse(DATA.review.document))')

  +if('DATA.doctors && DATA.doctors.length')
    CardWrapper
      CardHeader(header!='{DATA.doctors.length > 1 ? "Врачи" : "Врач" }')
      Doctors(data='{DATA.doctors}')

  +if('DATA.clinics && DATA.clinics[0]')
    CardWrapper
      CardHeader(header!='{DATA.clinics.length > 1 ? "Клиники" : "Клиника" }')
      Clinics(data='{DATA.clinics}')

  +if('DATA.technologies && DATA.technologies[0]')
    CardWrapper
      CardHeader(header='Технологии')
      Technology(data='{DATA.technologies}')

  CardWrapper
    CallToAction(
      header='Хотите участвовать в акции?'
      text='Напишите или позвоните, — мы всё устроим!'
      btnText='Открыть чат'
      tel
    )

</template>

<style lang='postcss'>
@import "../../style/mixins.sss"

header
  display: grid
  grid-auto-columns: 1fr
  justify-items: center
  align-items: start
  grid-row-gap: 20px
  padding:
    top: 0
    right: 15px
    bottom: 0
    left: 15px
  margin-bottom: 20px
  text-align: center

  @media( width >= 650px )
    grid-auto-columns: minmax(min-content, 80%) 30%
    grid-column-gap: 60px
    justify-items: start
    padding:
      top: 50px
      bottom: 50px
    text-align: left

  @media( width > 800px )
    grid-auto-columns: minmax(min-content, 80%) 200px
    grid-column-gap: 100px

</style>
