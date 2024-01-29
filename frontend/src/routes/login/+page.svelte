<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

{#if form?.success}
	<p>Successfully logged in! Welcome back, {data.user}</p>
{:else}
	<form method="POST" action="?/login">
		<label>
			Email
			<input name="email" type="email" />
			<span>{form?.message}</span>
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button>Log in</button>
		<button formaction="?/register">Register</button>
	</form>
{/if}

<style lang="scss">
	p {
		color: aliceblue;
	}
</style>
