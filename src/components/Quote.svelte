<script>
  import { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
  import { client } from "../utils";

  // components
  import Button from '../components/Button.svelte';
  import FeedbackPopup from '../components/Feedback-popup.svelte';

  export let quoteCountQuery;

  const QUOTE = gql`
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


  let animateClass;
  let count = quoteCountQuery ? $quoteCountQuery.data._allFeedbackQuotesMeta.count: 5;
  let intArr = shuffle(Array.from(Array(count).keys()));
  let intCount = 0;
  let int = intArr[intCount];
  let showFeedback = false;
  let feedbackBtnOff = false;
  let quoteQuery = query(client, {
      query: QUOTE,
      variables: {int}
    });

  $: quoteQuery.refetch({ int });


  function handleClick() {
		intCount = intCount != intArr.length ? ++intCount : 0;
    int = intArr[intCount];
    animateClass = 'mask'
    feedbackBtnOff= true
    quoteQuery.refetch().then(function result(){
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
  .quote-wrapper(style='min-height: {blockHeight}px')
    +await('$quoteQuery')
      p Загрузка…
      +then ('result')
        div(class='{animateClass}' use:setParentHight)
          .author
            b {result.data.allFeedbackQuotes[0].feedback.name}
            | , {result.data.allFeedbackQuotes[0].feedback.city.name}
          .quote  {result.data.allFeedbackQuotes[0].quote}
      +catch('error')
        pre {error}
  Button( size='small' text='Полный отзыв' disabled='{feedbackBtnOff}' on:click!='{() => showFeedback=!showFeedback}'  )
  Button( size='regular' iconR='spinner' on:click='{handleClick}')
+await('$quoteQuery then result')
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
    font-style: normal
    font-weight: normal
    font-size: 13px
    line-height: 130%
    text-align: center
    margin-bottom: 10px

  .quote
    font-style: normal
    font-weight: normal
    font-size: 16px
    line-height: 130%
    text-align: center

</style>