<script>
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

.diseases.fixed_font_size
  div
    +each('data as item, i' )
      +if('showItem(item, i)')
        .item
          +if('showAdHeader(item)')
            h3 {item.name}
          +if('item.ad_name')
            +each('JSON.parse(item.ad_name) as item' )
              +if('item')
                p.p {item}
  p.p-note Группы болезней попадающих под описываемые услуги

</template>

<style lang='postcss'>
@import "../style/mixins.sss"

.diseases
  flex: 1
  padding: 23px 19px
  display: flex
  flex-direction: column
  justify-content: space-between
  @mixin cards_decor__withe

  .item
    h3
      font-family: IBM Plex Sans
      font-style: normal
      font-weight: 700
      font-size: 15px
      line-height: 120%
      margin-bottom: 5px

    &:after
      content: ''
      margin: 8px 0
      @mixin devider

    &:last-child:after
      display: none

  .p-note
    justify-self: end
    color: var(--LIGHT-BLUE)
    margin-top: 15px
    padding-top: 7px
    @mixin devider_border_top
</style>