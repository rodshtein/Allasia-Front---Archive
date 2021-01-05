<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import Button from './Button.svelte';
  import FeedbackPopup from './Popups-feedback.svelte';
  import { tick } from 'svelte';
  import { serialize, numDeclension } from '../helpers.js';

  let showFeedback = false;
  let feedback = false;

	const toggle = async (el) => {
		feedback = el
		await tick();
		showFeedback=!showFeedback
  }

  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };

  let classConfig = { p: "p-mini" }
</script>

<template lang='pug'>
Nailer
  +each('data as el (el.id + data.length)')
    .slider-item.card_decor__white( class!='{cls("slider-item")}' )
      .head
        h3.h4 {el.header}
        p.p-small {el.name}, {el.age} {numDeclension(el.age)}
      .content
        +html('serialize(JSON.parse(el.review.document), classConfig)')

      .btn-wrap
        Button(
          size='small'
          text='Полный отзыв'
          on:click!='{() => toggle(el) }'
        )

FeedbackPopup(
  data='{feedback}'
  bind:showFeedback!='{showFeedback}'
)

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider-item
  padding: 23px 19px
  position: relative
  flex: 0 0 auto
  width: calc(83% / 2)
  display: flex
  flex-direction: column
  align-items: start
  max-height: 260px
  margin-right: 15px

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)

  &::before
    content: ''
    position: absolute
    left: -15px
    right: -15px
    top: -15px
    bottom: -15px

  &:last-child
    margin-right: 0

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

  .head
    display: grid
    grid-auto-flow: row
    row-gap: 7px
    margin-bottom: 13px

    .p-small
      color: var(--LIGHT-BLUE)

  .content
    overflow: hidden
    position: relative
    mask-image:
      linear-gradient(
        to top,
        transparent 5%,
        #00000030 30%,
        black 100%
      )

  .btn-wrap
    margin-top: 10px

</style>