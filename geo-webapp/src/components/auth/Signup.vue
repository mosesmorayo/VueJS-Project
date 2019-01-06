<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="username">username:</label>
        <input type="text" name="username" v-model="username">
      </div>
      <p class="red-text" v-if="feedback">{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-puple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup() {
        if(this.username && this.email && this.password) {
            this.slug = slugify(this.username, {
                replacement:  '-',
                remove: /[$*__+~.()'"!\-:@]/g,
                lower: true
            })
            let ref = db.collection('users').doc(this.slug)
            ref.get().then(doc => {
                if(doc.exists) {
                    this.feedback = "This username is alrady exists"
                } else {
                  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                  .then(cred => {
                    console.log(cred.user)
                    ref.set({
                      username: this.username,
                      geolocation: null,
                      user_id: cred.user.uid
                    })
                  }).then(() => {
                    this.$router.push({ name: 'GMap'})
                  })
                  .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                  })
                    this.feedback = "This username is free to use"
                }
            })
            console.log(this.slug)
        } else {
            this.feedback = "You must enter a username"
        }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
