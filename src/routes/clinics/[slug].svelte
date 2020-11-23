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

  let description = () => {
    let n = Q.full_name_ru ? Q.full_name_ru + ', ': '';
    let c = Q.country.name ? Q.country.name : '';
    return n + c
  }

  function check(left, right){
    return left < right
  }

  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };
</script>

<template lang='pug'>

+if('!Q')
  p Что-то пошло не так…


+if('Q')
  header
    .wrap
      h1.h1 {Q.name_ru}
      +if('Q.name !== Q.name_ru')
        p.e_name {Q.name}
      +if('description()')
        p.subheader-h1 {description()}

      +if('Q.type && Q.type[0].name')
        .type
          h2.h4 Специализация
          p.p
            +if('Q.type')
              +each('Q.type as el, i')
                +if('check(i, Q.type.length - 1)')
                  +if('i === 0')
                   | {el.name + ', '}
                   +else
                    | {el.name.toLowerCase() + ', '}
                +if('Q.type.length - 1 === i')
                  | {el.name.toLowerCase() + '.'}

    +if('Q.head_img && Q.head_img.publicUrl')
      .illustration(style=`background-image: url('{Q.head_img.publicUrl}')`)

+if('Q.description')
  CardWrapper
    .description-wrap
      +if('Q.description')
        div
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

+if('Q.staff && Q.staff.length')
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
    padding-top: 20px
    padding-bottom: 50px

  .e_name
    margin-top: 20px
    font-size: 15px
    font-weight: text
    font-style: italic
    color: var(--LIGHT-BLACK)
    padding:
      left: 19px
      right: 19px
    @media( width >= 650px )
      margin-top: 30px
      font-size: 17px
      padding:
        left: 0
        right: 0

  .subheader-h1
    margin-top: 5px
    padding:
      left: 19px
      right: 19px
    @media( width >= 650px )
      padding:
        left: 0
        right: 0

  .type
    display: block
    padding:
      top: 30px
      left: 9px
      right: 9px
    margin:
      top: 30px
      left: 10px
      right: 10px
    text-align: left
    @mixin devider_top

    @media ( width >= 650px )
      display: inline-block
      border: none
      padding:
        top: 30px
        left: 0
        right: 0
      margin: 0

    .h4
      margin-bottom: 5px
      @media ( width >= 650px )
        padding-bottom: 10px
        margin-bottom: 7px
        @mixin devider_bottom

  .illustration
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    border-radius: 50%
    border: solid 1px var(--color--borders---card-img)
    width: 120px
    height: 120px
    order: -1

    @media( width >= 450px )
      width: 160px
      height: 160px

    @media( width >= 650px )
      width: 100%
      padding-bottom: calc(100% - 2px)
      height: 0
      margin-bottom: 0
      grid-area: 1 / 2 / span 1

</style>
