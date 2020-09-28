<script>
	export let segment;
	import Branches from './Nav-branches.svelte';
</script>


<template lang="pug">
nav
	ul
		li
			a(aria-current="{segment === undefined ? 'page' : undefined}" href=".") home

Branches
</template>





<style lang='postcss'>


</style>
