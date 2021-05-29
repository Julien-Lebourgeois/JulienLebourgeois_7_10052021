<template>
<div id="wrapper">
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <h2>username</h2>
        <p>email</p>
        <div class="form-row">
            <button class="button">
                Déconnexion
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {

        }
    },
    methods: {

    }
    
}
</script>

<style scoped>
#wrapper{
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
    height: 500px;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    padding: 1rem;
    background-color: whitesmoke;
}
</style>