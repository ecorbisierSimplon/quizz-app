<script lang="ts">
	let quizzTitleColor = '';
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
		console.log({ quizzTitleColor, questions });
	}

	function removeQuestion(questionIndex: number) {
		questions = questions.filter((_, index) => index !== questionIndex);
	}

	function removeResponse(questionIndex: number, responseIndex: number) {
		questions[questionIndex].responses = questions[questionIndex].responses.filter(
			(_, index) => index !== responseIndex
		);
	}
</script>

<form on:submit|preventDefault={saveForm}>
	<div class="quizz title">
		<div>
			<input bind:value={quizzTitle} id="quizzTitle" type="text" class="form-control" required />
			<label for="quizzTitle" class="form-label"> Quizz Title </label>
		</div>
		<div class="quizz title__color">
			<div>
				<input
					bind:value={quizzTitleColor}
					id="quizzTitleColor"
					type="text"
					class="title__color--decimal title colorDecimal form-control"
					required
				/>
				<input
					bind:value={quizzTitleColor}
					id="quizzTitleColorChoice"
					type="color"
					class="title__color--choice"
					required
				/>
			</div>
			<label for="quizzTitleColor" class="form-label"> Quizz Color </label>
		</div>
	</div>
	<hr />
	{#each questions as question, questionIndex (questionIndex)}
		<div class="question">
			<div>
				<input
					bind:value={question.question}
					id={`question-${questionIndex}`}
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
			<hr />
			{#each question.responses as response, responseIndex (responseIndex)}
				<div class="response">
					<div>
						<input
							bind:value={response.text}
							id={`response-${questionIndex}-${responseIndex}`}
							type="text"
							class="form-control"
							required
						/>

						<div class="switch-field">
							<input
								type="radio"
								id={`radio-false-${responseIndex}`}
								name={`switch-${responseIndex}`}
								class="false"
								bind:group={response.isCorrect}
								value="0"
							/>
							<label for={`radio-false-${responseIndex}`}>False</label>
							<input
								type="radio"
								id={`radio-true-${responseIndex}`}
								class="true"
								name={`switch-${responseIndex}`}
								bind:group={response.isCorrect}
								value="1"
							/>
							<label for={`radio-true-${responseIndex}`}>True</label>
						</div>

						<button
							type="button"
							class="respons__remove remove"
							on:click={() => removeResponse(questionIndex, responseIndex)}
							><i class="fa fa-trash-o"></i></button
						>
					</div>
					<label for={`response-${questionIndex}-${responseIndex}`} class="form-label">
						Response {responseIndex + 1}
					</label>
				</div>
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
	<hr />
	<button type="submit" class="btn btn-primary">Create</button>
</form>
