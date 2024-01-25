<script lang="ts">
	import Question from './Question.svelte';
	import { backgroundColor, calculateBackgroundColor, quizzTitleColor } from './question';
	$: $backgroundColor = calculateBackgroundColor($quizzTitleColor);
</script>

<svelte:head>
	<title>QuizzOmnes | Create</title>
	<meta name="description" content="QuizzOmnes" />
</svelte:head>
<div class="main__title cloud-background">
	<h1
		class="h1_title"
		style="background-color: {$backgroundColor};
	box-shadow: 0 0 10px 9px {$backgroundColor};
	"
	>
		Quizz Create
	</h1>
</div>
<Question />
