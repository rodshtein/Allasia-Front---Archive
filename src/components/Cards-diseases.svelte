<script>
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';

  export let data;
</script>

<template lang='pug'>

CardWrapper
  CardHeader(header='Группа болезней')
  .diseases
    +each('data as item, i' )
      .item
        h3 {item.name}
        +if('item.ad_name')
          +each('JSON.parse(item.ad_name) as item' )
            p.p {item}
        +if('data.length-1 !== i && data.length-1 > 0')
          .devider

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

    .devider
      margin: 8px 0

</style>