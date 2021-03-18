<script>
export let data;
export let href = '/promotion/';

import ellipsis from '../lib/ellipsis';
import Button from './Button.svelte';
import Popup from './Popup.svelte';
import { serializeAndCut, getExpirationLabel } from '../helpers.js';

</script>


<template lang='pug'>
+if('data')
  .promo-card.card.card_decor__white
    p.label {getExpirationLabel(data.date_finish)}
    h2.h4 {data.name}
    p.p-mini.body
      +html('serializeAndCut(JSON.parse(data.review.document))')
    .btn-wrap
      Button(
        size='mini'
        iconR='arrow-r'
        text='Узнать больше'
        href!=`{href + ( data && data.url ? data.url : '#') }`
        )
</template>


<style lang='postcss'>
.promo-card
  position: relative
  display: flex
  flex-direction: column
  align-items: start
  max-height: 410px
  padding:
    top: 23px
    right: 19px
    bottom: 23px
    left: 19px

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px

  & *:not(:last-child)
    margin-bottom: 13px

  .body
    overflow: hidden
    position: relative
    margin-bottom: 20px

  .btn-wrap
    margin-top: 20px

  </style>