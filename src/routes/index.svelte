<script context="module">
  // Here we import the graphql client
  import { apollo } from "../utils";
  import { gql } from "apollo-boost";

	const ALLDOCTORS = gql`
		query {
			allDoctors (first: 100) {
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
h1 Врачи

svelte:head
	title Sapper project template

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


<style>
	img {
		display: block;
		height: 120px;
		width: 120px;
		border-radius: 100%;
	}

</style>