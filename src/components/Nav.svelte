<script>
	export let segment;
	import Branches from './Nav-branches.svelte';
</script>


<template lang="pug">
nav
	ul
		li
			a(aria-current="{segment === undefined ? 'page' : undefined}" href=".") home
		li
			a(aria-current="{segment === 'rr' ? 'page' : undefined}" href="/rr") rr
		li
			a(rel=prefetch aria-current="{segment === 'medical-pages' ? 'page' : undefined}" href="/medical-pages") medical-pages


Branches
</template>





<style lang='postcss'>


</style>
