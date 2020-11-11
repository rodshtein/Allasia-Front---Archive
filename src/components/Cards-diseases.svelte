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

.diseases
  div
    +each('data as item, i' )
      +if('showItem(item, i)')
        .item
          +if('showAdHeader(item)')
            h3.p {item.name}
          +if('item.ad_name')
            +each('JSON.parse(item.ad_name) as item' )
              +if('item')
                p.p-note {item}
  p.p-note.info Группы болезней попадающих под описываемые услуги

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
      font-style: normal
      font-size: 15px
      font-weight: 400
      line-height: 120%
      margin-bottom: 5px

    &:after
      content: ''
      margin: 8px 0
      @mixin devider

    &:last-child:after
      display: none

  .p-note
    color: var(--LIGHT-BLUE)

  .info
    justify-self: end
    color: var(--LIGHT-BLUE)
    margin-top: 15px
    padding-top: 7px
    @mixin devider_border_top
</style>