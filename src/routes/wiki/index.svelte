<script context="module">
  export async function preload(){
    let res = await this.fetch(`wiki/data.json`);
    let json = await res.json()
    return { DATA:json };
  }
</script>

<script>
  export let DATA;

  import { sortTrees } from '../../helpers';
  import CardWrapper from '../../components/Card-wrapper.svelte';
  import CardHeader from '../../components/Card-header.svelte';
  import CardQuestion from '../../components/Card-question.svelte';

  import Button from '../../components/Button.svelte';
  import Nailer from '../../components/nailer/NailerGrid.svelte';
  import { nailer } from '../../components/nailer';
  import { serialize, serializeAndCut } from '../../helpers.js';

  const sortedData = sortTrees({
    data: DATA,
    sort_field: 'sort',
    sub_selector: 'questions',
    sub_sort_field: 'question'
  })
</script>

<template lang='pug'>
svelte:head
  title Вопрос-ответ

header
  h1.h1 Вопрос-ответ
  p.subheader-h1
    | Мы собрали ответы на самые популярные вопросы.
    | Найдите ответы или задайте свой вопрос
  .illustration


+each('sortedData as section')
  CardWrapper
    CardHeader(header!='{section.name}')
    +each('section.questions as question')
      +if('question.answer && question.question')
        CardQuestion(data='{question}')

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
</style>