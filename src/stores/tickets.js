import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref([])
  
  // Computed properties for dashboard stats
  const totalTickets = computed(() => tickets.value.length)
  const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
  const inProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
  const closedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)
  
  function addTicket(ticket) {
    const newTicket = {
      id: Date.now(),
      ...ticket,
      createdAt: new Date().toISOString()
    }
    tickets.value.push(newTicket)
  }
  
  function updateTicket(id, updates) {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tickets.value[index] = { ...tickets.value[index], ...updates }
    }
  }
  
  function deleteTicket(id) {
    tickets.value = tickets.value.filter(t => t.id !== id)
  }
  
  function getTicketById(id) {
    return tickets.value.find(t => t.id === id)
  }
  
  return {
    tickets,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById
  }
})