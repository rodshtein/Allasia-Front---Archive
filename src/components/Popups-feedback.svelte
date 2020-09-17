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

Popup(
  bind:show!='{showFeedback}'
  header='{data.header}')

  .feedback_wrapper
    .feedback-header
      +if('data.name')
        .person
          span {data.name}
          +if('data.age')
            span , {data.age} {declOfNum(data.age)}

      +if('data.country || data.city')
        .location
          +if('data.country')
            span {data.country.name}
          +if('data.city')
            span , {data.city.name}
    .devider
    +html('serialize(JSON.parse(data.review.document))')
    +if('data.date')
      .date {date(data.date)}

</template>

<style lang='postcss'>
.feedback_wrapper
  padding-right: 30px

.feedback-header
  display: flex
  flex-direction: column
  align-items: start
  margin-bottom: 10px

.person
  font-style: normal
  font-weight: bold
  font-size: 17px
  margin-right: 20px

.location
  font-style: normal
  font-weight: normal
  font-size: 13px
  text-align: right

.devider
  margin-bottom: 10px

.date
  font-style: normal
  font-weight: bold
  font-size: 13px
  line-height: 17px
  color: var(--color--txt-headers)

:global
  .feedback_wrapper
    h2
      margin-top: 10px
      margin-bottom: 5px
      color: var(--color--p)

    p
      margin-bottom: 15px
      color: var(--color--p)

    ul
      padding-left: 15px
      margin: 0
      list-style: '− '

    blockquote
      position: relative
      padding-left: 16px
      margin: 0
      margin-left: -16px

      &:after
        content: ""
        background: var(--ORANGE)
        position: absolute
        top: 3px
        bottom: 1px
        left: 0
        width: 2px
        border-radius: 10px

      p
        font-style: italic


</style>