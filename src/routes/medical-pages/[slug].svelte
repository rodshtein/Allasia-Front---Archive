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
  import Descripton from '../../components/Descripton.svelte';
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

</script>

<template lang='pug'>

svelte:head
  title {data.name}

header
  +if('branch')
    p {branch}
  h1 {data.name}
  Button(
    size="mini",
    iconL='arrow-l'
    text="{data.branch.name}"
  )
  .devider

.description
  +if('data.description')
    .cards_wrapper
      h2.h2 Описание
      Descripton(
        header = '{data.name}'
        content = '{description}'
      )

</template>

<style lang='postcss'>

@import "../../style/mixins.sss"

.cards_wrapper
  padding: 0 15px

</style>
