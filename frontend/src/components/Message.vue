<template>
  <div id="wrapper">
            <form>
                <h2>Envie d'ajouter quelque chose {{ user.username }} ?</h2>
                <label for="title">Titre :</label>
                <input 
                v-model="title" 
                id="title" 
                type="text" 
                name="title">
                <label for="content">Exprimez vous :</label>
                <input 
                v-model="content" 
                id="content" 
                type="text" 
                name="content">
                <label for="attachment">Ajouter une image</label>
                <input 
                id="attachment" 
                type="file" 
                name="attachment" 
                accept="image/png, image/jpeg,
                image/bmp, image/gif" 
                @change="processFile($event)">
                <button @click.prevent="postMessage()" type="submit">Poster</button>
            </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Message',
    data() {
        return {
            title: '',
            content: '',
            attachment: '',
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: ''
            },
            messages: []
        }
    },

    methods: {
        processFile(event) {
            this.attachment = event.target.files[0]
        },
        

        postMessage: function() {
            let data = {
                title: this.title,
                content: this.content,
                attachment: this.attachment
            }
            console.log(data);
            const token = {headers: {authorization: localStorage.token}};
            axios.post('http://localhost:3000/api/message/add', data, token)
            .then(() => this.$router.push('/'))
            .catch(error => {
                console.log(error);
            })
        },
    },

    mounted: function() {
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

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 50%;
    height: fit-content;
    box-shadow: 10px 10px 30px black;
    border-radius: 2rem;
    background-color: whitesmoke;
    input {
        padding: 5px;
        border: none;
        outline: none;
        border-radius: 2rem;
        margin-bottom: 10px;
        
    }
    label {
        margin-bottom: 10px;
        font-weight: bold;
        text-decoration: underline;
    }
    button {
        width: 20%;
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
    #content {
        width: 90%;
        height: 5rem;
        resize: none;
    }
}

</style>
