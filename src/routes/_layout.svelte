<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import NProgress from "nprogress";
  import Nav from '../components/Nav.svelte';

  const { preloading } = stores();

  onMount(async () => {
    NProgress.configure({
      // parent: "#sapper", // set class .nprogress-custom-parent
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


<Nav {segment}/>

<main>
  <slot></slot>
</main>

<style global lang="postcss">
@import "../style/global.sss"

main
  position: relative
  max-width: 1040px
  margin: 0 auto
  padding: 0 70px
  @media(width < 800px)
    padding: 0 15px
  @media(width < 500px)
    padding: 0

</style>