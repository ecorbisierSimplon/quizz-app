<script lang="ts">
	import { quizzTitleColor, handleColorChange } from './question';
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
</script>

<form id="quizz" class="quizz" name="quizz">
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
		<div>
			<input
				accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, image/webp"
				bind:files
				id="avatar"
				name="image"
				class="form-control input-file"
				type="file"
			/>
			<label for={`avatar`} class="form-label label-file">
				<i class="fas fa-image"></i> Upload a picture
			</label>
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
						name="color"
						type="text"
						class="options__color--decimal form-control"
						required
					/>
					<input
						bind:value={$quizzTitleColor}
						on:change={handleColorChange}
						id="colorChoice"
						type="color"
						class="options__color--choice"
						required
					/>
				</div>
				<label for="colorChoice" class="form-label"> Quizz Color </label>
			</div>
		</div>
	</div>
</form>

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
</style>
