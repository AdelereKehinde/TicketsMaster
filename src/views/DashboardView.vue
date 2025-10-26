<template>
  <div class="dashboard">
    <div class="container">
      <h1 class="page-title">Dashboard</h1>
      
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total">📋</div>
          <div class="stat-info">
            <h3>Total Tickets</h3>
            <p class="stat-number">{{ ticketsStore.totalTickets }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon open">🟢</div>
          <div class="stat-info">
            <h3>Open</h3>
            <p class="stat-number">{{ ticketsStore.openTickets }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon progress">🟡</div>
          <div class="stat-info">
            <h3>In Progress</h3>
            <p class="stat-number">{{ ticketsStore.inProgressTickets }}</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon closed">⚫</div>
          <div class="stat-info">
            <h3>Closed</h3>
            <p class="stat-number">{{ ticketsStore.closedTickets }}</p>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <router-link to="/tickets" class="action-card">
            <div class="action-icon">🎫</div>
            <h3>View All Tickets</h3>
            <p>Browse and manage all support tickets</p>
          </router-link>
          
          <router-link to="/tickets?create=new" class="action-card">
            <div class="action-icon">➕</div>
            <h3>Create New Ticket</h3>
            <p>Add a new support ticket</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTicketsStore } from '../stores/tickets'

const ticketsStore = useTicketsStore()

onMounted(() => {
  // Initialize with some mock data
  if (ticketsStore.tickets.length === 0) {
    ticketsStore.addTicket({
      title: 'Website Login Issue',
      description: 'Users unable to login to the website',
      status: 'open',
      priority: 'high'
    })
    ticketsStore.addTicket({
      title: 'Mobile App Crash',
      description: 'App crashes on iOS when opening settings',
      status: 'in_progress',
      priority: 'high'
    })
    ticketsStore.addTicket({
      title: 'Feature Request - Dark Mode',
      description: 'Add dark mode support to the application',
      status: 'closed',
      priority: 'low'
    })
  }
})
</script>

<style scoped>
.dashboard {
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.total {
  background: #e0e7ff;
}

.stat-icon.open {
  background: #d1fae5;
}

.stat-icon.progress {
  background: #fef3c7;
}

.stat-icon.closed {
  background: #f3f4f6;
}

.stat-info h3 {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.stat-number {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.quick-actions h2 {
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.action-card p {
  margin: 0;
  color: #6b7280;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>