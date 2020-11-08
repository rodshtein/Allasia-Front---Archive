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

+if('data && data[0]')
  CardWrapper
    CardHeader(header='Процедуры' subHeader='Стоимость, особенности, сроки')
    Nailer
      +each('data as el (el.id + data.length)')
        .div( class!='{cls("procedure-item")}' )
          .header-wrap
            h3.h3 {el.name}
            +if('el.feature')
              p.subheader-h3 {el.feature}

          +if('el.price')
            .price-wrap(class!='{el.price.length < 2 ? "price-wrap--one-item": ""}')
              +each('el.price as el')
                .price-item
                  .first-line-wrap
                    +if('el.country && el.country.name')
                      p.country {el.country.name}
                    +if('el.price')
                      p.price {el.price}

                  +if('el.conditions')
                    p.conditions {el.conditions}

          +if('el.duration || el.description')
            .description-wrap(
              class!='{cls("description-wrap")}'
            )
              +if('el.duration')
                .duration
                  p.p-note {el.duration}
              +if('el.description')
                p.p-note.description {el.description}
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

  .header-wrap
    margin-bottom: 15px
    padding-bottom: 15px
    @mixin devider_border_bottom

    .h3
      max-width: 80%
      margin-bottom: 5px
    .subheader-h3
      max-width: 80%

  .price-wrap
    display: block

    .price-item
      margin-bottom: 15px
      break-inside: avoid
      &:last-child
        margin-bottom: 0px

      .first-line-wrap
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        font-size: 14px
        line-height: 130%
        color: var(--color--p)

        .country
          font-weight: 700
          margin-bottom: 5px
          white-space: nowrap
          margin-right: 10px

        .price
          flex: 1
          text-align: right
          margin-bottom: 5px

    .conditions
      font-size: 12px
      font-weight: 400
      line-height: 14px
      text-align: right
      color: var(--LIGHT-BLUE)
      margin-left: 20%
      white-space: nowrap

  .description-wrap
    display: grid
    grid-auto-flow: row
    grid-gap: 5px
    margin-top: 10px
    padding-top: 15px
    @mixin devider_border_top

    &--1
      @media(width > 500px)
        grid-auto-flow: column
        grid-gap: 50px

    .duration
      max-width: 80%
      .p-note
        display: flex
        color: var(--color--p)
        &:before
          content: url(/icons/micro/time.svg)
          display: inline-block
          margin-right: 10px

    .description
      color: var(--color--p)

  &--1
    width: 100%

    @media(width > 380px)
      .price-wrap:not(.price-wrap--one-item)
        column-count: 2
        column-gap: 70px

        @media(width > 900px)
          column-gap: 100px

        @media(380px < width < 600px)

          & .price-item .first-line-wrap
            flex-direction: column

          & .price-item .first-line-wrap .price
            text-align: left

          & .price-item .conditions
            text-align: left
            margin: 0

  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

</style>