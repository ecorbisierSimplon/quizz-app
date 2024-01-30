<script lang="ts">
	import { onMount } from 'svelte';
	import { setCookie } from 'typescript-cookie';
	import { goto, invalidate } from '$app/navigation';

	// function reloadPage() {
	// 	const thisPage = '/'; // window.location.pathname;
	// 	console.log('goto ' + thisPage);
	// 	goto(thisPage);
	// }
	onMount(() => {
		setCookie('session', 'false', { expires: 0, path: '/' });
		setCookie('surname', '', { expires: 0, path: '/' });
		setCookie('firstname', '', { expires: 0, path: '/' });
	});
</script>

<div>
	<div class="">
		<h3>Yous isn't connected !</h3>
		<button formaction="?/logout">Ok</button>
	</div>
</div>

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
			box-shadow: 3px 7px 9px 3px hsl(231deg 41% 28% / 41%);
			h3 {
				color: rgb(207, 206, 206);
				margin: 0 auto;
			}
		}
	}
</style>
