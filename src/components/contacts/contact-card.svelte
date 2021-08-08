<script>
  export let contact = null;
  import { serialize, sort } from '../../helpers';
</script>

<template lang='pug'>
  +if('!contact.main_number')
    h3.h3 {contact.city}
    a.phone-number( href='{contact.tel_link}' ) {contact.tel}
    a.email( href='mailto:{contact.mail}' ) {contact.mail}
      span.label Написать
    +if('contact.fields')
      .ex_fields
        +each('sort(contact.fields) as field')
          a.ex_field(href='{field.link}' target="_blank" rel="nofollow")
            .wrap
              span.name {field.name + ': '}
              span.description  {field.description}
            span.label {field.link_name}
    +if('contact?.description?.document')
      .content
        +html('serialize(JSON.parse(contact.description.document))')
    +else
      h3.info {contact.main_number_desc}
      a.phone-number( href='{contact.tel_link}' ) {contact.tel}
      +if('contact?.description?.document')
        .content
          +html('serialize(JSON.parse(contact.description.document))')

</template>


<style lang='postcss'>
@import "../../style/mixins.sss"

.info
  font-style: normal
  font-size: 13px
  font-weight: normal
  line-height: 120%
  color: var(--color--txt--subheaders)
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
  color: var(--color--txt--headers)
  line-height: 85%

  &:after
    content: url("/icons/25/handset.svg")
    height: 25px
    margin-left: 20px

  &:hover
    color: var(--ORANGE)

  @media(width < 380px)
    font-size: 27px


.email
  display: flex
  justify-content: space-between
  white-space: pre-wrap
  align-items: baseline
  font-size: 27px
  font-style: normal
  font-weight: normal
  font-size: 22px
  line-height: 85%
  text-decoration: none
  color: var(--color--txt--headers)
  padding-top: 15px

  .label
    margin-left: 20px

  &:hover
    color: var(--ORANGE)

    .label
      border-color: var(--ORANGE)
      color: var(--ORANGE)

.ex_fields
  margin-bottom: -5px
  &::before
    content: ''
    margin:
      top: 15px
      bottom: 8px
    @mixin devider

.ex_field
  display: flex
  justify-content: flex-start
  white-space: pre-wrap
  align-items: baseline
  font-size: 16px
  font-style: normal
  line-height: 120%
  text-decoration: none
  color: var(--color--txt--headers)
  padding:
    top: 5px
    bottom: 5px

  .name
    font-weight: bold

  .description
    font-weight: normal
    margin-right: 20px

  .label
    margin-left: auto

  &:hover
    color: var(--ORANGE)

    .label
      text-decoration: none
      border-color: var(--ORANGE)
      color: var(--ORANGE)

.content::before
  content: ''
  margin:
    top: 15px
    bottom: 30px
  @mixin devider


</style>