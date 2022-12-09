<script context="module">
  export async function preload(){
    let req = await this.fetch(`clinics/data.json`);
    let json = await req.json()

    return { DATA:json };
  }
</script>

<script>
  export let DATA;

  import { sortTrees } from '../../helpers';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Clinic from '../../components/Card-clinic.svelte';
  import Clinics from '../../components/Slider-clinics.svelte';

  const sordedData = sortTrees({
    data: DATA,
    sort_field: 'name',
    sub_selector: 'clinics',
    sub_sort_field: 'name_ru'
  });
</script>

<template lang='pug'>
svelte:head
  title Клиники
  
header
  h1.h1 Клиники
  p.subheader-h1 Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
  .illustration

+each(`sordedData as country`)
  CardWrapper
    CardHeader(header!='{country.name}')
    .clinics-container
      +each('country.clinics as clinic')
        Clinic(data='{clinic}' href='./clinics/')

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

  @media( width >= 450px )
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


  @media( width >= 800px )
    grid-column-gap: 120px
    padding-top: 50px
    padding-bottom: 50px
    grid-row-gap: 15px

  .subheader-h1
    text-align: center
    @media( width >= 450px )
      text-align: left

  .illustration
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/plus.svg')
    width: 100%
    height: 110px
    order: -1

    @media( width > 450px )
      height: 100%
      max-height: 130px
      max-width: 130px
      justify-self: end
      margin-bottom: 0
      grid-area: 1 / 2 / span 2

.clinics-container
  display: grid
  grid-template-columns: 1
  grid-gap: 10px
  @media( width > 450px )
    grid-template-columns: repeat( 2, 1fr )
    grid-gap: 20px 10px
  @media( width > 850px )
    grid-template-columns: repeat( 3, 1fr )

</style>