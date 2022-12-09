<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}


<style lang='postcss'>
h1, p
  margin: 0 auto
  text-align: center

h1
  font-size: 120px
  font-weight: 700

  @media (width < 480px)
    font-size: 80px
p
  font-size: 44px
  @media (width < 480px)
    font-size: 30px

pre
  padding-top: 20px
  font-size: 24px
  white-space: pre-wrap

</style>