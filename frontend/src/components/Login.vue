<template>
<div id="wrapper">
    <div class="card">
        <img id="logo" src="../Images/icon-above-font.png" alt="Logo">
        <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="card__title" v-else>Inscription</h1>
        <div class="form-row">
            <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail..."/>
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="username" class="form-row__input" type="text" placeholder="Nom d'utilisateur..."/>
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe..."/>
        </div>
        <div class="form-row">
            <button @click="login()" class="button" v-if="mode == 'login'">
                <span>Connexion</span>
            </button>
            <button @click="register()" class="button" v-else>
                <span>Créer mon compte</span>
            </button>
        </div>
        <p class="card_subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Tu as déjà un compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
  </div>
</div>
</template>

<script>
//import axios from 'axios';
//import router from '../router/index';

export default {
    name:'Login',
    data() {
        return {
            mode: 'login',
            email: '',
            username: '',
            password: '',
            error: null,
            success: false
        }
    },
    
    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login';
        },
        login: function () {
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', {email, password})
            .then(() => this.$router.push('/myprofile'))
            .catch(err => console.log(err))
        },
        register: function () {
            let data = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('register', data)
            .then(() => location.reload())
            .catch(err => console.log(err))
        }
    }
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

#logo {
    height: auto;
    width: 60%;
    border-radius: 50%;
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

.card_subtitle {
    font-size: 80%;
}

.card_action{
    color: #0523c9;
    text-decoration : underline;
    cursor: pointer;
    font-size: 70%;
}

.button {
  background-color: #fd4e00;
  color: white;
  padding: 12px 20px;
  margin-top: 0.8rem;
  cursor: pointer;
  border-radius:30px;
  border: none;
  text-align: center;
}

.button:hover {
  background-color: #efa574;
}

.form-row__input {
  width: 90%;
  margin: 5px;
  border: none;
  padding:10px;
  border-radius:30px;
  outline: none;
  background-color: lightgrey;
  text-align: center;
}

</style>>