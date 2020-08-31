<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>


<style global lang="postcss">
@import "../style/global.sss"
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

