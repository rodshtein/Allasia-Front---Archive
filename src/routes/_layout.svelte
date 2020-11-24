<script>
  export let segment;

  import { onMount, afterUpdate } from "svelte";
  import { stores } from "@sapper/app";
  import NProgress from "nprogress";
  import Nav from '../components/Nav.svelte';
  import Floating from '../components/Floating-buttons.svelte';

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

  let layout_shift = segment ? true : false;
  afterUpdate( () => layout_shift = segment ? true : false );


</script>


<!-- <Nav {segment}/> -->
<main class:layout_shift>
  <slot/>
</main>
<Floating/>

<style global lang="postcss">
@import "../style/global.sss"

main
  position: relative
  max-width: 1040px
  margin:
    left: auto
    right: auto
    top: 130px
    bottom: 0
  padding: 0
  transform: translateY(0)
  transition: transform .5s ease-out

  @media ( width >= 500px )
    padding: 0 15px

  @media ( width >= 650px)
    margin-top: 140px

  @media ( width >= 800px )
    padding: 0 70px

  @media ( width >= 900px )
    margin-top: 50px
    &.layout_shift
      transform: translateY(130px)



</style>