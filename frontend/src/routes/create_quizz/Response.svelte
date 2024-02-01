<div class="response">
	<label for={`response-${responseIndex}`} class="form-label">
		Response {responseIndex + 1}
	</label>
	<div>
		<input
			bind:value={response.text}
			id={`response-${responseIndex}`}
			name={`response-${responseIndex}`}
			type="text"
			class="form-control"
			required
		/>
	</div>
	<div>
		<label for={`radio-false-${responseIndex}`} class="form-label"></label>
		<input
			type="checked"
			id={`radio-${responseIndex}`}
			name={`radio-${responseIndex}`}
			class="false"
			bind:group={response.isCorrect}
			value="0"
		/>
	</div>
</div>
