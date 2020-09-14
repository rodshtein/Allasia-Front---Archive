<script>
import Popup from '../components/Popup.svelte';
import Button from '../components/Button.svelte';
// Content serialization
import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'

export let data;
export let showFeedback;

console.dir(JSON.parse(data.review.document))

function declOfNum(number) {
  let cases = [2, 0, 1, 1, 1, 2];
  let sign = ['год',  'года', 'лет'];
  return sign[ ( number % 100 > 4 && number % 100 < 20 ) ? 2 : cases[ (number%10<5) ? number % 10 : 5 ] ];
}



const serialize = data => {
  if (Text.isText(data)) {
      return escapeHtml(data.text)
    }

  // if (data.object === 'text' ) {
  //   return escapeHtml(data.text)
  // }
  const children = data.nodes.map(n => serialize(n)).join('')

  switch (data.type) {
    case 'heading':
      return `<h2 class="h4">${children}</h2>`
    case 'paragraph':
      return `<p class='p'>${children}</p>`
    case 'list-item':
      return `<li class='p'>${children}</li>`
    case 'unordered-list':
      return `<ul>${children}</ul>`
    case 'blockquote':
      return `<blockquote><p class='p'>${children}</p></blockquote>`
    case 'link':
      return `<a href="${data.data.href}">${children}</a>`

    default:
      return `${children}`
  }
}

</script>

<template lang='pug'>
mixin html(expression)
  |{@html !{expression}}

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
    //- .content
    +html('serialize(JSON.parse(data.review.document))')

</template>

<style lang='postcss'>
.feedback_wrapper
  padding: 0 15px

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

</style>