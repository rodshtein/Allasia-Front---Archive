<script>
  export let contact = null;
</script>

<template lang='pug'>

button.card
  +if('!contact.main_number')
    h3.city {contact.city}
    .city-number {contact.tel}
    a.handset( href='{contact.tel_link}' )
      span call

    +else
      h3.info {contact.main_number_desc}
      .country-number {contact.tel}
      a.handset( href='{contact.tel_link}' )
        span call

</template>


<style lang='postcss'>
@import "../../style/mixins.sss"

.card
  display: grid
  grid-template: auto / auto 50%
  justify-items: start
  grid-row-gap: 10px

  width: 100%
  max-width: 600px
  padding:
    top: 11px
    left: 15px
    right: 15px
    bottom: 16px
  margin-bottom: 20px

  border-radius: 9px
  border: solid 1px var(--color--borders---card-white)
  background-color: var(--color--bg--card)



.handset
  grid-area: 1 / 2 / span 2
  justify-self: right
  cursor: pointer
  padding:
    top: 11px
    left: 20px
    right: 15px
    bottom: 16px
  margin:
    top: -11px
    right: -15px
    bottom: -16px
  width: 60px
  background: url("/icons/25/handset.svg")
  background-repeat: no-repeat
  background-position: 24px 12px

  span
    opacity: 0


.city
  font-style: normal
  font-size: 13px
  font-weight: normal
  line-height: 120%
  color: var(--color--txt---light-blue)

  font-style: normal
  font-weight: normal
  font-size: 16px
  line-height: 120%

.info
  font-style: normal
  font-weight: normal
  font-size: 13px
  line-height: 120%
  margin-bottom: -10px
  &:after
    content: ''
    margin: 8px 0
    @mixin devider

.city-number
  font-style: normal
  font-weight: normal
  font-size: 16px
  line-height: 85%
  color: var(--color--txt-headers)

  @media(width < 380px)
    font-size: 27px

.country-number
  font-style: normal
  font-weight: bold
  font-size: 23px
  line-height: 23px

</style>