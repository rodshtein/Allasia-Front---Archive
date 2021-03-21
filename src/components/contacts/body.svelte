<script>
  export let contact = null;
  import { serialize } from '../../helpers';
</script>

<template lang='pug'>
  +if('!contact.main_number')
    h3.h3 {contact.city}
    a.phone-number( href='{contact.tel_link}' ) {contact.tel}
    a.email( href='{contact.mail}' ) {contact.mail}
    +if('contact.fields')
      .ex_fields
        +each('contact.fields as field')
          a.ex_field(href='{field.link}' target="_blank" rel="nofollow") {field.name}
            span.label {field.link_name}
    +if('contact?.description?.document')
      .content
        +html('serialize(JSON.parse(contact.description.document))')
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
  font-style: normal
  font-weight: 700
  font-size: 33px
  text-decoration: none
  color: var(--color--txt-headers)
  line-height: 85%


  &:hover
    color: var(--ORANGE)
    text-decoration: underline

  @media(width < 380px)
    font-size: 27px


.email
  font-size: 27px
  font-style: normal
  font-weight: normal
  font-size: 22px
  line-height: 85%
  text-decoration: none
  color: var(--color--txt-headers)
  margin-top: 15px
  &:hover
    color: var(--ORANGE)
    text-decoration: underline
  &:after
    content: ''
    margin: 8px 0
    @mixin devider

.ex_fields
  margin:
    top: 10px
    bottom: 10px

  &:after
    content: ''
    margin: 8px 0
    @mixin devider

.ex_field
  display: flex
  justify-content: space-between
  align-items: baseline
  font-style: normal
  font-weight: bold
  font-size: 16px
  line-height: 120%
  text-decoration: none
  color: var(--color--txt-headers)
  padding:
    top: 5px
    bottom: 5px

  span
    margin-left: 20px

  &:hover
    color: var(--ORANGE)

    span
      text-decoration: none
      border-color: var(--ORANGE)
      color: var(--ORANGE)


</style>