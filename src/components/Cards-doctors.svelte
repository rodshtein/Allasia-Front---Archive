<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';
  import CardWrapper from './Card-wrapper.svelte';
  import CardHeader from './Card-header.svelte';


  function makeSpecialty(arr){
    let stop = false;
    let max = 30;

    return arr.reduce((prevVal, item, i, arr)=>{
      let count = arr.length - i;
      let length = (prevVal + item.name).length;

      let per = length > max
        ? ', +' + count
        : ', ';

      if (stop) return prevVal

      if (length > max && i > 0 && !stop) {
        stop = true
        return prevVal + per
      }

      if (!prevVal) return item.name

      return prevVal + per + item.name
    }, '')
  }

</script>

<template lang='pug'>

CardWrapper
  CardHeader(header='Врачи')
  Nailer
    +each('data as el (el.id)')
      a.slider-item(alt='Страница врача' href='.' rel='prefetch')
        +if('el.avatar && el.avatar.publicUrl')
          .avatar(
            style='background-image: url({el.avatar.publicUrl})'
            )
          +else
            .avatar
        h3.name {el.name}
        +if('el.specialty[0]')
          p.specialty {makeSpecialty(el.specialty)}

</template>

<style lang='postcss'>
@import "../style/mixins.sss"


.slider-item
  padding: 23px 19px
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  width: 140px
  text-decoration: none
  color: #000
  user-select: none
  flex: 0 0 auto
  &:hover
    color: var(--ORANGE)

.avatar
  position: relative
  height: 120px
  width: 120px
  border-radius: 50%
  background-size: cover
  margin-bottom: 20px
  &:after
    content: ''
    position: absolute
    height: 100%
    width: 100%
    border-radius: 50%
    border: 1px solid rgba(85, 142, 213, 0.15)

.name
  font-size: 15px
  font-style: normal
  font-weight: 700
  line-height: 15px
  text-align: center
  margin-bottom: 7px

.specialty
  font-size: 12px
  font-style: normal
  line-height: 14px
  text-align: center

</style>