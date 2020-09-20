<script>
  export let data;

  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
  import { onMount } from 'svelte';

	let mySwiper;
	let swiper;
	let slide;
  let options = {
      slidesPerView: 'auto',
      spaceBetween: 20,
      slidesOffsetBefore: 10,
      slidesOffsetAfter: 10,
      grabCursor: true,
      slideClass: 'swiper-slide--procedures',
      wrapperClass: 'swiper-wrapper--procedures',
    };

	onMount(async () => {
			const module = await import('svelte-swiper');
			swiper = module.Swiper
			slide = module.SwiperSlide
	});

  let showSwiper = data.length > 1;
</script>

<template lang='pug'>
mixin procedureItem
  .wrap
    .header-wrap
      h3.h3 {el.name}
      +if('el.feature')
        p.subheader-h3 {el.feature}
    +if('el.duration')
      .duration
        p.p {el.duration}
    +if('el.description')
      p.p.description {el.description}
    +if('el.price')
      +each('el.price as el')
        .price-item
          .wrap
            +if('el.country && el.country.name')
              p.country {el.country.name}
            +if('el.price')
              p.p.price {el.price}
          +if('el.conditions')
            p.conditions {el.conditions}

CardWrapper
  CardHeader(header='Процедуры')
  +if('showSwiper')
    svelte:component(this='{swiper}' bind:swiper='{mySwiper}' '{options}')
      +each('data as el')
        svelte:component(this='{slide}')
          +procedureItem
    +else
      +each('data as el')
        .single-item
          +procedureItem



</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.single-item
  padding: 23px 19px
  width: 100%
  position: relative
  @mixin cards_decor__withe

.header-wrap:after
  content: ''
  margin: 12px 0
  @mixin devider

h3
  margin-bottom: 5px

.duration
  padding-top: 3px

  &:after
    content: ''
    margin: 12px 0
    @mixin devider

  p
    display: flex

    &:before
      content: url(/icons/micro/time.svg)
      display: inline-block
      margin:
        top: 1px
        right: 10px

.description
  padding: 0, 5px

  &:after
    content: ''
    margin: 12px 0
    @mixin devider

.price-item
  .wrap
    display: flex
    justify-content: space-between
    flex-wrap: wrap

    .country
      font-size: 14px
      font-weight: 700
      line-height: 17px
      margin-bottom: 5px

    .price
      flex-grow: 2
      text-align: right
      margin-bottom: 5px

  .conditions
    font-size: 12px
    font-weight: 400
    line-height: 14px
    text-align: right
    color: var(--color--p)
    margin-left: 20%

  &:after
    content: ''
    margin: 8px 0
    @mixin devider

  &:last-child:after
    display: none

:global
  .swiper-container
    position: relative
    overflow: hidden
    padding: 0
    padding-bottom: 15px
    z-index: 1
    margin:
      left: -10px
      right: -10px

  .swiper-wrapper--procedures
    position: relative
    width: 100%
    height: 100%
    z-index: 1
    display: flex
    transition-property: transform
    box-sizing: content-box

  .swiper-slide--procedures
    padding: 23px 19px
    width: 83%
    flex-shrink: 0
    position: relative
    transition-property: transform
    @mixin cards_decor__withe



</style>