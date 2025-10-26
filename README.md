# TicketMaster - Vue.js Implementation

A robust ticket management web application built with Vue.js 3, featuring authentication, dashboard, and full CRUD operations for tickets.

## Features

- **Landing Page**: Hero section with wave background and decorative elements
- **Authentication**: Login/Signup with form validation
- **Dashboard**: Summary statistics and quick actions
- **Ticket Management**: Full CRUD operations with real-time validation
- **Responsive Design**: Mobile-first approach with consistent layout
- **Protected Routes**: Authentication-based navigation

## Tech Stack

- Vue.js 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Vite (Build Tool)
- CSS3 (Custom styles with responsive design)

## Project Structure
src/
├── components/ # Reusable components
├── views/ # Page components
├── stores/ # Pinia state management
├── router/ # Vue Router configuration
├── assets/ # Static assets
└── App.vue # Root component


## Setup and Installation

1. **Install dependencies**:
   ```bash
   npm install


2.  development server   
   npm run dev



Build for production:

bash
npm run build
Preview production build:

bash
npm run preview
State Management
The app uses Pinia for state management with two main stores:

Auth Store: Manages user authentication and session

Tickets Store: Handles ticket data and CRUD operations

Authentication
Uses localStorage for session persistence

Session key: ticketapp_session

Protected routes redirect to login if not authenticated

Ticket Validation
Title: Required field

Status: Required, must be one of: open, in_progress, closed

Real-time validation with inline error messages

Design Consistency
Max width: 1440px (centered layout)

Wave SVG background in hero section

Decorative circles throughout the design

Card-based components with shadows and rounded corners

Consistent color scheme and status indicators

Status Colors
open: Green

in_progress: Amber

closed: Gray

Accessibility
Semantic HTML structure

Proper ARIA labels

Keyboard navigation support

Focus states for interactive elements

Sufficient color contrast

Test Credentials
Any email and password combination will work for demo purposes.

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Known Issues
Mock authentication doesn't validate credentials

Data persists only in localStorage

No real backend integration

Switching Between Framework Versions
This is the Vue.js implementation. To switch to other frameworks:

React: Navigate to the React implementation directory

Twig: Navigate to the Twig/PHP implementation directory

Each implementation maintains the same design and functionality while using framework-specific patterns.

text

## Key Features Implemented

✅ **Landing Page** with wave background and decorative circles  
✅ **Authentication** with form validation and localStorage  
✅ **Dashboard** with statistics and navigation  
✅ **Ticket CRUD** with full validation  
✅ **Responsive Design** with 1440px max-width  
✅ **Protected Routes** and session management  
✅ **Error Handling** and user feedback  
✅ **Consistent Design** across all components  
✅ **Accessibility** features  
✅ **Complete Documentation**


