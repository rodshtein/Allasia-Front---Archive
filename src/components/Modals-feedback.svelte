<script>
import Modal from './Modal.svelte';
import Button from './Button.svelte';
import { serialize, numDeclension } from '../helpers.js';

export let data;
export let showFeedback;

const date = d => {
  return new Date(`${d}`).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
    });
  }
</script>

<template lang='pug'>

+if('data')
  Modal(
    bind:show!='{showFeedback}'
    header='{data.header}')

    .feedback_wrapper
      .feedback-header
        +if('data.name')
          p.person
            span {data.name}
            +if('data.age')
              span , {data.age} {numDeclension(data.age)}

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
  color: var(--color--txt--small)

.devider
  margin-bottom: 10px

</style>