<script>
  export let data;

  import Nailer from './nailer/Nailer.svelte';

  let doctorsUrl = "/doctors/";

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

  // Prepare data for iteration
  function dataNormalize(data){
    if(data[0].__typename === 'Doctor') return data

    let employers = new Map();
    data.forEach( el => {
      // for clinics we have data included to doctor object
      // for medical pages data in root object
      el = el.doctor || el;
      if(!employers.has(el.id)) {
        employers.set(el.id, el)
      }
    })

    return Array.from(employers.values())
  }



</script>

<template lang='pug'>
Nailer
  +if('data.length')
    +each('dataNormalize(data) as el (el.id)')
      +if('el.name')
        a.slider-item(alt='Страница врача' href='{doctorsUrl + el.id}' rel='prefetch')
          +if('el?.avatar?.publicUrl')
            .avatar(
              style='background-image: url({el.avatar.publicUrl})'
              )
            +else
              .avatar
          +if('el?.country?.name')
            p.country {el.country.name}
          h3.name {el.name}
          +if('el.specialty.length')
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
  width: 160px
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
  @mixin light_shadow
  &:after
    content: ''
    position: absolute
    height: calc(100% - 2px)
    width: calc(100% - 2px)
    border-radius: 50%
    border: 1px solid rgba(37, 167, 92, 0.12)

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

.country
  font-size: 12px
  font-style: normal
  line-height: 14px
  text-align: center
  margin-bottom: 7px

</style>