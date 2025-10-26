<template>
  <div class="auth">
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p>No account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store.js";

const email = ref("");
const password = ref("");

function login() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser && savedUser.email === email.value) {
    store.login(savedUser);
    window.location.href = "/admin";
  } else {
    alert("Invalid credentials");
  }
}
</script>

<style scoped>
.auth {
  text-align: center;
  padding: 40px;
}
input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #f87171;
  border-radius: 5px;
}
button {
  background: #f87171;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
