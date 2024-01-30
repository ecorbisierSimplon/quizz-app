<script lang="ts">
	import { quizzTitleColor, handleColorChange } from './question';

	let questions = [{ question: '', responses: [{ text: '', isCorrect: '0' }] }];

	function addQuestion() {
		questions = [...questions, { question: '', responses: [{ text: '', isCorrect: '0' }] }];
	}

	function addResponse(questionIndex: number) {
		questions[questionIndex].responses = [
			...questions[questionIndex].responses,
			{ text: '', isCorrect: '0' }
		];
	}

	function saveForm() {
		// Handle form submission logic here
		console.log({ $quizzTitleColor, questions });
	}

	function removeQuestion(questionIndex: number) {
		questions = questions.filter((_, index) => index !== questionIndex);
	}

	function removeResponse(questionIndex: number, responseIndex: number) {
		questions[questionIndex].responses = questions[questionIndex].responses.filter(
			(_, index) => index !== responseIndex
		);
	}

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

<form class="quizz" on:submit|preventDefault={saveForm}>
	{#each questions as question, questionIndex (questionIndex)}
		<div class="question">
			<div>
				<input
					bind:value={question.question}
					id={`question-${questionIndex}`}
					name={`question-${questionIndex}`}
					type="text"
					class="form-control"
					required
				/>
				<button
					class="question__remove remove"
					type="button"
					on:click={() => removeQuestion(questionIndex)}><i class="fas fa-trash-alt"></i></button
				>
			</div>
			<label for={`question-${questionIndex}`} class="form-label">
				Question {questionIndex + 1}
			</label>

			<div class="options left">
				<div class="options__image">
					<input
						accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, image/webp"
						bind:files
						id={`image-${questionIndex}`}
						name={`image-${questionIndex}`}
						class="form-control"
						type="file"
					/>
					<label for={`image-${questionIndex}`} class="form-label">Upload a picture</label>
				</div>
				<div class="options__duree">
					<input
						id={`duree-${questionIndex}`}
						name={`duree-${questionIndex}`}
						type="number"
						min="0"
						max="600"
						class=" form-control"
					/>
					<label for={`duree-${questionIndex}`} class="form-label">
						During by question <br /><small>(in seconds ; 0 : infinite)</small></label
					>
				</div>
				<div class="options__score">
					<input
						type="number"
						id={`score`}
						name={`score`}
						class="form-control score"
						min="0"
						max="20"
						value="10"
					/>
					<label for={`score`} class="form-label"> Score </label>
				</div>
			</div>
		</div>
	{/each}
	<!-- <button class="question__plus plus" type="button" on:click={addQuestion} title="Add question !">
		<i class="fa fa-plus"></i>
	</button> -->

	<!-- <button type="submit" class="btn btn-primary">Create</button> -->
</form>

<!-- .carousel {
		display: flex;
		transition: transform 0.3s ease;
	}

	.carousel div {
		flex: 0 0 100%;
		box-sizing: border-box;
	} -->

<style>
	#content {
		display: flex;
		overflow: hidden;
		width: 100%;
	}
</style>
