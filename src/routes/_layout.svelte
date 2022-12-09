<script context="module">
  export async function preload(){
    let res = await this.fetch(`data-layout.json`);
    let json = await res.json()

    return { 
      DATA: json
    };
  }
</script>

<script>
  export let DATA;
  export let segment;

  import { onMount } from "svelte";
  import { stores } from '@sapper/app';
  import { branches } from '../components/stores/Store-branches.js';
  import { contactsIsLoaded, contacts, mainContact } from '../components/stores/Store-contacts.js';
  import { sort } from '../helpers';

  import NProgress from "nprogress";
  import Nav from '../components/Nav.svelte';
  import Floating from '../components/Floating-buttons.svelte';
  import CallModal from '../components/Modal-call.svelte';
  import Branches from '../components/branches/Nav-branches.svelte';

  const { session, preloading } = stores();

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

  // Store branches to global store
  branches.set(DATA.branches)


  // Load and process contacts
  let shift = {field: "ISO", search: $session.geo || "RU"};
  contacts.set(sort(DATA.contacts, "name", shift))
  mainContact.set($contacts[0].contacts.find(el=>el.main_number) || $contacts[0].contacts[0])
  contactsIsLoaded.set(true)

  // Control header height
  // TODO Temporary disabled
  let layout_shift = true;
  // let layout_shift = segment ? true : false;
  // afterUpdate( () => layout_shift = segment ? true : false );
</script>

<template lang="pug">
.developer-warning
  h2.h4 ⚠️ Это архив сайта Allasia.su
  p.p Компания больше не работает. Все услуги и предложения утратили актуальность

Nav({segment})
main.layout_shift
  slot
Branches
CallModal({contacts})
Floating
</template>

<style global lang="postcss">
@import "../style/global.sss"

.developer-warning
  display: block
  background-color: var(--WITHE)
  padding: 10px 13px
  margin-bottom: 20px
  text-align: center

  .h4
    margin-bottom: 4px

main
  position: relative
  max-width: 1040px
  margin:
    left: auto
    right: auto
    top: 130px
    bottom: 60px
  padding: 0
  transform: translateY(0)
  transition: transform .5s ease-out
  will-change: transform

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