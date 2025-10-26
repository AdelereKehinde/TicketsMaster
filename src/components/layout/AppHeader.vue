<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <h1>TicketMaster</h1>
      </div>
      <nav class="nav">
        <router-link to="/" v-if="$route.path !== '/'">Home</router-link>
        <router-link to="/auth" v-if="!isAuthenticated && $route.path !== '/auth'">Login</router-link>
        <router-link to="/dashboard" v-if="isAuthenticated && $route.path !== '/dashboard'">Dashboard</router-link>
        <router-link to="/tickets" v-if="isAuthenticated && $route.path !== '/tickets'">Tickets</router-link>
        <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.app-header .container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo h1 {
  color: #3b82f6;
  margin: 0;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: #3b82f6;
}

.nav a.router-link-active {
  color: #3b82f6;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>