<script>
  import { nailer } from './';

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

.container(class:overflowL class:overflowR)
  .left-side
    button(bind:this='{props.prevBtn}') Prev
  .right-side
    button(bind:this='{props.nextBtn}') Next

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

.slider-wrapper
  position: relative
  overflow: hidden
  padding: 0
  padding:
    top: 10px
    bottom: 10px

.slider
  display: block
  white-space: nowrap
  margin: 0 30px

.left-side, .right-side
  display: none
  position: absolute
  width: 1px
  height: 100%
  background: var(--BLUE)
  z-index: 2


.left-side > button
  position: absolute
  top: 40%
  right: 20px


.right-side > button
  position: absolute
  top: 40%
  left: 20px

.container.overflowL > .left-side
  display: block
  left: 0

.container.overflowR > .right-side
  display: block
  right: 0


</style>