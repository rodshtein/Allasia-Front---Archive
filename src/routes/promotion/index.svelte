<script context="module">
  export async function preload(){
    let req = await this.fetch(`promotion/data.json`);
    let json = await req.json()

    return { DATA:json };
  }
</script>

<script>
  export let DATA;

  import CardPromotion from '../../components/Card-promotion.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';

  let date = new Date(Date.now())

  function check(start, finish){
    return date >= new Date(start) && date < new Date(finish)
  };
</script>

<template lang='pug'>
svelte:head
  title Промоакции

header
  h1.h1 Промоакции
  p.subheader-h1 Скидки, специальные предложения, выездные консультации, бесплатное лечение
  .illustration

CardWrapper
  .promo-container
    +each('DATA as promo')
      +if('check(promo.date_start, promo.date_finish)')
        CardPromotion(data='{promo}' href='./promotion/')
CardWrapper
  CallToAction(
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