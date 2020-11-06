<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
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

  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };
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

CardWrapper
  CardHeader(header='Технологии')
  Nailer
    +each('data as el (el.id + data.length)')
      +if('el.head_img && el.head_img.publicUrl')
        .slider-item.with-img(
          class!='{cls("slider-item")}'
          style='background-image: url({el.head_img.publicUrl})'
          )
          +body
        +else
          .slider-item.without-img(
              class!='{cls("slider-item")}'
              )
            +body

TechnologyPopup(
  data='{technology}'
  bind:showTechnology!='{showTechnology}'
)

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider-item
  padding: 23px 19px
  position: relative

  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  margin-right: 15px

  display: flex
  flex-direction: column
  justify-content: space-between
  max-height: 260px
  align-items: start
  padding-bottom: 50px

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)

  &:last-child
    margin-right: 0

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