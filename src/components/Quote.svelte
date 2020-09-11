<script>
  import Button from '../components/Button.svelte';
  import { client } from "../utils";
  import { gql } from "apollo-boost";
  import { query } from "svelte-apollo";

  // components
  export let quoteCountQuery;

  const QUOTE = gql`
    query ($int: Int){
      allFeedbackQuotes ( skip: $int  first: 1 ) {
        quote
        feedback {
          city {
            name
          }
          name
        }
      },
    }`;


  function rand(max) {
    return Math.floor(Math.random() * (max - 2)) + 1;
  }
  let int = $quoteCountQuery.data._allFeedbackQuotesMeta.count;

  let quoteQuery = query(client, {
      query: QUOTE,
      variables: {int: rand(int)}
    });

</script>

<template lang='pug'>
.quote_block
  img(alt="quote icon" src="illustration/quote.svg")

  .wrapper
    +await('$quoteQuery')
      li Loading...
      +then('result')
        .author
          b {result.data.allFeedbackQuotes[0].feedback.name}
          | , {result.data.allFeedbackQuotes[0].feedback.city.name}
        .quote {result.data.allFeedbackQuotes[0].quote}

      +catch('error')
        pre {error}

  Button( size='regular' iconR='spinner')
</template>


<style lang='postcss'>

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