<script context="module">
  import { client } from '../../utils';
  import { gql } from 'apollo-boost';

  const PAGE = gql`
    query($id: ID!){
      MedicalPage (where: {id: $id}) {
        name
        branch {
          id
          name
          parent {
            name
            parent {
              name
              parent {
                name
                parent {
                  name
                  parent {
                    name
                  }
                }
              }
            }
          }
        }
        diseases {
          name
          ad_name
        }
        description {
          document
        }
        procedures {
          name
          feature
          description
          duration
          price {
            price
            conditions
            country {
              name
            }
          }
        }
        portfolio {
          img {
            publicUrl
          }
          alt
          description
        }
        papers {
          name
          description {
            document
          }
          id
        }
        technology {
          id
          name
          head_img {
            publicUrl
          }
        }
        clinics {
          id
          name_ru
          full_name_ru
          country {
            name
          }
          head_img {
            publicUrl
          }
        }
        doctors {
          id
          name
          specialty {
            name
          }
          avatar {
            publicUrl
          }
        }
        feedback {
          header
          name
          age
          date
          city {
            name
          }
          country {
            name
          }
          review {
            document
          }
          gallery {
            alt
            img {
              publicUrl
            }
          }
        }
      }
    }
  `;

  export async function preload(page, session) {
    const { slug } = page.params;
    return {
      cache: await client.query({
        query: PAGE,
        variables: {
          id: slug
        }
      })
    };
  }

</script>

<script>
  // Appolo
  import { onMount } from "svelte";
  import { restore, query, } from "svelte-apollo";

  // components
  import Button from '../../components/Button.svelte';
  import Popup from '../../components/Popup.svelte';
  import Descripton from '../../components/Cards-descripton.svelte';
  import Diseases from '../../components/Cards-diseases.svelte';
  import Procedures from '../../components/Cards-procedures.svelte';
  import Feedback from '../../components/Cards-feedback.svelte';
  import Clinics from '../../components/Cards-clinics.svelte';
  import Doctors from '../../components/Cards-doctors.svelte';
  import CallToAction from '../../components/Call-to-action.svelte';


  export let cache;

  restore(client, PAGE, cache.data);

  let pageQuery = query(client, { query: PAGE });
  let data = $pageQuery.data.MedicalPage;


  function getBranch (obj, name, count=0) {
    let inName = name ? ' / ' + name : '';

    for (let key in obj) {
      if (obj['parent'] && !count) {
        let currName = obj['name'] + inName;
        return getBranch(obj['parent'], currName, ++count)
      } else {
        return obj['name'] + inName
      }
    }
  }

  // Content
  let branch = data.branch ? getBranch(data.branch) : '';


  // Show chekers
  let showDiseases = (item) => {
    let haveMoreThanOneDisease = data.diseases.length > 1
    let haveUniqName = item[0] && item[0].name !== data.name
    let haveAdName = item[0] && data.diseases[0].ad_name !== null

    return haveUniqName || haveAdName || haveMoreThanOneDisease
  };

</script>

<template lang='pug'>
svelte:head
  +if('data && data.name')
    title {data.name}

+await('$pageQuery')
  p Что-то пошло не так…
  +then('result')
    header
      +if('branch')
        p.p {branch}
      +if('branch')
        h1.h1 {data.name}
      +if('branch')
        Button(
          size="mini",
          iconL='arrow-l'
          text="{data.branch.name}"
        )

    +if('data.description')
      Descripton(
        header = '{data.name}'
        content = '{data.description.document}'
      )

    +if('showDiseases(data.diseases)')
      Diseases(
        data='{data.diseases}'
        pageName='{data.name}'
      )

    +if('data.procedures && data.procedures[0]')
      Procedures(
        data='{data.procedures}'
      )

    CallToAction(
      header='Не нашли нужную услугу?'
      text='Напишите или позвоните, расскажите какая услуга вас интересует. Мы подберём для вас варианты и посчитаем стоимость.'
      btnText='Открыть чат'
      tel
    )

    +if('data.feedback && data.feedback[0]')
      Feedback(
        data='{data.feedback}'
      )

    +if('data.clinics && data.clinics[0]')
      Clinics(
        data='{data.clinics}'
      )

    +if('data.doctors && data.doctors[0]')
      Doctors(
        data='{data.doctors}'
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
