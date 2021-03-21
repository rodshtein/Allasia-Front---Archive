<script>
export let data;

import ellipsis from '../lib/ellipsis';
import Button from './Button.svelte';
import Popup from './Popup.svelte';
import { tick } from 'svelte';
import { serialize, serializeAndCut } from '../helpers.js';

let ellipsisProps = { overflowBadge:'…', cutLength: 20 };

let showAnswer = false;
let answerHTML = false;

const toggle = async () => {
  answerHTML = serialize(JSON.parse(data.answer.document))
  await tick();
  showAnswer=!showAnswer
}
</script>


<template lang='pug'>
+if('data')
  .wiki-card.card.card_decor__white
    .head
      h3.p-mini {data.question}
    +if('data.answer')
      //- p.p-mini.answer(use:ellipsis='{ellipsisProps}')
      p.p-mini.answer
        +html('serializeAndCut(JSON.parse(data.answer.document))')
    .btn-wrap
      Button(
        size='small'
        text='Читать полностью'
        on:click!='{toggle}'
        bind:this='{ellipsisProps.effectNode}'
      )


Popup(
  bind:show!='{showAnswer}'
  header='{data.question}'
)
  .content
    +html('answerHTML')

</template>


<style lang='postcss'>
.wiki-card
  position: relative
  display: flex
  flex-direction: column
  align-items: start
  max-height: 230px
  padding: 15px

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px

  .head
    position: relative
    align-self: stretch
    border: solid 1px var(--color--btn-border)
    border-radius: 14px
    padding:
      top: 10px
      right: 12px
      bottom: 12px
      left: 12px
    margin-bottom: 15px

    &::after
      content: url(/icons/special/tail.svg)
      position: absolute
      left: 0
      bottom: -20px

  .answer
    overflow: hidden
    position: relative

  .btn-wrap
    margin-top: 20px

  </style>