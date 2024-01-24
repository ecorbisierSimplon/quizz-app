<script lang="ts">
	import '../css/styles.min.css';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style>
</style>
