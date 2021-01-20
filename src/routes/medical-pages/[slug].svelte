<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { getBranchPath, clearProcedures } from '../../helpers';
  import { MEDICAL_PAGE } from './queries';
  import { searchString } from '../../components/stores/Store-search';
  import { branchId, showMenu } from '../../components/stores/Store-branches';

  export async function preload(page) {
    let query = await client(
      MEDICAL_PAGE,
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
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Description from '../../components/Card-description.svelte';
  import Diseases from '../../components/Card-diseases.svelte';

  import Procedures from '../../components/Slider-procedures.svelte';
  import Feedback from '../../components/Slider-feedback.svelte';
  import Clinics from '../../components/Slider-clinics.svelte';
  import Doctors from '../../components/Slider-doctors.svelte';
  import Technology from '../../components/Slider-technology.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';

  import Button from '../../components/Button.svelte';
  import Popup from '../../components/Popup.svelte';

  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: MEDICAL_PAGE,
        variables : {
          id: PAGE.params.slug
        }
      }),
      _DATA
    )
  });

  // Short data path
  $: DATA = _DATA.MedicalPage;

  // remove empty elements from ssr data
  // data will updated on user routing
  $: procedures = clearProcedures(DATA.procedures);

  // Paint barnch treee
  $: branch = DATA.branch ? getBranchPath(DATA.branch) : '';

  let showDiseases = (data) => {
    let el = data.diseases;
    let haveMoreThanOneDisease = el.length > 1;
    let haveUniqName = el[0] && el[0].name !== data.name;
    let haveAdName = el[0] && el[0].ad_name !== null;

    return haveUniqName || haveAdName || haveMoreThanOneDisease
  };

  function backHandler(){
    if($searchString) {
      showMenu.set(true)
    } else {
      branchId.set(DATA.branch.id)
      showMenu.set(true)
    }
  }

</script>

<template lang='pug'>

+if('!DATA')
  p Что-то пошло не так…

+if('DATA')
  header
    .wrap
      +if('branch')
        p.breadcrumb {branch}
      h1.h1 {DATA.name}

    +if('branch')
      Button(
        size='mini',
        iconL='arrow-l'
        text=`{$searchString ? 'Результаты поиска' : DATA.branch.name}`
        on:click!='{backHandler}'
      )


  +if('DATA.description || showDiseases(DATA)')
    CardWrapper
      .description-wrap(
        class:two_column!='{showDiseases(DATA)}'
      )
        +if('DATA.description')
          div
            CardHeader(header='Описание')
            Description(
              header = '{DATA.name}'
              content = '{DATA.description.document}'
            )
        +if('showDiseases(DATA)')
          .diseases
            CardHeader(header='Болезни')
            Diseases(
              data='{DATA.diseases}'
              pageName='{DATA.name}'
            )

+if('procedures.length')
  CardWrapper
    CardHeader(header='Процедуры' subHeader='Стоимость, особенности, сроки')
    Procedures(data='{procedures}')

CardWrapper
  CallToAction(
    header='Не нашли нужную услугу?'
    text='Напишите или позвоните, расскажите какая услуга вас интересует. Мы подберём для вас варианты и посчитаем стоимость.'
    btnText='Открыть чат'
    tel
  )

+if('DATA.feedback && DATA.feedback[0]')
  CardWrapper
    CardHeader(header!='{DATA.feedback.length > 1 ? "Отзывы" : "Отзыв" }')
    Feedback(data='{DATA.feedback}')

+if('DATA.clinics && DATA.clinics[0]')
  CardWrapper
    CardHeader(header!='{DATA.clinics.length > 1 ? "Клиники" : "Клиника" }')
    Clinics(data='{DATA.clinics}')

+if('DATA.doctors && DATA.doctors[0]')
  CardWrapper
    CardHeader(header!='{DATA.doctors.length > 1 ? "Врачи" : "Врач" }')
    Doctors(data='{DATA.doctors}')

+if('DATA.technology && DATA.technology[0]')
  CardWrapper
    CardHeader(header='Технологии')
    Technology(data='{DATA.technology}')


</template>

<style lang='postcss'>

@import "../../style/mixins.sss"

header
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  padding: 30px 15px 40px
  margin-bottom: 20px

  @media ( width >= 800px)
    align-items: start

  &:after
    content: ''
    position: absolute
    bottom: 0
    left: 15px
    right: 15px
    @mixin devider

  .wrap
    display: grid
    grid-auto-flow: row
    grid-gap: 20px
    margin-bottom: 30px

    @media (width > 800px)
      grid-gap: 15px
      align-items: left

    .breadcrumb
      text-align: center
      font-size: 14px
      line-height: 120%
      color: var(--color--txt-subheaders)

      @media(width > 650px)
        /* margin-top: 10px */
        font-size: 19px

      @media (width > 800px)
        order: 2
        text-align: left

    .h1
      text-align: center

      @media (width > 800px)
        text-align: left

.description-wrap
  display: grid
  grid-auto-flow: row
  grid-gap: 30px

  @media( 700px > width > 550px )
    grid-gap: 50px


  &.two_column
    @media (width > 700px)
      grid-template-columns: 1fr 240px
      grid-gap: 80px

  .diseases
    display: flex
    flex-direction: column
</style>
