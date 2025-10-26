<template>
  <div class="tickets">
    <div class="container">
      <div class="tickets-header">
        <h1 class="page-title">Ticket Management</h1>
        <button @click="showCreateForm = true" class="btn btn-primary">
          Create New Ticket
        </button>
      </div>

      <!-- Tickets List -->
      <div class="tickets-list">
        <div v-for="ticket in ticketsStore.tickets" :key="ticket.id" class="ticket-card">
          <div class="ticket-header">
            <h3 class="ticket-title">{{ ticket.title }}</h3>
            <span :class="['status-badge', ticket.status]">
              {{ formatStatus(ticket.status) }}
            </span>
          </div>
          
          <p class="ticket-description">{{ ticket.description }}</p>
          
          <div class="ticket-meta">
            <span class="ticket-priority">Priority: {{ ticket.priority || 'Normal' }}</span>
            <span class="ticket-date">{{ formatDate(ticket.createdAt) }}</span>
          </div>
          
          <div class="ticket-actions">
            <button @click="editTicket(ticket)" class="btn btn-outline">Edit</button>
            <button @click="confirmDelete(ticket)" class="btn btn-danger">Delete</button>
          </div>
        </div>
        
        <div v-if="ticketsStore.tickets.length === 0" class="empty-state">
          <p>No tickets found. Create your first ticket!</p>
        </div>
      </div>

      <!-- Create/Edit Ticket Modal -->
      <div v-if="showCreateForm || editingTicket" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
          
          <form @submit.prevent="handleTicketSubmit" class="ticket-form">
            <div class="form-group">
              <label for="title">Title *</label>
              <input
                id="title"
                v-model="ticketForm.title"
                type="text"
                required
                :class="{ 'error': formErrors.title }"
              />
              <span v-if="formErrors.title" class="error-message">{{ formErrors.title }}</span>
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="ticketForm.description"
                rows="4"
                :class="{ 'error': formErrors.description }"
              ></textarea>
              <span v-if="formErrors.description" class="error-message">{{ formErrors.description }}</span>
            </div>
            
            <div class="form-group">
              <label for="status">Status *</label>
              <select
                id="status"
                v-model="ticketForm.status"
                required
                :class="{ 'error': formErrors.status }"
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <span v-if="formErrors.status" class="error-message">{{ formErrors.status }}</span>
            </div>
            
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" v-model="ticketForm.priority">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn btn-outline">Cancel</button>
              <button type="submit" class="btn btn-primary">
                {{ editingTicket ? 'Update' : 'Create' }} Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDelete">
        <div class="modal-content" @click.stop>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <div class="form-actions">
            <button @click="cancelDelete" class="btn btn-outline">Cancel</button>
            <button @click="confirmDeleteAction" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useTicketsStore } from '../stores/tickets'

const ticketsStore = useTicketsStore()

const showCreateForm = ref(false)
const editingTicket = ref(null)
const showDeleteConfirm = ref(false)
const ticketToDelete = ref(null)

const ticketForm = reactive({
  title: '',
  description: '',
  status: '',
  priority: 'normal'
})

const formErrors = reactive({
  title: '',
  description: '',
  status: ''
})

const validateTicketForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(formErrors).forEach(key => formErrors[key] = '')
  
  if (!ticketForm.title.trim()) {
    formErrors.title = 'Title is required'
    isValid = false
  }
  
  if (!ticketForm.status) {
    formErrors.status = 'Status is required'
    isValid = false
  } else if (!['open', 'in_progress', 'closed'].includes(ticketForm.status)) {
    formErrors.status = 'Status must be open, in_progress, or closed'
    isValid = false
  }
  
  return isValid
}

const resetForm = () => {
  ticketForm.title = ''
  ticketForm.description = ''
  ticketForm.status = ''
  ticketForm.priority = 'normal'
  Object.keys(formErrors).forEach(key => formErrors[key] = '')
}

const closeModal = () => {
  showCreateForm.value = false
  editingTicket.value = null
  resetForm()
}

const handleTicketSubmit = () => {
  if (!validateTicketForm()) return
  
  if (editingTicket.value) {
    ticketsStore.updateTicket(editingTicket.value.id, { ...ticketForm })
  } else {
    ticketsStore.addTicket({ ...ticketForm })
  }
  
  closeModal()
}

const editTicket = (ticket) => {
  editingTicket.value = ticket
  ticketForm.title = ticket.title
  ticketForm.description = ticket.description || ''
  ticketForm.status = ticket.status
  ticketForm.priority = ticket.priority || 'normal'
}

const confirmDelete = (ticket) => {
  ticketToDelete.value = ticket
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  ticketToDelete.value = null
}

const confirmDeleteAction = () => {
  if (ticketToDelete.value) {
    ticketsStore.deleteTicket(ticketToDelete.value.id)
  }
  cancelDelete()
}

const formatStatus = (status) => {
  const statusMap = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  // Check URL for create parameter
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('create') === 'new') {
    showCreateForm.value = true
  }
})
</script>

<style scoped>
.tickets {
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  margin: 0;
  color: #1f2937;
}

.tickets-list {
  display: grid;
  gap: 1.5rem;
}

.ticket-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3b82f6;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ticket-title {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.open {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.closed {
  background: #f3f4f6;
  color: #374151;
}

.ticket-description {
  margin: 0 0 1rem 0;
  color: #6b7280;
  line-height: 1.5;
}

.ticket-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-outline {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error,
.form-group textarea.error,
.form-group select.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .tickets-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .ticket-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .ticket-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>