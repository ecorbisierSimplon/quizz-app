<script lang="ts">
	import { setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import type { ActionData, LoginData } from '$lib/packages/types';
	import { goto } from '$app/navigation';
	import { session } from '../session';

	export let data: LoginData;
	export let form: ActionData;

	onMount(() => {
		setCookie('session', 'false', { expires: 0, path: '/' });
		setCookie('surname', '', { expires: 0, path: '/' });
		setCookie('firstname', '', { expires: 0, path: '/' });
		if (form?.success || !$session) {
			goto('/');
		}
	});
</script>

{#if !form?.success && $session}
	<div class="modals">
		<div class="">
			<h3>Yous isn't connected !</h3>
			<form method="POST" action="?/logout">
				<button class="plus">Ok</button>
			</form>
		</div>
	</div>
{/if}

<style lang="scss">
</style>
