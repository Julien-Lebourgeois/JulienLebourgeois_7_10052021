<template>
  <div id="wrapper">
        <div class="card">
            
        </div>
    </div>
</template>

<script>
export default {
  
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
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 70%;
    height: 90%;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    padding: 1rem;
    background-color: whitesmoke;
}
</style>
