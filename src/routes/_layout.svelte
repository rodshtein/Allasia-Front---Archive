<script context="module">
  import { client, cache }  from '../tinyClient';
  import { CONTACTS } from './contacts/queries';


  export async function preload() {
    return { DATA : await client(CONTACTS) };
  }

</script>


<script>
  export let DATA;
  export let segment;

  import { stores } from '@sapper/app';
  import { onMount, afterUpdate} from "svelte";
  import { contactsIsLoaded } from '../components/stores/Store-call.js';
  import { sort } from '../helpers';

  import NProgress from "nprogress";
  import Nav from '../components/Nav.svelte';
  import Floating from '../components/Floating-buttons.svelte';
  import CallModal from '../components/Modal-call.svelte';
  import Branches from '../components/branches/Nav-branches.svelte';

  // Load and process contacts
  const { preloading, session } = stores();
  let shift = {field: "ISO", search: $session.geo || "RU"};

  let contacts = sort(DATA.allContactCountries, "name", shift);
  contactsIsLoaded.set(true)

  onMount(async () => {
    cache.set(
      JSON.stringify({
        query: CONTACTS
      }),
      DATA
    )

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


<Nav {segment}/>

<main class:layout_shift>
  <slot/>
</main>

<Branches/>
<CallModal {contacts} />
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
    bottom: 80px
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