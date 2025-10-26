<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>TicketMaster</h3>
          <p>Streamlining your support ticket management</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/tickets">Tickets</router-link>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>support@ticketmaster.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 TicketMaster. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  background: #1f2937;
  color: white;
  margin-top: auto;
}

.app-footer .container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #3b82f6;
}

.footer-section a {
  display: block;
  color: #d1d5db;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #3b82f6;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
}
</style>