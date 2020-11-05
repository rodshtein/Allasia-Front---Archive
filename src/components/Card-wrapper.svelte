
<template lang='pug'>
.cards_wrapper
  slot
</template>

<style lang='postcss'>
.cards_wrapper
  padding: 15px
  @media( width > 550px )
    padding-bottom: 25px
  @media( width > 800px )
    padding-bottom: 50px

</style>