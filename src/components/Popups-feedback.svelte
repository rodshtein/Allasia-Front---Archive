<script>
import Popup from './Popup.svelte';
import Button from './Button.svelte';
import { serialize } from '../helpers.js';

export let data;
export let showFeedback;

function declOfNum(number) {
  let cases = [2, 0, 1, 1, 1, 2];
  let sign = ['год',  'года', 'лет'];
  return sign[ ( number % 100 > 4 && number % 100 < 20 ) ? 2 : cases[ (number%10<5) ? number % 10 : 5 ] ];
}

const date = d => {
  return new Date(`${d}`).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
    });
  }
</script>

<template lang='pug'>

+if('data')
  Popup(
    bind:show!='{showFeedback}'
    header='{data.header}')

    .feedback_wrapper
      .feedback-header
        +if('data.name')
          p.person
            span {data.name}
            +if('data.age')
              span , {data.age} {declOfNum(data.age)}

        +if('data.country || data.city')
          p.p-small.location
            +if('data.country')
              span {data.country.name}
            +if('data.city')
              span , {data.city.name}
      .devider
      .content
        +html('serialize(JSON.parse(data.review.document))')
      +if('data.date')
        p.p-small {date(data.date)}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.feedback_wrapper
  padding-right: 30px

.feedback-header
  display: flex
  flex-direction: column
  align-items: start
  margin-bottom: 10px

.person
  font-style: normal
  font-weight: 700
  font-size: 17px
  margin-right: 20px
  margin-bottom: 5px

.p-small
  color: var(--LIGHT-BLUE)

.devider
  margin-bottom: 10px

</style>