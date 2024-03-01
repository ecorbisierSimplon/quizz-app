<script lang="ts">
	import { onMount } from 'svelte';
	import Quizz from './Quizz.svelte';
	import { backgroundColor, calculateBackgroundColor, quizzTitleColor } from './question';
	import { session } from '../session';
	import { goto } from '$app/navigation';

	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: if (data && data.api) {
		console.log('Inside reactive statement:', data.api);
	}

	onMount(() => {
		if (!$session) {
			goto('/');
		}
	});

	$: $backgroundColor = calculateBackgroundColor($quizzTitleColor);
</script>

<svelte:head>
	<title>QuizzOmnes | Create</title>
	<meta name="description" content="QuizzOmnes" />
</svelte:head>

{#if $session}
	<div class="main__title cloud-background">
		<h1
			class="h1_title"
			style="background-color: {$backgroundColor};
				   box-shadow: 0 0 10px 9px {$backgroundColor};"
		>
			Quizz Create
		</h1>
	</div>
	<Quizz {data} {form} />

	<!-- <Question /> -->
{/if}
