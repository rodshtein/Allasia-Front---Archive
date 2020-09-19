<script>
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  export let data;
  export let pageName;

  let showAdHeader = (item) =>
    pageName !== item.name
    || ( item.ad_name && JSON.parse(item.ad_name)[0].length );

  let showItem = (item, i) =>
    ( item.ad_name && JSON.parse(item.ad_name)[0].length )
    || showAdHeader(item);


</script>

<template lang='pug'>

CardWrapper
  CardHeader(header='Группа болезней')
  .diseases
    +each('data as item, i' )
      +if('showItem(item, i)')
        .item
          +if('showAdHeader(item)')
            h3 {item.name}
          +if('item.ad_name')
            +each('JSON.parse(item.ad_name) as item' )
              +if('item')
                p.p {item}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.diseases
  padding: 23px 19px
  @mixin cards_decor__withe

  .item
    h3
      font-family: IBM Plex Sans
      font-style: normal
      font-weight: bold
      font-size: 15px
      line-height: 120%
      margin-bottom: 5px

    &:after
      content: ''
      margin: 8px 0
      @mixin devider

    &:last-child:after
      display: none

</style>