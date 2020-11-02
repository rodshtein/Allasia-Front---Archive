<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  // remove empty elements from ssr data
  data = remEmptyData(data)

  function remEmptyData(data){
    if(!data) return null
    let arr = [];
    data.forEach(item => {
      if(item.duration || item.description || item.price.length) {
        arr.push(item)
      }
    });
    return arr
  }

  let length = (data, i) => data.length > i;

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

+if('data && data[0]')
  CardWrapper
    CardHeader(header='Процедуры и стоимость')
    Nailer
      +each('data as el')
        .slider-item
          +procedureItem



</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.slider-wrapper
  position: relative
  overflow: hidden
  padding: 0
  padding-bottom: 15px
  margin:
    left: -10px
    right: -10px

.slider
  display: grid
  grid-auto-flow: column
  grid-column-gap: 20px
  grid-auto-columns: 83%
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
  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  margin-right: 15px
  @mixin cards_decor__withe

  &:last-child
    margin-right: 0

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