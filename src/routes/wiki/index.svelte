<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../../utils';
  import { sortTrees } from '../../helpers';
  import { WIKI } from './queries';

  export async function preload(page) {

    let query = await client.query({
        query: WIKI
      });

    return {
      DATA: query.data,
      Q: query.data.allWikiSections,
    };
  }

</script>

<script>
  export let DATA;
  export let Q;

  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import Button from '../../components/Button.svelte';
  import { serialize, serializeAndCut } from '../../helpers.js';

  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: WIKI,
      data: DATA
    })
  });

  const sortConf = (data) => { return {
    data: data,
    sort_field: 'name',
    sub_selector: 'clinics',
    sub_sort_field: 'name_ru'
  }}

  const toggle = async (el) => {
		// feedback = el
		// await tick();
		// showFeedback=!showFeedback
  }

  let classConfig = { p: "p-mini" }
</script>

<template lang='pug'>
header
  h1.h1 Вопрос-ответ
  p.subheader-h1
    | Мы собрали ответы на самые популярные вопросы.
    | Найдите ответы или задайте свой вопрос
  .illustration

+each('Q as section')
  CardWrapper
    CardHeader(header!='{section.name}')
    .slider-wrapper
      .slider
        +each('section.questions as question')
          .wiki-card.card.card_decor__white
            .head
              h3.p-mini {question.question}
            p.p-mini.answer {serializeAndCut(JSON.parse(question.answer.document))}
            .btn-wrap
              Button(
                size='small'
                text='Читать полностью'
                on:click!='{() => toggle(question) }'
              )

</template>

<style lang='postcss'>
@import "../../style/mixins.sss"

header
  display: grid
  grid-template: auto / 1fr
  justify-items: center
  grid-row-gap: 20px
  padding:
    top: 0
    right: 15px
    bottom: 0
    left: 15px
  margin-bottom: 20px

  @media( width >= 800px )
    grid-template: auto / auto 50%
    grid-column-gap: 40px
    grid-row-gap: 15px
    justify-items: start
    padding:
      bottom: 50px
      top: 50px

  .subheader-h1
    max-width: 500px
    text-align: center
    @media( width >= 800px )
      text-align: left

  .illustration
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/wiki-s.svg')
    width: 100%
    height: 156px
    order: -1

    @media( width >650px )
      background-image: url('/illustration/wiki.svg')
      height: 220px
      margin-bottom: 20px

    @media( width > 800px )
      height: 200%
      max-height: 230px
      max-width: 350px
      justify-self: end
      align-self: center
      margin-bottom: 0
      grid-area: 1 / 2 / span 2

.slider-wrapper
  position: relative
  overflow: hidden
  padding: 0

.slider
  display: grid
  grid:
    template: auto / repeat(3, 1fr)
    column-gap: 20px
    row-gap: 30px
  justify-items: start

.wiki-card
  position: relative
  display: flex
  flex-direction: column
  align-items: start
  max-height: 360px
  padding: 15px

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px

  .head
    position: relative
    align-self: stretch
    border: solid 1px var(--color--btn-border)
    border-radius: 14px
    padding:
      top: 10px
      right: 12px
      bottom: 12px
      left: 12px
    margin-bottom: 15px

    &::after
      content: url(/icons/special/tail.svg)
      position: absolute
      left: 0
      bottom: -20px

  .answer
    overflow: hidden
    position: relative

  .btn-wrap
    margin-top: 10px

</style>