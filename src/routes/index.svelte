<script context="module">
  // Here we import the graphql client
  import { apollo } from "../utils";
  import { gql } from "apollo-boost";

	const ALLDOCTORS = gql`
		query {
			allDoctors (first: 2) {
					name
					avatar {
						publicUrl
					}
			}
		}
  `;

  export async function preload() {
    return {
      cache: await apollo.query({
        query: ALLDOCTORS
      })
    };
  }
</script>

<script>
	import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache; // this matches the return value of `preload` above
	restore(apollo, ALLDOCTORS, cache.data);

  let docQuery = query(apollo, { query: ALLDOCTORS });

	onMount(() => { setClient(apollo) });

  $: loading = docQuery.loading;
  $: text = loading ? "Loading..." : "Great success!";
</script>


<template lang='pug'>

svelte:head
	title Аллазия, лечение за рубежем

.head_block
	.logo_block
		img(class="logo" alt="plane illustration" src="illustration/plane.svg")
		img(class="logotype" alt="logotype" src="icons/special/logo.svg")

	h1.h1 Лечение<br>за рубежом
	.subheader Подобираем выгодные условия, консультируем с известными  врачами, работаем с лучшими мировыми клиниками


+await('$docQuery')
	p Loading...
	+then('result')
		ul
			+each('result.data.allDoctors as doc')
				li {doc.name}
					+if('doc.avatar')
						img(
							class="avatar"
							alt="Loading Borat..."
							src="{doc.avatar.publicUrl}"
						)
	+catch('error')
		pre {error}

</template>


<style lang='postcss'>

.head_block
	display: flex
	flex-direction: column
	padding: 50px 15px

.logo_block
	display: flex
	flex-direction: column
	align-items: center
	margin-bottom: 30px

.logo
	max-width: 210px
	margin-bottom: 15px

.logotype
	max-width: 310px

.h1
	text-align: center
	color: #000000
	margin-bottom: 30px

.subheader
	text-align: center
	color: #000000
	max-width: 345px
	align-self: center

.avatar
	display: block
	height: 120px
	width: 120px
	border-radius: 100%
</style>
