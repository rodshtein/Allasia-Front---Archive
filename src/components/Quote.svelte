<script>
  import { client }  from '../tinyClient';

  export const QUOTE_COUNT = `{
    _allFeedbackQuotesMeta { count }
  }`;

  export const QUOTE = `
    query ($int: Int){
      allFeedbackQuotes ( skip: $int  first: 1 ) {
        quote
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
      },
    }`;

  // components
  import Button from './Button.svelte';
  import FeedbackPopup from './Popups-feedback.svelte';
  import { scale } from 'svelte/transition';

  client(QUOTE_COUNT)
    .then (
      result => {
        count = result._allFeedbackQuotesMeta.count
        intArr = shuffle(Array.from(Array(count).keys()))
        int = intArr[intCount]
        getQuote(int)
      }
    )

  let quoteQuery;
  let animateClass;
  let count;
  let intArr;
  let intCount = 0;
  let int = 0;
  let showFeedback = false;
  let feedbackBtnOff = false;
  let quote = null;

  function getQuote(int){
    animateClass = 'mask'
    feedbackBtnOff= true

    client( QUOTE, {int: int})
      .then(
      (result) => {
        if (result.errors) {
          console.log({ 'result error':result.errors })
        } else {
          quote = result.allFeedbackQuotes[0]
          animateClass = ''
          feedbackBtnOff = false
        }
      },
      (error) => console.log({ 'request error':error  })
    );
  }

  function handleClick() {
		intCount = intCount != intArr.length-1 ? ++intCount : 0;
    int = intArr[intCount];
    getQuote(int)
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
      +if('quote')
        div(class='{animateClass}' use:setParentHight)
          p.p-small.author
            b {quote.feedback.name}
            | , {quote.feedback.city.name}
          p.quote  {quote.quote}

        +else
          p Загрузка

  +if('quote && quote.feedback')
    Button(
      size='small'
      text='Читать полный отзыв'
      disabled='{feedbackBtnOff}'
      on:click!='{() => showFeedback=!showFeedback}')

  Button(
    size='regular'
    iconR='spinner'
    on:click='{handleClick}')

+if('quote && quote.feedback')
  FeedbackPopup(
    data='{quote.feedback}'
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