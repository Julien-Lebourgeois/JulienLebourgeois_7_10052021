<template>
  <div class="message">
    <Message/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Message.vue'

export default {
  name: 'MessagePage',
  components: {
    Home
  }
}
</script>