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
          name
          head_img {
            publicUrl
          }
          country {
            name
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
          id
          name
          age
          header
          review {
            from {
              name
            }
            document
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
  import { serialize } from '../../helpers.js';

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
  let description = serialize(JSON.parse(data.description.document))

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
  //- +if('data.name')
  //-   title {data.name}

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
    .devider

    +if('data.description')
      Descripton(
        header = '{data.name}'
        content = '{description}'
      )

    +if('showDiseases(data.diseases)')
      Diseases(data='{data.diseases}')

</template>

<style lang='postcss'>

@import "../../style/mixins.sss"

header
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

.devider
  margin:
    left: 15px
    right: 15px

</style>
