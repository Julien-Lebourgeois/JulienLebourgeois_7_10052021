<template>
  <div id="wrapper">
        <div class="card">
            <h1>Fil d'actualité</h1>
            <div id="link">
                <router-link  to="/postmessage">Quelque chose à partager ?</router-link>
            </div>
            <div v-for="message in messages" :key="message.messageId" id="fil">
                <h2 id="title">{{ message.title }}</h2>
                <span id="picture">{{ message.attachment }}</span>
                <span id="description">{{ message.content}}</span>
                <div>
                    <p>{{ message.User.username }} le {{ formatDate(message.createdAt) }}</p>
                    <i v-if="user.isAdmin == 1 || user.id == message.userId" @click="deleteMessage()" class="fas fa-trash"></i>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            messages: [],
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: ''
            },            
        }
    },

    methods: {
        getAllMessages: function() {
            const token = {headers: {authorization: localStorage.token}};
            axios.get('http://localhost:3000/api/message/messages', token)
            .then(response => {
                this.messages = response.data.messages;
                console.log(response.data.messages);
            })
            .catch(error => {
                console.log(error);
            })
        },

        getInfosUser: function() {
            const token = {headers: {authorization: localStorage.token}};
            axios.get('http://localhost:3000/api/user/myprofile', token)
            .then(response => {
                let userInfos = response.data
                this.user.username = userInfos.username;
                this.user.email = userInfos.email;
                this.user.isAdmin = userInfos.isAdmin;
                this.user.id = userInfos.id;
                console.log(userInfos);
            })
            .catch(error => {
            console.log(error);
            })
        },

        deleteMessage: function(){
            const token = {headers: {authorization: localStorage.token}};
            const idMessage = this.messages[0].id;
            axios.delete(`http://localhost:3000/api/message/${idMessage}`, token)
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.log(error);
            })
        },

        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toLocaleDateString();
        },
    },

    mounted() {
        this.getAllMessages();
        this.getInfosUser();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: auto;
}
#link {
    width: 50%;
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
    a{
        text-decoration: none;
        color: whitesmoke;
    }
}
.card {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    margin: 10px;
    width: 70%;
    height: 90%;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    padding: 1rem;
    background-color: whitesmoke;
    #fil {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin-top: 20px;
        width: 40%;
        height: fit-content;
        box-shadow: 10px 10px 30px black;
        border-radius: 2rem;
        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 80%;
            p {
                font-size: 14px;
            }
            i {
                color: rgb(207, 8, 8);
                cursor: pointer;
            }
        }
    }
}
</style>
