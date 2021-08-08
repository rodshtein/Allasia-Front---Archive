<script context="module">
  import { onMount } from 'svelte';
  import { client, cache }  from '../../tinyClient';
  import { WIKI } from './queries';

  export async function preload() {
    return { DATA : await client(WIKI) };
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

  // set preloaded data to chache
  onMount(()=> {
    cache.set(
      JSON.stringify(WIKI),
      DATA
    )
  });

  let data = DATA.allWikiSections;

  const sortConf = (data) => { return {
    data: data,
    sort_field: 'name',
    sub_selector: 'questions',
    sub_sort_field: 'question'
  }}

  const toggle = async (el) => {
		feedback = el
		await tick();
		showFeedback=!showFeedback
  }


  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}__1`
    if(data.length < 3) return `${name} ${name}__2`
  };
</script>



<template lang='pug'>
header
  h1.h1 Вопрос-ответ
  p.subheader-h1
    | Мы собрали ответы на самые популярные вопросы.
    | Найдите ответы или задайте свой вопрос
  .illustration

.wrap
  +each('sortTrees(sortConf(data)) as section')
    CardWrapper
      CardHeader(header!='{section.name}')
      Nailer(let:props)
        .slider(use:nailer='{props}' class!='{cls("slider")}')
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

.slider
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

.wrap
  margin-bottom: 80px

</style>