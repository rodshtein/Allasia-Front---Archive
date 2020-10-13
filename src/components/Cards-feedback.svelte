<script>
  export let data;

  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
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

</script>

<template lang='pug'>
mixin procedureItem
  .head
    h3.h4 {el.header}
    p.p {el.name}, {el.age} {numDeclension(el.age)}
  .content
    +html('serialize(JSON.parse(el.review.document))')

  .btn-wrap
    Button(
      size='small'
      text='Полный отзыв'
      on:click!='{() => toggle(el) }'
    )

CardWrapper
  CardHeader(header='Отзывы')
  +if('data[1]')
    .slider
      .slider-wrapper
        +each('data as el')
          .slider-item
            +procedureItem

    +else
      .slider-wrapper.single
        +each('data as el')
          .slider-item
            +procedureItem


FeedbackPopup(
  data='{feedback}'
  bind:showFeedback!='{showFeedback}'
)

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider
  position: relative
  // overflow: hidden
  padding: 0
  padding-bottom: 15px
  overflow-x: scroll
  margin:
    left: -10px
    right: -10px

.slider-wrapper
  display: grid
  grid-auto-flow: column
  grid-column-gap: 20px
  grid-auto-columns: 83%
  // grid-auto-columns: max-content
  margin: 0 10px

  &:last-child:after
    content: ''
    width: 17%

  &.single
    grid-auto-columns: 100%
    margin: 0

    &:last-child:after
      display: none

.slider-item
  padding: 23px 19px
  position: relative
  display: flex
  flex-direction: column
  align-items: start
  max-height: 260px
  padding-bottom: 50px
  @mixin cards_decor__withe

.head
  display: grid
  grid-auto-flow: row
  row-gap: 7px
  margin-bottom: 13px

.content
  overflow: hidden
  position: relative
  mask-image:
    linear-gradient(
      to top,
      transparent 5%,
      black 30%,
      black 100%
    )

.btn-wrap
  position: absolute
  bottom: 23px
  left: 19px

</style>