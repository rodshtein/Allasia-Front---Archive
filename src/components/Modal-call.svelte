<script>
  import Modal from './Modal.svelte';
  import Contact from './contacts/body.svelte';
  import CardHeader from './Card-header.svelte';
  import { sort } from './../helpers';
  import { contacts, showCallModal } from './stores/Store-contacts.js';
</script>

<template lang='pug'>
Modal(header!='{$contacts[0].name}' bind:show!='{ $showCallModal }')
  +each('$contacts as country, i')
    .wrap
      +if('i > 0')
        CardHeader(header='{country?.name}')
      +each('sort(country.contacts, "city") as contact')
        .contact-card.card_decor__white
          Contact('{contact} short')
</template>

<style lang='postcss'>
.wrap
  margin-bottom: 40px
  &:last-child, &:only-child
    margin-bottom: 0

.contact-card
  display: flex
  flex-direction: column
  justify-content: space-between
  max-width: 600px
  padding: 23px 19px
  margin-bottom: 20px
</style>