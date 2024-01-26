<script>
  // Importer le module fetch pour faire des requêtes HTTP
  import { fetch } from 'sveltejs/fetch';

  // Définir les variables pour stocker les données du formulaire
  let surName = '';
  let firstName = '';
  let email = '';
  let password = '';

  // Définir une variable pour afficher les messages d'erreur ou de succès
  let message = '';

  // Définir une fonction pour envoyer les données à l'API
  async function register() {
    // Créer un objet avec les données du formulaire
    const user = { surName, firstName, email, password };

    // Faire une requête POST à l'endpoint /user/register de l'API
    // Ici, tu dois remplacer /user/register par l'URL complète de ton API
    // Par exemple, si ton API est sur http://localhost:3000, tu dois écrire
    // const response = await fetch('http://localhost:3000/user/register', {...})
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // Vérifier le statut de la réponse
    if (response.ok) {
      // Si la réponse est OK, afficher un message de succès
      message = 'Tu es bien enregistré !';
    } else {
      // Sinon, afficher un message d'erreur
      message = 'Une erreur est survenue : ' + response.statusText;
    }
  }
</script>

<!-- Créer un formulaire avec des champs pour saisir les données -->
<form on:submit|preventDefault={register}>
  <label for="surName">Nom</label>
  <input type="text" id="surName" bind:value={surName} required />

  <label for="firstName">Prénom</label>
  <input type="text" id="firstName" bind:value={firstName} required />

  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required />

  <label for="password">Mot de passe</label>
  <input type="password" id="password" bind:value={password} required />

  <!-- Afficher le message d'erreur ou de succès -->
  <p>{message}</p>

  <!-- Créer un bouton pour soumettre le formulaire -->
  <button type="submit">S'inscrire</button>
</form>