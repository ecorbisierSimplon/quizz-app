<script lang="ts">
	import { quizzTitleColor, handleColorChange } from './question';
	let quizzTitle = '';
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
	<div class="title">
		<div>
			<input
				bind:value={quizzTitle}
				id="quizzTitle"
				name="quizzTitle"
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
				name="avatar"
				class="form-control"
				type="file"
			/>
			<label for={`avatar`} class="form-label">Upload a picture</label>
		</div>
		<div class="options">
			<div class="options__duree">
				<input id="duree" name="duree" type="number" min="0" max="600" class=" form-control" />
				<label for="duree" class="form-label">
					During by question <br /><small>(in seconds ; 0 : infinite)</small></label
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
	<hr />
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
					on:click={() => removeQuestion(questionIndex)}><i class="fa fa-trash-o"></i></button
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
			</div>
			<hr />
			{#each question.responses as response, responseIndex (responseIndex)}
				<div class="response">
					<label for={`response-${questionIndex}-${responseIndex}`} class="form-label">
						Response {responseIndex + 1}
					</label>
					<div>
						<input
							bind:value={response.text}
							id={`response-${questionIndex}-${responseIndex}`}
							name={`response-${questionIndex}-${responseIndex}`}
							type="text"
							class="form-control"
							required
						/>
					</div>
					<div>
						<label for={`radio-false-${questionIndex}-${responseIndex}`} class="form-label"
							>Score
						</label>
						<input
							type="number"
							id={`score-${questionIndex}-${responseIndex}`}
							name={`score-${questionIndex}-${responseIndex}`}
							class="form-control score"
							min="0"
							max="20"
							value="10"
						/>
						<label for={`radio-false-${questionIndex}-${responseIndex}`} class="form-label"
							>Response
						</label>
						<div class="switch-field">
							<div class="switch-field">
								<input
									type="radio"
									id={`radio-false-${questionIndex}-${responseIndex}`}
									name={`switch-${questionIndex}-${responseIndex}`}
									class="false"
									bind:group={response.isCorrect}
									value="0"
								/>
								<label for={`radio-false-${questionIndex}-${responseIndex}`}>False</label>
								<input
									type="radio"
									id={`radio-true-${questionIndex}-${responseIndex}`}
									name={`switch-${questionIndex}-${responseIndex}`}
									class="true"
									bind:group={response.isCorrect}
									value="1"
								/>
								<label for={`radio-true-${questionIndex}-${responseIndex}`}>True</label>
							</div>

							<button
								type="button"
								class="respons__remove remove"
								on:click={() => removeResponse(questionIndex, responseIndex)}
								><i class="fa fa-trash-o"></i></button
							>
						</div>
					</div>
				</div>
				<hr />
			{/each}
			<button
				class="response__plus plus"
				type="button"
				on:click={() => addResponse(questionIndex)}
				title="Add response !"><i class="fa fa-plus"></i></button
			>
		</div>
	{/each}
	<button class="question__plus plus" type="button" on:click={addQuestion} title="Add question !"
		><i class="fa fa-plus"></i></button
	>

	<button type="submit" class="btn btn-primary">Create</button>
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
