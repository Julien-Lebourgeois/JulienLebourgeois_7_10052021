<template>
<div id="wrapper">
    <div class="card">
        <img id="logo" src="../Images/icon-above-font.png" alt="Logo">
        <h1 class="card__title">Espace Perso</h1>
        <h2>{{user.username}}</h2>
        <h4 v-if="user.isAdmin == 1">Administrateur</h4>
        <h4 v-else>Utilisateur</h4>
        <p>{{user.email}}</p>
        <button @click="deleteAccount()" type="submit">Supprimer mon compte</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    data() {
        return {
            user: {
                username: '',
                email: '',
                isAdmin: ''
            }
        }
    },
    
    methods: {
        deleteAccount: function() {
            this.$store.dispatch('deleteAccount')
            .then(() => this.$router.push('/connexion'))
            .catch(err => console.log(err))
        }
    },

    mounted: function() {
        const token = {headers: {authorization: localStorage.token}};
        axios.get('http://localhost:3000/api/user/myprofile', token)
        .then(response => {
            let userInfos = response.data
            this.user.username = userInfos.username;
            this.user.email = userInfos.email;
            this.user.isAdmin = userInfos.isAdmin;
            console.log(userInfos);
        })
        .catch(error => {
            console.log(error);
        })
        
    }
}
</script>

<style lang="scss" scoped>
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
    margin: 10px;
    width: 300px;
    height: 500px;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    padding: 1rem;
    background-color: whitesmoke;
    p {
        text-decoration: underline;
    }
    button{
        background: linear-gradient(0deg, rgba(253,78,0,1) 22%, rgba(255,106,0,1) 100%);
        font-weight: bold;
        border: none;
        padding: 8px;
        margin: 10px 0px;
        border-radius: 50px;
        box-shadow: 5px 5px 15px black;
        transition: 0.4s ease-out;
        &:hover{
            background: linear-gradient(0deg, rgba(253,78,0,1) 22%, rgba(255,106,0,1) 100%);
            cursor: pointer;
            transform: scale(1.1);
        }
    }
}

#logo {
    height: auto;
    width: 60%;
    border-radius: 50%;
}
</style>