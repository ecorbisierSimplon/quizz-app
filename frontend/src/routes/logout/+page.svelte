<script lang="ts">
	import { setCookie } from 'typescript-cookie';
	import { onMount } from 'svelte';
	import type { ActionData, LoginData } from '$lib/packages/types';
	import { goto } from '$app/navigation';

	export let data: LoginData;
	export let form: ActionData;

	onMount(() => {
		setCookie('session', 'false', { expires: 0, path: '/' });
		setCookie('surname', '', { expires: 0, path: '/' });
		setCookie('firstname', '', { expires: 0, path: '/' });
		if (form?.success) {
			goto('/');
		}
	});
</script>

{#if !form?.success}
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
			button {
				&.plus {
					border-width: 0px;
					padding: 5px 10px;
					border-radius: 10px;
					font-size: 18px;
					transition:
						color 0.15s ease-in-out,
						background-color 0.15s ease-in-out,
						border-color 0.15s ease-in-out,
						box-shadow 0.15s ease-in-out;
				}

				&.plus {
					background-color: hsl(231.08deg 54.61% 50.01%);
					box-shadow:
						1px 1px 0px 2px hsl(231, 53%, 17%),
						1px 1px 2px 2px hsla(0, 4%, 54%, 0.604);
					&:hover {
						box-shadow:
							1px 1px 2px 2px hsla(0, 4%, 54%, 0.604),
							-1px -1px 2px 2px hsl(231, 53%, 17%);
					}
				}
			}
		}
	}
</style>
