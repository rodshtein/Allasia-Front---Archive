<script>
  export let data;
  export let PAGE;

  import { onMount } from 'svelte';
  import { client } from '../utils';
  import { MEDICAL_PAGE__PROCEDURES } from '../queries';


  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  let isMounted = false;
  let waiteResponse = false;

  onMount(()=> { isMounted=true })

  $: request(PAGE)

  function request(PAGE){
    if(isMounted){
      waiteResponse = true;
      client.watchQuery({
        query: MEDICAL_PAGE__PROCEDURES,
        variables: {
            id: PAGE.params.slug
        }
      }).subscribe(
        (result) => {
          waiteResponse = false
          if (result.errors) {
            console.log({ 'result error':result.errors })
          } else {
            data = result.data.MedicalPage.procedures
          }
        },
        (error) => {
          waiteResponse = false
          console.log({ 'request error':error  })
        }
      );
    }
  }

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

+if('data && data[0] && !waiteResponse')
  CardWrapper
    CardHeader(header='Процедуры и стоимость')
    +if('data[1]')
      Nailer
        +each('data as el')
          .item-wrap
            .slider-item
              +procedureItem

      +else
        .slider.single
          +each('data as el')
            .slider-item
              +procedureItem

+if('!waiteResponse')
  CardWrapper
    CardHeader(header='')
    .slider-wrapper
      .slider
        .slider-skeleton
        .slider-skeleton
        .slider-skeleton
        .slider-skeleton


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

.item-wrap
  display: inline-block
  width: calc(83% / 2)
  margin-right: 15px

  &:first-child .slider-item
    margin-left: -30px

.slider-item
  padding: 23px 19px
  position: relative
  user-select: none




  @mixin cards_decor__withe


.slider-skeleton
  padding: 23px 19px
  position: relative
  height: 200px
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

</style>