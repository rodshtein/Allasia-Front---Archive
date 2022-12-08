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
  .wiki-card.card.card_decor__white(
    on:click!='{toggle}'
  )
    h3.p-mini {data.question}

Popup(
  bind:show!='{showAnswer}'
  header='{data.question}'
)
  .content
    +html('answerHTML')

</template>


<style lang='postcss'>
.wiki-card
  width: 100%
  cursor: pointer
  position: relative
  align-self: stretch
  border: solid 1px var(--color--btn--border---main)
  background: var(--color--btn--bg---light)
  border-radius: 14px
  padding:
    top: 15px
    right: 12px
    bottom: 19px
    left: 28px
  margin-bottom: 15px
  transition: transform .4s
  will-change: transform

  @media( width < 600px )
    padding:
      top: 12px
      right: 17px
      bottom: 14px
      left: 19px

  &:hover
    transform: scale(1.03)
    transition: transform .2s

  &::before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0

  &::after
    content: url(/icons/special/tail.svg)
    position: absolute
    left: 0
    bottom: -20px

  h3
    font-size: 24px
    line-height: 130%
    font-weight: 500

    @media( width < 600px )
      font-size: 21px
  </style>