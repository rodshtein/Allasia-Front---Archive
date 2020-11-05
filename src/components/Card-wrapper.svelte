
<template lang='pug'>
.cards_wrapper
  slot
</template>

<style lang='postcss'>
.cards_wrapper
  padding: 15px
  @media( width > 550px )
    margin-bottom: 25px
  @media( width > 800px )
    margin-bottom: 50px

</style>