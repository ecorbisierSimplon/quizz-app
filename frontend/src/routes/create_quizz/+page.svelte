<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="QuizzOmnes" />
</svelte:head>

<section>
	<h1>Questionnaire</h1>

	<form class="quizz_add" method="POST" action="?save">
		<div id="quizz_add__question--create">
			<label for="quizz_add_title">
				Create quizz
				<input id="quizz_add__title" name="quizz_add__title" type="text" />
				<i class="fa fa-plus" title="Add question !"></i>
				<span class="error quizz_add__title"></span>
			</label>
		</div>
		<div id="quizz_add__question">
			<div id="quizz_add__question--add-1">
				<label for="quizz_add__title1">
					Quizz Title
					<input id="quizz_add__title1" name="quizz_add__title1" type="text" />
				</label>
				<label for="quizz_add__question1">
					Quizz question 1
					<input
						id="quizz_add__question1"
						name="quizz_add__question1"
						type="text"
						placeholder="Question ?"
					/>
				</label>
				<div>
					<label for="quizz_add__reponse1-2">
						Create question
						<select id="quizz_add__reponse1-1" name="quizz_add__reponse1-2">
							<option value="false">False</option>
							<option value="true">True</option>
						</select>
					</label>
					<label for="quizz_add__reponse1-2">
						Create question
						<select id="quizz_add__reponse1-2" name="quizz_add__reponse1-2">
							<option value="false">False</option>
							<option value="true">True</option>
						</select>
					</label>
				</div>
				<span class="error quizz_add__question"></span>
				<div id="quizz_add__response--plus">
					<i class="fa fa-plus" title="Add response!"></i>
				</div>
			</div>
		</div>
		<div id="quizz_add__question--plus">
			<i class="fa fa-plus" title="Add question !"></i>
		</div>
		<button>Create</button>
	</form>
</section>

<style>
</style>
