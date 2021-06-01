<template>
    <div id="wrapper">
        <div class="card">
            <h2>Votre compte a été créé avec succès</h2>
            <p>Pour vous connecter, merci de vous rendre ici ! <router-link to="/connexion" id="link">connexion</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Confirmation'
}
</script>

<style scoped>
#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: auto;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    padding: 1rem;
    background-color: whitesmoke;
}

#link {
    text-decoration: none;
    color: #fd4e00;
}
</style>