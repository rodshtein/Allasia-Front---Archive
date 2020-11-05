<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { getBranchPath } from '../../helpers';
  import { MEDICAL_PAGE } from '../../queries';
  import { backPointId } from '../../components/Store-search';
  import { showMenu } from '../../components/Store-branches';


  export async function preload(page) {

    let query = await client.query({
        query: MEDICAL_PAGE,
        variables: {
          id: page.params.slug
        }
      });

    return {
      PAGE: page,
      DATA: query.data,
      Q: query.data.MedicalPage,
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
  import Button from '../../components/Button.svelte';
  import Popup from '../../components/Popup.svelte';
  import Description from '../../components/Cards-description.svelte';
  import Diseases from '../../components/Cards-diseases.svelte';
  import Procedures from '../../components/Cards-procedures.svelte';
  import Feedback from '../../components/Cards-feedback.svelte';
  import Clinics from '../../components/Cards-clinics.svelte';
  import Doctors from '../../components/Cards-doctors.svelte';
  import Technology from '../../components/Cards-technology.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';

  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: MEDICAL_PAGE,
      variables: {
          id: PAGE.params.slug
      },
      data: DATA
    })
  });

  // Paint barnch treee
  $: branch = Q.branch ? getBranchPath(Q.branch) : '';

  let showDiseases = (data) => {
    let el = data.diseases;
    let haveMoreThanOneDisease = el.length > 1;
    let haveUniqName = el[0] && el[0].name !== data.name;
    let haveAdName = el[0] && el[0].ad_name !== null;

    return haveUniqName || haveAdName || haveMoreThanOneDisease
  };

  import { branchId } from '../../components/Store-branches.js';

  function backHandler(){
    if($backPointId === Q.id) {
      branchId.set(null)
      showMenu.set(true)
    } else {
      branchId.set(Q.branch.id)
      showMenu.set(true)
    }
	}


</script>

<template lang='pug'>

+if('!Q')
  p Что-то пошло не так…

+if('Q')
  header
    .wrap
      +if('branch')
        p.subheader-h1 {branch}
      h1.h1 {Q.name}

    +if('branch')
      Button(
        size="mini",
        iconL='arrow-l'
        text=`{
            $backPointId === Q.id
            ? 'Результаты поиска'
            : Q.branch.name
          }`
        on:click!='{backHandler}'
      )


  +if('Q.description || showDiseases(Q)')
    CardWrapper
      .description-wrap(
        class:two_column!='{showDiseases(Q)}'
      )
        +if('Q.description')
          div
            CardHeader(header='Описание')
            Description(
              header = '{Q.name}'
              content = '{Q.description.document}'
            )
        +if('showDiseases(Q)')
          .diseases
            CardHeader(header='Болезни')
            Diseases(
              data='{Q.diseases}'
              pageName='{Q.name}'
            )

+if('Q.procedures && Q.procedures[0]')
  Procedures(
    data='{Q.procedures}'
  )

CallToAction(
  header='Не нашли нужную услугу?'
  text='Напишите или позвоните, расскажите какая услуга вас интересует. Мы подберём для вас варианты и посчитаем стоимость.'
  btnText='Открыть чат'
  tel
)

+if('Q.feedback && Q.feedback[0]')
  Feedback(
    data='{Q.feedback}'
  )

+if('Q.clinics && Q.clinics[0]')
  Clinics(
    data='{Q.clinics}'
  )

+if('Q.doctors && Q.doctors[0]')
  Doctors(
    data='{Q.doctors}'
  )

+if('Q.technology && Q.technology[0]')
  Technology(
    data='{Q.technology}'
  )





</template>

<style lang='postcss'>

@import "../../style/mixins.sss"

header
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  padding: 30px 15px 40px

  @media (width > 800px)
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
      grid-gap: 10px
      align-items: left

    .subheader-h1
      text-align: center

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
  margin-top: 20px

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
