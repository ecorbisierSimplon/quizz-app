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
	<div>
		<div class="">
			<h3>Yous isn't connected !</h3>
			<form method="POST" action="?/logout">
				<button class="plus">Ok</button>
			</form>
		</div>
	</div>
{/if}

<style lang="scss">
	$w: 600px;
	$h: 200px;
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(80, 80, 80, 0.555);

		& > div {
			position: absolute;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: flex-end;
			width: $w;
			height: $h;
			padding: 10px;
			left: calc(calc(100vw / 2) - calc($w / 2));
			top: calc(calc(100vh / 2) - calc($h / 2));
			border-radius: 15px;
			background-image: radial-gradient(circle, hsl(231, 40%, 25%) 0%, hsl(231, 47%, 17%) 50%);
			box-shadow: 3px 7px 9px 3px hsl(231deg 41% 28% / 41%);
			h3 {
				color: rgb(207, 206, 206);
				margin: 0 auto;
			}
		}
	}
</style>
