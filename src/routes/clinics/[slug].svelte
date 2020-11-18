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

+if('Q.doctors && Q.doctors[0]')
  CardWrapper
    CardHeader(header!='{Q.doctors.length > 1 ? "Врачи" : "Врач" }')
    Doctors(data='{Q.doctors}')

+if('Q.technology && Q.technology[0]')
  CardWrapper
    CardHeader(header='Технологии')
    Technology(data='{Q.technology}')

</template>

<style lang='postcss'>

</style>
