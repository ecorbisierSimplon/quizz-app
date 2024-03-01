<script lang="ts">
	import Question from './Question.svelte';
	// import { enhance } from '$app/forms';
	// import { onMount } from 'svelte';
	import { quizzTitleColor, handleColorChange, backgroundColor } from './question';
	import { sessionKey } from '../session';

	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let quizzTitle = '';
	let files: FileList;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
	let loadFile = function (event: Event | undefined) {
		let output: HTMLImageElement | null = document.getElementById(
			'output'
		) as HTMLImageElement | null;

		if (output !== null && event instanceof Event) {
			// Check if the event has a target and the target is an input element
			if (event.target && event.target instanceof HTMLInputElement) {
				const file = event.target.files?.[0];

				if (file) {
					output.src = URL.createObjectURL(file);

					output.onload = function () {
						if (output !== null) {
							URL.revokeObjectURL(output.src); // free memory
						}
					};
				}
			}
		}
	};
</script>

{#if form?.success}
	<h2
		style="background-color: {$backgroundColor};
				   box-shadow: 0 0 10px 9px {$backgroundColor};"
	>
		{form?.text}
	</h2>
	<button class="question__plus plus" type="submit" title="Add question !">
		<i class="fas fa-plus"></i>
	</button>
{:else}
	<form method="POST" enctype="multipart/form-data" action="/create_quizz?/create">
		<input name="session" bind:value={$sessionKey} hidden />
		<div class="title">
			<div>
				<input
					bind:value={quizzTitle}
					id="quizzTitle"
					name="text"
					type="text"
					class="form-control"
					required
				/>
				<label for="quizzTitle" class="form-label"> Quizz Title </label>
			</div>
			<div class="add__img">
				<div>
					<input
						accept="image/*"
						bind:files
						on:change={(event) => loadFile(event)}
						id="avatar"
						name="image"
						class="form-control input-file"
						type="file"
					/>
					<label for={`avatar`} class="form-label label-file">
						<i class="fas fa-image"></i> Upload a picture
					</label>
				</div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<img id="output" />
			</div>
			<div class="options">
				<div class="options__duree">
					<input id="duree" name="duration" type="number" min="0" max="600" class=" form-control" />
					<label for="duree" class="form-label">
						During by question<small>(in seconds ; 0 : infinite)</small></label
					>
				</div>
				<div class="options__color">
					<div>
						<input
							bind:value={$quizzTitleColor}
							id="color"
							type="text"
							class="options__color--decimal form-control"
							required
						/>
						<input
							bind:value={$quizzTitleColor}
							on:change={handleColorChange}
							id="colorChoice"
							type="color"
							name="color"
							class="options__color--choice"
							required
						/>
					</div>
					<label for="colorChoice" class="form-label"> Quizz Color </label>
				</div>
			</div>
		</div>
		<button class="question__plus plus" type="submit" title="Add question !">
			<i class="fas fa-plus"></i>
		</button>
	</form>
{/if}

<style lang="scss">
	#quizz {
		border-radius: 15px;
		background-image: radial-gradient(
			circle,
			hsl(19.9deg 73.01% 32.85% / 58%) 0%,
			hsl(0deg 75.63% 23.4% / 52.7%) 50%
		);
		box-shadow: 3px 7px 9px 3px hsla(35, 41%, 28%, 0.41);
	}

	.label-file {
		cursor: pointer;
		color: #310303;
		font-weight: bold;
		width: 320px;
		height: 50px;
		background-color: hsl(0, 0%, 55%);
		padding: 8px;
		border-radius: 5px;
		line-height: inherit;
	}
	.label-file:hover {
		color: #720303;
	}

	// et on masque le input
	.input-file {
		display: none;
	}

	button.question_plus {
		float: right;
		margin: 50px 20px 0 0;
	}
</style>
