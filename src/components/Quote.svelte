<script>
  export let count;
  // components
  import Button from '../components/Button.svelte';

  import { apollo } from "../utils";
  import { query} from "svelte-apollo";
  import { gql } from "apollo-boost";

  const ITEM = gql`
    query getRandQuote($int: Int){
      allFeedbackQuotes (skip: $int  first: 1) {
        quote
        feedback {
          city {
            name
          }
          name
        }
      }
    }
  `;



  let int = 2;
  let q = query(apollo, { query: ITEM, value: int });

  q.result().then(
    function(result) { console.log(result); },
    function(error) { /* обработает ошибку */ }
  );





  function getImageDimensions(image) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const { width: imageWidth, height: imageHeight } = await createImage(e.target.result);
            resolve({ imageWidth, imageHeight });
        }
    });
  }

</script>


<template lang='pug'>



.quote_block
  img(alt="quote icon" src="illustration/quote.svg")

  .wrapper
    +await('$q')
      li Loading...
      +then('result')
        .author
          b {result.data.allFeedbackQuotes[0].feedback.name}
          | , {result.data.allFeedbackQuotes[0].feedback.city.name}
        .quote {result.data.allFeedbackQuotes[0].quote}

      +catch('error')
        pre {error}


  Button( size='small' text="Читать полностью" )
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