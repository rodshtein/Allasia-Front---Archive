<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { getBranchPath } from '../../helpers';
  import { MEDICAL_PAGE__HEADER, MEDICAL_PAGE__FULL } from '../../queries';
  import { backPointId } from '../../components/Store-search';
  import { showMenu } from '../../components/Store-branches';



  export async function preload(page) {
    var isBrowser=new Function(`
        try { return this === window }
        catch(e) { return false }`
      );

    let query = await client.query({
        query: isBrowser() ? MEDICAL_PAGE__HEADER : MEDICAL_PAGE__FULL,
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
  import Button from '../../components/Button.svelte';
  import Popup from '../../components/Popup.svelte';
  import Descripton from '../../components/Cards-descripton.svelte';
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
      query: MEDICAL_PAGE__FULL,
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
//- pre {JSON.stringify(DATA, 0, 2)}

+if('!Q')
  p Что-то пошло не так…

+if('Q')
  header
    +if('branch')
      p.p {branch}
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


+if('Q.description')
  Descripton(
    header = '{Q.name}'
    content = '{Q.description.document}'
  )

+if('showDiseases(Q)')
  Diseases(
    data='{Q.diseases}'
    pageName='{Q.name}'
  )

Procedures(
  data='{Q.procedures}'
  PAGE='{PAGE}'
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
  padding: 30px 15px 50px
  .p
    text-align: center
  h1
    text-align: center
    margin:
      top: 20px
      bottom: 30px

  &:after
    content: ''
    position: absolute
    bottom: 0
    left: 15px
    right: 15px
    @mixin devider

</style>
