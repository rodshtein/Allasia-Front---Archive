<script>
	export let segment;
	import Branches from './Nav-branches.svelte';
	import { showMenu } from './Store-branches.js';
</script>


<template lang="pug">
nav
	ul
		li
			a(aria-current="{segment === undefined ? 'page' : undefined}" href=".") home
	button( on:click!='{() => $showMenu = true }') show menu

Branches
</template>





<style lang='postcss'>


</style>
