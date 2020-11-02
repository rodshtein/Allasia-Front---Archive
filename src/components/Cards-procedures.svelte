<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  // remove empty elements from ssr data
  // data will updated on user routing
  $: data = remEmptyData(data)

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
  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };

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
      +each('data as el (el.id)')
        .div( class!='{cls("procedure-item")}' )
          +procedureItem



</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.procedure-item
  padding: 23px 19px
  position: relative
  user-select: none
  flex: 0 0 auto
  width: calc(83% / 2)
  margin-right: 15px
  @mixin cards_decor__withe

  @media(width < 650px)
    width: calc(83%)

  @media(width < 400px)
    width: calc(100% - 30px)


  &:last-child
    margin-right: 0

  &--1
    width: 100%

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

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