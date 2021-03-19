<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { CLINIC_PAGE } from './queries';

  export async function preload(page) {

    let query = await client(
      CLINIC_PAGE,
      { id: page.params.slug }
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

  // components
  import Nailer from '../../components/nailer/Nailer.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Description from '../../components/Card-description.svelte';

  import Promotions from '../../components/Slider-promotions.svelte';
  import Feedback from '../../components/Slider-feedback.svelte';
  import Doctors from '../../components/Slider-doctors.svelte';
  import Technology from '../../components/Slider-technology.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';


  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: CLINIC_PAGE,
        variables : {
          id: PAGE.params.slug
        }
      }),
      _DATA
    )
  });

  // Short data path
  $: DATA = _DATA.Clinic

  let description = () => {
    let n = DATA.full_name_ru ? DATA.full_name_ru + ', ': '';
    let c = DATA.country.name ? DATA.country.name : '';
    return n + c
  }

  function check(left, right){
    return left < right
  }

  let cls = (name) => {
    let gLength = DATA.gallery ? DATA.gallery.length : 0;
    let dLength = DATA.description && DATA.description.document ? 1 : 0;
    let total = gLength + dLength;

    if(total > 2) return name
    if(total < 2) return `${name} ${name}--1`
    if(total < 3) return `${name} ${name}--2`
  };
</script>

<template lang='pug'>

+if('!DATA')
  p Что-то пошло не так…


+if('DATA')
  header
    .wrap
      h1.h1 {DATA.name_ru}
      +if('DATA.name !== DATA.name_ru')
        p.e_name {DATA.name}
      +if('description()')
        p.subheader-h1 {description()}

      +if('DATA.type[0]?.name')
        .type
          h2.h4 Специализация
          p.p
            +if('DATA.type')
              +each('DATA.type as el, i')
                +if('check(i, DATA.type.length - 1)')
                  +if('i === 0')
                   | {el.name + ', '}
                   +else
                    | {el.name.toLowerCase() + ', '}
                +if('DATA.type.length - 1 === i')
                  | {el.name.toLowerCase() + '.'}

    +if('DATA.head_img && DATA.head_img.publicUrl')
      .head_img(style=`background-image: url('{DATA.head_img.publicUrl}')`)

+if('DATA.description?.document || DATA.gallery')
  CardWrapper
    Nailer
      +if('DATA.description?.document')
        div(class!='{cls("gallery_item")}')
          Description(
            header = '{DATA.name_ru}'
            subHeader = '{DATA.full_name_ru}'
            content = '{DATA.description.document}')

      +if('DATA.gallery')
        +each('DATA.gallery as el (el.id + DATA.gallery.length)')
          .card_decor__img(
            class!='{cls("gallery_item")}'
            style=`background-image: url('{el.img.publicUrl}')`
          )
            span {el.alt}

+if('DATA.staff?.length')
  CardWrapper
    CardHeader(header!='{DATA.staff.length > 1 ? "Врачи" : "Врач" }')
    Doctors(data='{DATA.staff}')

+if('DATA.promotions?.length')
  CardWrapper
    CardHeader(header!='{DATA.promotions.length > 1 ? "Акции" : "Акция" }' subHeader!='{DATA.promotions.length > 1 ? "Специальные предложения разработанные для этого вида лечения" : "Специальное предложение разработанное для этого вида лечения" }')
    Promotions(data='{DATA.promotions}')

CardWrapper
  CallToAction(
    header='Хотите поехать в эту клинику?'
    text='Напишите или позвоните, расскажите какая услуга вас интересует — мы всё устроим.'
    btnText='Открыть чат'
    tel
  )

+if('DATA.feedback?.length')
  CardWrapper
    CardHeader(header!='{DATA.feedback.length > 1 ? "Отзывы" : "Отзыв" }')
    Feedback(data='{DATA.feedback}')



+if('DATA.technology?.length')
  CardWrapper
    CardHeader(header='Технологии')
    Technology(data='{DATA.technology}')

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

  .head_img
    background-position: center
    background-repeat: no-repeat
    background-size: cover
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

.gallery_item
  display: inline
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  position: relative
  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  margin-right: 15px

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px


  &:last-child
    margin-right: 0

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

  & span
    opacity: 0

</style>
