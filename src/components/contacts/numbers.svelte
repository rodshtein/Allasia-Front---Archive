<script>
  export let contact = null;
  import { serialize, sort } from '../../helpers';
</script>

<template lang='pug'>
  +if('!contact.main_number')
    h3.h3 {contact.city}
    a.phone-number( href='{contact.tel_link}' ) {contact.tel}
    +else
      h3.info {contact.main_number_desc}
      a.phone-number( href='{contact.tel_link}' ) {contact.tel}

</template>


<style lang='postcss'>
@import "../../style/mixins.sss"

.info
  font-style: normal
  font-size: 13px
  font-weight: normal
  line-height: 120%
  color: var(--color--txt---light-blue)
  margin-bottom: 10px

.h3, .info
  margin-bottom: 5px
  &:after
    content: ''
    margin: 8px 0
    @mixin devider

.phone-number
  display: flex
  align-items: center
  justify-content: space-between
  font-style: normal
  font-weight: 700
  font-size: 33px
  text-decoration: none
  color: var(--color--txt-headers)
  line-height: 85%

  &:after
    content: url("/icons/25/handset.svg")
    height: 25px
    margin-left: 20px

  &:hover
    color: var(--ORANGE)

  @media(width < 380px)
    font-size: 27px

</style>