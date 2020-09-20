<script>
	export let segment;
</script>

<template lang="pug">

nav
	ul
		li
			a(aria-current="{segment === undefined ? 'page' : undefined}" href=".") home

		//- for the blog link, we're using rel=prefetch so that Sapper prefetches
				the blog data when we hover over the link or tap it on a touchscreen
		li
			a(rel=prefetch aria-current="{segment === 'doctors' ? 'page' : undefined}" href="/tests/quotes") tests/quotes
		li
			a(rel=prefetch aria-current="{segment === 'medical-pages' ? 'page' : undefined}" href="/medical-pages") medical-pages
</template>


<style lang='postcss'>

@media( width < 200px )
	nav
		display: none

</style>
