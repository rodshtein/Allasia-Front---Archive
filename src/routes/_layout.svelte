<script>
	import { onMount } from "svelte";
	import { stores } from "@sapper/app";
	import NProgress from "nprogress";
	import Nav from '../components/Nav.svelte';

	const { preloading } = stores();

	onMount(async () => {
    NProgress.configure({
			parent: "#sapper",
			showSpinner: true
		});
    preloading.subscribe(loading => {
      if (loading) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    });

  });

	export let segment;
</script>


<style global lang="postcss">
@import "../style/global.sss"
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>