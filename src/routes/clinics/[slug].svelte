<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { CLINIC_PAGE } from './queries';

  export async function preload(page) {

    let query = await client.query({
        query: CLINIC_PAGE,
        variables: {
          id: page.params.slug
        }
      });

    return {
      PAGE: page,
      DATA: query.data,
      Q: query.data.Clinic,
    };
  }

</script>

<script>
  export let PAGE;
  export let DATA;
  export let Q;

  // components
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Description from '../../components/Card-description.svelte';
  import Feedback from '../../components/Slider-feedback.svelte';
  import Doctors from '../../components/Slider-doctors.svelte';
  import Technology from '../../components/Slider-technology.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';
  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: CLINIC_PAGE,
      variables: {
          id: PAGE.params.slug
      },
      data: DATA
    })
  });

</script>

<template lang='pug'>

+if('!Q')
  p Что-то пошло не так…


+if('Q')
  header
    h1.h1 Клиники
    p.p-large Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
    .illustration

+if('Q.description')
  CardWrapper
    .description-wrap
      +if('Q.description')
        div
          CardHeader(header='Описание')
          Description(
            header = '{Q.name_ru}'
            subHeader = '{Q.full_name_ru}'
            content = '{Q.description.document}'
          )

CardWrapper
  CallToAction(
    header='Хотите поехать в эту клинику?'
    text='Напишите или позвоните, расскажите какая услуга вас интересует — мы всё устроим.'
    btnText='Открыть чат'
    tel
  )

+if('Q.feedback && Q.feedback[0]')
  CardWrapper
    CardHeader(header!='{Q.feedback.length > 1 ? "Отзывы" : "Отзыв" }')
    Feedback(data='{Q.feedback}')

+if('Q.staff')
  CardWrapper
    CardHeader(header!='{Q.staff.length > 1 ? "Врачи" : "Врач" }')
    Doctors(data='{Q.staff}')

+if('Q.technology && Q.technology[0]')
  CardWrapper
    CardHeader(header='Технологии')
    Technology(data='{Q.technology}')

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
