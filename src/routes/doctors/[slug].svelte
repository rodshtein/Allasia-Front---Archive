<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { DOCTOR } from './queries';

  export async function preload(page) {

    let query = await client(
      DOCTOR,
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

  import { serialize, serializeAndCut, numDeclension } from '../../helpers.js';
  import { nailer } from '../../components/nailer';

  // components
  import Popup from '../../components/Popup.svelte';
  import Button from '../../components/Button.svelte';
  import Nailer from '../../components/nailer/NailerGrid.svelte';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Description from '../../components/Card-description.svelte';

  import Promotions from '../../components/Slider-promotions.svelte';
  import Feedback from '../../components/Slider-feedback.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';


  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: DOCTOR,
        variables : {
          id: PAGE.params.slug
        }
      }),
      _DATA
    )
  });

  let clinicsUrl = '/clinics/';
  let serializePreset = { h2: "h4"};


  // data
  $: infoExtra = DATA?.extra?.document
    ? serialize(JSON.parse(DATA.extra.document), serializePreset)
    : null;
  $: infoExperience = DATA?.experience
    ? JSON.parse(DATA.experience)
    : null;
  $: infoEducation = DATA?.education
    ? JSON.parse(DATA.education)
    : null;


  // modals
  let modalIsShowing;
  let modalHeader;
  let modalContent;
  let modalContentIsHtml;


  function showModal(content, header, isHtml){
    modalHeader = header
    modalContentIsHtml = isHtml
    modalIsShowing =! modalIsShowing
    modalContent = content
  }

  // Short data path
  $: DATA = _DATA.Doctor


  // Experience
  function getExperience(){
    let thisYear = new Date().getFullYear();
    let startYear = new Date(DATA.experience_years).getFullYear();
    let gap = thisYear - startYear;
    return gap > 0 ? gap : null;
  };

  function singleNameClass(emp){
    return emp?.clinic?.name_ru === emp?.clinic?.full_name_ru
      ? 'onlyName'
      : ''
  }

  function setPeriod(text){
    text = text.trim()
    return text.slice(-1) == '.'
     ? text
     : text + '.'
  }

  let cls = (name) => {
    let count = 0;
    if(DATA?.education?.length) count++
    if(DATA?.experience?.length) count++
    if(DATA?.extra?.document) count++
    if(count > 2) return name
    if(count < 2) return `${name} ${name}__1`
    if(count < 3) return `${name} ${name}__2`
  };


  function check(left, right){
    return left < right
  }
</script>

<template lang='pug'>

+if('!DATA')
  p Что-то пошло не так…


+if('DATA')
  header
    .wrap
      h1.h1 {DATA.name}
      +if('DATA?.experience_years || DATA?.country?.name')
        p.subheader-h1
          +if('DATA?.experience_years')
            | { getExperience() }
            | { numDeclension(getExperience()) } стажа,
            |  { DATA?.country?.name }
            +else()
              | { DATA?.country?.name }

      +if('DATA?.specialty.length')
        .ranks
          .ranks-block
            h3.title Профессия
            p.h4
              +each('DATA.specialty as el, i')
                +if('check(i, DATA.specialty.length - 1)')
                  +if('i === 0')
                    | {el.name + ', '}
                    +else
                    | {el.name.toLowerCase() + ', '}
                +if('DATA.specialty.length - 1 === i')
                  | {el.name.toLowerCase()}

            +if('DATA.employer[0].positions.length')
              p.p-mini
                +each('DATA.employer[0].positions as el, i')
                  +if('check(i, DATA.employer[0].positions.length - 1)')
                    +if('i === 0')
                      | {el.name + ', '}
                      +else
                      | {el.name.toLowerCase() + ', '}
                  +if('DATA.employer[0].positions.length - 1 === i')
                    | {el.name.toLowerCase() + '.'}

          +if('DATA.employer.length')
            .ranks-block
              +if('DATA.employer.length > 1')
                h3.title Места работы
                +else
                  h3.title Место работы
              +each('DATA.employer as emp, i')
                div
                  p.h4(class!='{ singleNameClass(emp) }') { emp.clinic.name_ru }
                  +if('emp.clinic.name_ru !== emp.clinic.full_name_ru && emp.clinic.full_name_ru')
                    p.p-mini { emp.clinic.full_name_ru }
                  .button-wrap
                    Button(
                      href!=`{ clinicsUrl + emp.clinic.id }`
                      size='mini'
                      iconR='arrow-r'
                      text="О клинике")


    +if('DATA.avatar && DATA.avatar.publicUrl')
      .avatar(style=`background-image: url('{DATA.avatar.publicUrl}')`)

  +if('DATA.education || DATA.experience || DATA.extra')
    CardWrapper
      Nailer(let:props)
        .experience(use:nailer='{props}' class!='{cls("experience")}')
          +if('DATA.education')
            .experience_card.card_decor__white
              .wrap
                h3.h4 Образование
                +each('infoEducation as text')
                  p.p − { setPeriod(text) }
              Button(
                size='small'
                text="Ещё →"
                on:click!=`{showModal(
                  infoEducation,
                  "Образование",
                  false
                )}`
              )

          +if('infoExperience')
            .experience_card.card_decor__white
              .wrap
                h3.h4 Опыт работы
                +each('infoExperience as text')
                  p.p − { setPeriod(text) }
              Button(
                size='small'
                text="Ещё →"
                on:click!=`{showModal(
                  infoExperience,
                  "Опыт работы",
                  false
                )}`
              )

          +if('infoExtra')
            .experience_card.card_decor__white
              .content.wrap
                +html('infoExtra')
              Button(
                size="small"
                text="Ещё →"
                on:click!=`{showModal(
                  infoExtra,
                  "Дополнительная информация",
                  true
                )}`
              )

  +if('DATA.promotions?.length')
    CardWrapper
      CardHeader(header!='{DATA.promotions.length > 1 ? "Акции" : "Акция" }' subHeader!='{DATA.promotions.length > 1 ? DATA.name + " участвует в нашей акции" : DATA.name + " участвует в наших акциях" }')
      Promotions(data='{DATA.promotions}')

  CardWrapper
    CallToAction(
      header='Хотите пройти лечение у этого специалиста?'
      text='Напишите или позвоните, расскажите какая услуга вас интересует — мы всё устроим.'
      btnText='Открыть чат'
      tel
    )

  +if('DATA.feedback?.length')
    CardWrapper
      CardHeader(header!='{DATA.feedback.length > 1 ? "Отзывы" : "Отзыв" }')
      Feedback(data='{DATA.feedback}')


Popup(
  bind:show!='{modalIsShowing}'
  header='{modalHeader}'
)
  .content
    +if('modalContentIsHtml')
      +html('modalContent')
      +else()
        +each('modalContent as text')
          p.p − { setPeriod(text) }

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

  .subheader-h1
    margin-top: 5px
    padding:
      left: 19px
      right: 19px
    @media( width >= 650px )
      padding:
        left: 0
        right: 0

  .title
    font-size: 12px
    font-style: normal
    font-weight: 400
    line-height: 120%
    margin-bottom: 5px
    color: var(--LIGHT-BLUE)

  .ranks
    display: flex
    flex-wrap: wrap
    column-gap: 40px
    row-gap: 30px
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
      border: none
      padding:
        top: 30px
        left: 0
        right: 0
      margin: 0

    &-onlyName
      border: none

    &-block
      flex-basis: calc(50% - 20px)
      row-gap: 40px
      min-width: 220px
      flex-grow: 1
      .button-wrap
        margin-top: 15px
        display: inline-block
    .h4
      margin-bottom: 5px
      @media ( width >= 650px )
        padding-bottom: 10px
        margin-bottom: 7px
        @mixin devider_bottom


  .avatar
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


  /* display: grid
  grid-template-columns:
    repeat(
      auto-fit,
      minmax(100px, 1fr)
    )
  grid-gap: 20px */

.experience
  display: grid
  grid:
    template: auto / repeat(3, 1fr)
    column-gap: 20px
    row-gap: 30px
  justify-items: start
  margin: 0 15px

  @media( width <= 950px)
    grid-auto-flow: column
    grid-auto-columns: calc(83% / 2)
    grid-template-columns: unset

  @media( width <= 650px)
    grid-auto-columns: calc(83%)

  @media(width < 400px)
    grid-auto-columns: calc(100% - 30px)

  @media( 500px < width < 800px)
    margin: 0 30px

  &__1
    grid-auto-columns: 100%

  &__2
    grid-auto-columns: calc((100% - 15px) / 2)
    @media(width < 650px)
      grid-auto-columns: calc((83% - 15px))


  &_card
    padding: 23px 19px

  h3
    margin-bottom: 10px

  .wrap
    overflow: hidden
    width: 100%
    max-height: 230px
    margin-bottom: 20px
    position: relative
    mask-image:
      linear-gradient(
        to top,
        transparent 5%,
        black 30%,
        black 100%
      )

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


</style>
