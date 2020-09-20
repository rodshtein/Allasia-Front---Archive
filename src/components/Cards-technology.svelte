<script>
  export let data;

  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
  import Button from './Button.svelte';
  import TechnologyPopup from './Popups-technology.svelte';
  import { tick } from 'svelte';
  import { serialize } from '../helpers.js';

  let showTechnology = false;
  let technology = false;

	const toggle = async (el) => {
		technology = el
		await tick();
		showTechnology=!showTechnology
	}

  let witheContent = (el) => el.head_img && el.head_img.publicUrl ? "content-on-color" : "";
</script>

<template lang='pug'>
mixin body
  .head
    h3.h4.header {el.name}
  +if('el.description')
    .content(class='{witheContent(el)}')
      +html('serialize(JSON.parse(el.description.document))')

  .btn-wrap
    Button(
      size='small'
      text='Подробнее'
      on:click!='{() => toggle(el) }'
    )

mixin items
  +if('el.head_img && el.head_img.publicUrl')
    .slider-item.with-img(
      style='background-image: url({el.head_img.publicUrl})'
      )
      +body
    +else
      .slider-item.without-img
        +body

CardWrapper
  CardHeader(header='Технологии')
  +if('data[1]')
    .slider
      .slider-wrapper
        +each('data as el')
          +items

    +else
      .slider-wrapper.single
        +each('data as el')
          +items


TechnologyPopup(
  data='{technology}'
  bind:showTechnology!='{showTechnology}'
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
  justify-content: space-between
  max-height: 260px
  padding-bottom: 50px

  &.without-img
    @mixin cards_decor__withe

  &.with-img
    background-size: cover
    background-position: center
    background-color: #6b6b6b94
    background-blend-mode: multiply
    @mixin cards_decor__img

    & h3
      color: white

.head
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