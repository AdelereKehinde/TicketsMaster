<template>
  <div class="auth">
    <div class="auth-container">
      <div class="auth-card">
        <h2>{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="auth-form">
          <div v-if="!isLogin" class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              :class="{ 'error': errors.name }"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="{ 'error': errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              :class="{ 'error': errors.password }"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>
          
          <button type="submit" class="btn btn-primary auth-btn" :disabled="loading">
            {{ loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up') }}
          </button>
        </form>
        
        <p class="auth-switch">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleMode">
            {{ isLogin ? 'Sign up' : 'Login' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // Reset form and errors
  Object.keys(form).forEach(key => form[key] = '')
  Object.keys(errors).forEach(key => errors[key] = '')
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!isLogin.value && !form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    let success = false
    
    if (isLogin.value) {
      success = authStore.login({
        email: form.email,
        password: form.password
      })
    } else {
      success = authStore.signup({
        name: form.name,
        email: form.email,
        password: form.password
      })
    }
    
    if (success) {
      router.push('/dashboard')
    } else {
      // Show error (in real app, this would come from API)
      alert('Authentication failed. Please check your credentials.')
    }
  } catch (error) {
    alert('An error occurred. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
  font-size: 1.875rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.auth-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
}

.auth-switch {
  text-align: center;
  color: #6b7280;
}

.auth-switch a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.auth-switch a:hover {
  text-decoration: underline;
}
</style>