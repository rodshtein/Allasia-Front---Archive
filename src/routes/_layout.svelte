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
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
  import { contactsIsLoaded, contacts, mainContact } from '../components/stores/Store-contacts.js';
  import { sort } from '../helpers';

  import NProgress from "nprogress";
  import Nav from '../components/Nav.svelte';
  import Floating from '../components/Floating-buttons.svelte';
  import CallModal from '../components/Modal-call.svelte';
  import Branches from '../components/branches/Nav-branches.svelte';

  const { session, preloading } = stores();

  let devWarning = false;

  function warningHandler(){
    localStorage.setItem('hideDevWarning', true)
  }

  onMount(async () => {
    NProgress.configure({
      showSpinner: true
    });
    preloading.subscribe(loading => {
      if (loading) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    });

    
    if (!localStorage.getItem('hideDevWarning')){
      devWarning = true;
    }
  });

  // Store branches to global store
  branches.set(DATA.branches)


  // Load and process contacts
  let shift = {field: "ISO", search: $session.geo || "RU"};
  contacts.set(sort(DATA.contacts, "name", shift))
  mainContact.set($contacts[0].contacts.find(el=>el.main_number) || $contacts[0].contacts[0])
  contactsIsLoaded.set(true)
</script>

<template lang="pug">

Modal(width=600 buttonCaption='Больше не показывать' background='#c1d2cc' buttonCallback='{warningHandler}' header='⚠️ Архив сайта' bind:show!='{ devWarning }')
  .developer-warning
    h1 Это архив сайта Allasia.su
    p.p Компания больше не работает.
    p.p Все услуги и предложения утратили актуальность.

Nav({segment})
main
  slot
Branches
CallModal({contacts})
Floating
</template>

<style global lang="postcss">
@import "../style/global.sss"

.developer-warning
  padding: 20px 17px 30px
  margin: 30px 0 0
  background: #fff
  border-radius: 13px
  h1
    font-size: 23px
    margin-bottom: 20px
  p
    font-size: 19px
    margin-bottom: 5px

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
</style>