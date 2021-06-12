<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="isLoggedIn" to="/homepage"><img src="./Images/icon-left-font-monochrome-black.png" alt="logoGroupomania"></router-link> 
      <router-link v-if="isLoggedOut" to="/"><img src="./Images/icon-left-font-monochrome-black.png" alt="logoGroupomania"></router-link> 
      <div id="link">
        <router-link v-if="isLoggedIn" to="/myprofile">Profile</router-link> 
        <span v-if="isLoggedIn"> <a id="logout" @click="logout()">Logout</a></span>
      </div>
      
    </div>
    <router-view/>
  </div>
</template>


<script>
export default {
  computed: {
    isLoggedIn: function(){
      return this.$store.getters.isLoggedIn
    },
    isLoggedOut: function(){
      return this.$store.getters.isLoggedOut
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/')
      })
    },
    checkToken: function() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$router.push('/homepage')
      }
      else {
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.checkToken();
  }
}
</script>


<style lang="scss">
body {
  margin: 0px;
  padding: 0px;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('Images/Login.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
#nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    padding: 0px 40px;
    box-shadow: 10px 10px 50px black;
    background-color: whitesmoke;
    img {
      width: 30%;
      height: auto;
    }
    #logout {
      cursor: pointer;
      margin-left: 20px;
    }
    a {
      font-weight: bold;
      color: #fd4e00;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
}
</style>
