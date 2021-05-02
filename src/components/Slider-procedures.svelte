<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  let length = (data, i) => data.length > i;
  let cls = (name) => {
    if(data.length > 2) return name
    if(data.length < 2) return `${name} ${name}--1`
    if(data.length < 3) return `${name} ${name}--2`
  };

</script>

<template lang='pug'>

+if('data && data[0]')
  Nailer
    +each('data as el (el.id + data.length)')
      .card_decor__white( class!='{cls("procedure-item")}' )
        .wrap
          .header-wrap
            h3.h4 {el.name}
            +if('el.feature')
              p.subheader-h3 {el.feature}
          +if('el.price && el.price.length')
            .price( class!=`{ el.price.length < 2
                ? "price--one-item" : "" }`)
              +each('el.price as el')
                +if('el.country && el.country.name && el.price')
                  h4.p-mini.country {el.country.name}
                  .right-col
                    +if('el.price')
                      p.p-mini {el.price}
                    +if('el.conditions')
                      p.p-small.conditions {el.conditions}

        +if('el.duration || el.description')
          .description-wrap(
            class!='{cls("description-wrap")}'
          )
            +if('el.duration')
              .duration
                p.p-small {el.duration}
            +if('el.description')
              p.p-small.description {el.description}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.procedure-item
  padding: 23px 19px
  position: relative
  user-select: none
  display: flex
  flex-direction: column
  justify-content: space-between
  flex: 0 0 auto
  width: calc(83% / 2)
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

  .header-wrap
    margin-bottom: 15px
    padding-bottom: 15px
    @mixin divider_bottom

    .subheader-h3
      margin-top: 5px
      max-width: 80%

  .price
    display: grid
    grid-template-columns: repeat(2, auto)
    grid-column-gap: 20px
    grid-row-gap: 10px

    .country
      font-weight: 700
      color: var( --LIGHT-BLACK )

    .conditions
      color: var( --LIGHT-BLUE )

  .description-wrap
    display: grid
    grid-auto-flow: row
    grid-gap: 5px
    margin-top: 10px
    padding-top: 15px
    @mixin divider_top

    &--1
      @media(width > 500px)
        grid-auto-flow: column
        grid-gap: 50px

    .duration
      max-width: 80%
      .p-small
        display: flex
        &:before
          content: url('/icons/micro/time.svg')
          display: inline-block
          margin-right: 10px

  &--1
    width: 100%
    @media(width > 550px)
      .price:not(.price--one-item)
        grid-template-columns: repeat(4, auto)
        .right-col
          margin-right: 20px

        @media(width > 900px)
          grid-template-columns: repeat(6, auto)
          .right-col
            margin-right: 40px


  &--2
    width: calc((100% - 15px) / 2)
    @media(width < 650px)
      width: calc((83% - 15px))

</style>