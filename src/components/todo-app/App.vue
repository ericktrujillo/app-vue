<template>
  <div id="app">
    <Todos/>
    <footer class="info">
      <p>Based on a project written by <a href="http://evanyou.me">Evan You</a></p>
      <p>Original Vue TodoApp project is <a href="https://vuejs.org/v2/examples/todomvc.html">here</a></p>
      <p>Modified for this tutorial by Andrew Hughes</p>
    </footer>
  </div>
</template>

<script>
import Todos from './Todos'

// app Vue instance
const app = {
  name: 'app',
  components: {
    Todos
  },
  // app initial state
  data: () => {
    return {
      activeUser : null
    }
  },

  async created(){
    await this.refreshActiveUser();
  },

  watch :{
    '$route' : 'refresActiveUser'
  },

  methods : {
    async refreshActiveUser(){
      this.activeUser = await this.$auth.getUser();
      this.$log.debug('activeUser',this.activeUser)
    },

    async handleLogout(){
      await this.$auth.logout();
      await this.refreshActiveUser();
      this.$router.go('/');
    }
  }

}

export default app
</script>

<style>
  [v-cloak] { display: none; }
</style>
