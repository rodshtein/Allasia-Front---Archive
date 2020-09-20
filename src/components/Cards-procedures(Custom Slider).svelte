<script>
  export let data;

  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';
  import { pannable } from './Slider.js';
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';


	const coords = spring({ x: 0}, {
		stiffness: 0.2,
		damping: 0.4
	});

	function handlePanStart() {
		coords.stiffness = coords.damping = 1;
	}

	function handlePanMove(event) {
    console.log(event.detail.x);
    console.log(event.detail.dx);
    // event.path[1].scrollLeft = event.detail.x
		coords.update($coords => ({
			//x: $coords.x + event.detail.dx,
		}));
	}

	function handlePanEnd(event) {
		coords.stiffness = 0.2;
		coords.damping = 0.4;
	}

  let showSlider = data.length > 1;
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
  +if('showSlider')
    .slider
      .slider-wrapper(
        use:pannable
        on:panstart='{handlePanStart}'
        on:panmove='{handlePanMove}'
        on:panend='{handlePanEnd}'
        style=`transform: translateX({$coords.x}px)`
      )
        +each('data as el')
          .slider-item
            +procedureItem

    +else
      +each('data as el')
        .slider-item.single
          +procedureItem

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

.slider-item
  padding: 23px 19px
  position: relative
  @mixin cards_decor__withe
  &.single
    width: 100%


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

</style>