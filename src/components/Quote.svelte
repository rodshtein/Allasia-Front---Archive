<script>
  import { query } from "svelte-apollo";
  import { client } from "../utils";
  import { QUOTE, QUOTE_COUNT } from '../queries';

  // components
  import Button from './Button.svelte';
  import FeedbackPopup from './Popups-feedback.svelte';
  import { scale } from 'svelte/transition';

  let quoteCountQuery = query(client, {
      query: QUOTE_COUNT,
    });

  let quoteQuery;
  let animateClass;
  let count;
  let intArr;
  let intCount = 0;
  let int = 0;
  let showFeedback = false;
  let feedbackBtnOff = false;

  $: quoteQuery = query(client, {
        query: QUOTE,
        variables: {int}
      })


  $quoteCountQuery.then (
    result => {
      count = result.data._allFeedbackQuotesMeta.count
      intArr = shuffle(Array.from(Array(count).keys()))
      int = intArr[intCount]
    }
  )

  function handleClick() {
		intCount = intCount != intArr.length-1 ? ++intCount : 0;
    int = intArr[intCount];
    animateClass = 'mask'
    feedbackBtnOff= true

    $quoteQuery.then(result => {
      animateClass = ''
      feedbackBtnOff = false
    })

	}

  let blockHeight = 160;

  function setParentHight(node) {
    let h = node.scrollHeight;
    if(blockHeight < h) h
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

</script>

<template lang='pug'>
.quote_block
  img(alt="quote icon" src="illustration/quote.svg")
  .quote-wrapper(
    transition:scale!='{{duration: 500}}')
    +await('$quoteCountQuery')
      p Загрузка…
      +then ('result')
        +await('$quoteQuery')
          p Загрузка…
          +then ('result')
            +if('result && result.data.allFeedbackQuotes.length')
              div(class='{animateClass}' use:setParentHight)
                p.p-small.author
                  b {result.data.allFeedbackQuotes[0].feedback.name}
                  | , {result.data.allFeedbackQuotes[0].feedback.city.name}
                p.quote  {result.data.allFeedbackQuotes[0].quote}

              +else
                p Что-то пошло не так

          +catch('error')
            pre {JSON.stringify(error, 0, 2)}

      +catch('error')
        pre {JSON.stringify(error, 0, 2)}

  Button(
    size='small'
    text='Читать полный отзыв'
    disabled='{feedbackBtnOff}'
    on:click!='{() => showFeedback=!showFeedback}')

  Button(
    size='regular'
    iconR='spinner'
    on:click='{handleClick}')

+await('$quoteCountQuery then result')
  +await('$quoteQuery then result')
    +if('result.data.allFeedbackQuotes[0].feedback')
      FeedbackPopup(
        data='{result.data.allFeedbackQuotes[0].feedback}'
        bind:showFeedback!='{showFeedback}'
      )

</template>


<style lang='postcss'>
.mask
  background: linear-gradient(
    to right,
    transparent 0%,
    black 50%,
    transparent 100%
  )
  background-clip: text
  background-size: 78% 100%
  background-repeat: no-repeat
  color: #0000003d
  animation:
    skeleton-effect-blink
    1s infinite linear

@keyframes skeleton-effect-blink
  0%
    background-position-x: -440%
  100%
    background-position-x: 440%

.quote-wrapper
  transition: height 0.3s ease-in

.quote_block
  padding: 30px 15px 50px
  display: grid
  grid-auto-flow: row
  justify-items: center
  row-gap: 20px

  .author
    text-align: center
    margin-bottom: 10px
    @media( width > 650px )
      margin-bottom: 20px

  .quote
    font-style: normal
    font-size: 16px
    line-height: 130%
    text-align: center
    color: var(--LIGHT-BLACK)
    @media( width > 650px )
      font-size: 19px
      max-width: 630px
      margin-bottom: 20px


</style>