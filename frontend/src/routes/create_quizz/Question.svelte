<script lang="ts">
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
		console.log({ quizzTitle, questions });
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
	<label for="quizzTitle" class="quizz__title form-label">
		Quizz Title
		<input bind:value={quizzTitle} id="quizzTitle" type="text" class="w3-input" required />
	</label>
	<hr />
	{#each questions as question, questionIndex (questionIndex)}
		<div class="question">
			<label for={`question-${questionIndex}`} class="form-label">
				Question {questionIndex + 1}
				<input
					bind:value={question.question}
					id={`question-${questionIndex}`}
					type="text"
					class="w3-input"
					required
				/>
			</label>
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
							type="text"
							class="w3-input"
							required
						/>

						<label for={`correct-${questionIndex}-${responseIndex}`} class="form-check-label">
							<div class="switch-field">
								<input
									type="radio"
									id={`radio-false-${responseIndex}`}
									name={`switch-${responseIndex}`}
									bind:group={response.isCorrect}
									value="0"
								/>
								<label for={`radio-false-${responseIndex}`}>False</label>
								<input
									type="radio"
									id={`radio-true-${responseIndex}`}
									name={`switch-${responseIndex}`}
									bind:group={response.isCorrect}
									value="1"
								/>
								<label for={`radio-true-${responseIndex}`}>True</label>
							</div>
						</label>
						<button
							type="button"
							on:click={() => removeResponse(questionIndex, responseIndex)}
							class="response__remove remove"><i class="fa fa-trash-o"></i></button
						>
					</div>
				</div>
			{/each}
			<button type="button" on:click={() => addResponse(questionIndex)} title="Add response !"
				><i class="fa fa-plus"></i></button
			>
			<button
				class="question__remove remove"
				type="button"
				on:click={() => removeQuestion(questionIndex)}><i class="fa fa-trash-o"></i></button
			>
		</div>
	{/each}
	<button type="button" on:click={addQuestion} title="Add question !"
		><i class="fa fa-plus"></i></button
	>
	<hr />
	<button type="submit" class="btn btn-primary">Create</button>
</form>

<style lang="scss">
	main {
		h1 {
			text-align: center;
			text-align: center;
			text-shadow: 0 0 4px hsl(231deg 100% 96.56%);
			color: black;
			font-weight: bold;
		}
	}
	form {
		max-width: 80%;
		display: block;
		margin: 0 auto;
		.quizz__title {
			margin-bottom: 50px;
		}
		input {
			margin-bottom: 14px;
			border-bottom: 2px solid hsl(231, 100%, 12%);
			border-radius: 5px;
			background-color: rgb(161, 160, 160);
			color: black;
			font-weight: bold;
			&:focus-visible {
				box-shadow: inset 1px 1px 1px hsl(0, 0%, 7%) 858;
				background-color: hsl(231, 80%, 80%);
			}
		}
		button {
			&.remove {
				background-color: #950000;
				padding: 5px 10px;
				border-radius: 10px;
				font-size: 18px;
			}
			.fa {
				margin-right: 0;
			}
		}
		.question {
			position: relative;
			border: 1px solid hsl(230.63deg 65.96% 68.05%);
			box-shadow: 3px 2px 3px hsl(231deg 44.16% 65.01%);
			background: #7f7f7f4d;
			padding: 15px;
			margin-bottom: 20px;
			&__remove {
				position: absolute;
				right: 0px;
				bottom: -42px;
			}
		}
		.response {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			flex-wrap: nowrap;

			& > div {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				flex-wrap: wrap;
				justify-content: flex-end;
				*:not(.switch-field label):not(.fa) {
					margin-right: 5px;
				}
			}
		}
	}
</style>
