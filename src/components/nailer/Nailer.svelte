<script>
  import { nailer } from './';
  import { fly, fade } from 'svelte/transition';

  let overflowL = false;
	let overflowR = false;

	function eventHandler(e){
		if(e.detail.type == "overflowL") {
			overflowL = e.detail.status;
		}
		if(e.detail.type == "overflowR") {
			overflowR = e.detail.status;
		}
	}

	let props = {
    leftShift: 40
  };
</script>

<template lang='pug'>

.container
  +if('overflowL')
    .left-side(transition:fade='{{duration: 300}}')
      button(
        bind:this='{props.prevBtn}'
        transition:fly='{{duration: 400, x: 25}}'
        )
  +if('overflowR')
    .right-side(transition:fade='{{duration: 300}}')
      button(
        bind:this='{props.nextBtn}'
        transition:fly='{{duration: 400, x: -25}}'
      )

  .slider-wrapper
    .slider(use:nailer='{props}' on:update='{eventHandler}')
      slot

</template>

<style lang='postcss'>

.container
  position: relative
  margin:
    left: -30px
    right: -30px

  .left-side, .right-side
    display: block
    position: absolute
    width: 1px
    height: 100%
    background: var(--BLUE)
    z-index: 2
    transition: all .3s ease-out

  .left-side
    left: 0
    & button
      right: 0
      &:after
        background-image: url('/icons/25/short_arrow-l.svg')

  .right-side
    right: 0
    & button
      left: 0
      &:after
        background-image: url('/icons/25/short_arrow-r.svg')

  & button
    position: absolute
    background-color: transparent
    border-width: 0
    height: 100%
    width: 67px
    padding: 15px
    cursor: pointer
    &:after
      content: ''
      display: block
      background-position: center
      background-repeat: no-repeat
      border-radius: 50%
      width: 37px
      height: 37px
      transition: all .3s ease-out

    &:hover:after
      background-color: var(--LIGHT-PURPLE)

.slider-wrapper
  position: relative
  overflow: hidden
  padding: 0
  padding:
    top: 10px
    bottom: 10px

.slider
  display: flex
  margin: 0 30px

</style>