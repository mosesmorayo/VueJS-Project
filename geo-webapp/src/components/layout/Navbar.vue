<template>
  <div class="navbar">
    <nav class="deep-puple darken-1">
      <div class="container">
        <router-link :to="{ name: 'GMap'}" class="brand-logo left">MosesGeo!</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user"><a>{{ user.email }}</a></li>
          <li v-if="user"><a @click="signout">signout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    signout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login'} )
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
};
</script>

<style>

</style>

