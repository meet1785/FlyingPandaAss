# ✈️ The Flying Panda - Visa Slot Alert Tracker

<p align="center">
  <img src="https://theflyingpanda.io/LogoIconColoured.png" alt="The Flying Panda Logo" width="80" />
</p>

A mini internal tool for tracking visa slot alerts built for [The Flying Panda](https://theflyingpanda.io/). Built with Node.js/Express backend and React frontend.

## 📁 Project Structure

```
FlyingPandaAss/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   └── alertController.js
│   │   ├── data/               # Data layer
│   │   │   └── alertStore.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── validator.js
│   │   ├── routes/             # API routes
│   │   │   └── alertRoutes.js
│   │   ├── app.js              # Express app config
│   │   └── server.js           # Server entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/                   # React (Vite) App
│   ├── src/
│   │   ├── api/                # API service layer
│   │   │   └── alertApi.js
│   │   ├── components/         # React components
│   │   │   ├── AlertForm.jsx
│   │   │   └── AlertTable.jsx
│   │   ├── App.jsx             # Main app component
│   │   ├── index.css           # Styles
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🚀 Setup Steps

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server (development mode with auto-reload)
npm run dev

# Or start normally
npm start
```

The API will be running at `http://localhost:3001`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

### Quick Start (Both)

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend && npm install && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm install && npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/alerts` | Get all alerts |
| GET | `/alerts?country=USA` | Filter by country |
| GET | `/alerts?status=Active` | Filter by status |
| GET | `/alerts?country=USA&status=Active` | Combined filters |
| POST | `/alerts` | Create a new alert |
| PUT | `/alerts/:id` | Update an alert |
| DELETE | `/alerts/:id` | Delete an alert |

### Data Model

```json
{
  "id": "uuid-string",
  "country": "USA",
  "city": "New Delhi",
  "visaType": "Tourist | Business | Student",
  "status": "Active | Booked | Expired",
  "createdAt": "2026-01-28T10:00:00.000Z"
}
```

### Example Requests

**Create Alert:**
```bash
curl -X POST http://localhost:3001/alerts \
  -H "Content-Type: application/json" \
  -d '{"country": "USA", "city": "New Delhi", "visaType": "Tourist"}'
```

**Update Status:**
```bash
curl -X PUT http://localhost:3001/alerts/{id} \
  -H "Content-Type: application/json" \
  -d '{"status": "Booked"}'
```

**Delete Alert:**
```bash
curl -X DELETE http://localhost:3001/alerts/{id}
```

## 🎯 Design Decisions

### Backend Architecture

1. **In-Memory Data Storage**
   - Chose in-memory storage for simplicity and fast development
   - Data persists during server runtime
   - Seeded with sample data for immediate testing
   - Easy to swap out for MongoDB/PostgreSQL later

2. **MVC-like Structure**
   - Separated concerns: routes → controllers → data layer
   - Makes code testable and maintainable
   - Controllers handle business logic, routes handle HTTP

3. **Custom Middleware**
   - **Logger**: Logs all requests with timestamp, method, URL, response time, and color-coded status
   - **Validator**: Validates input data with clear error messages
   - Both demonstrate middleware patterns without overcomplicating

4. **Centralized Error Handling**
   - Single error handler catches all errors
   - Consistent error response format
   - Shows stack trace in development mode only

5. **Query Filters**
   - Simple query parameter filtering (country, status)
   - Case-insensitive matching
   - Easily extensible for more filters

### Frontend Architecture

1. **Vite + React**
   - Fast development experience with HMR
   - Modern build tooling
   - Simple configuration

2. **Component Structure**
   - `AlertForm`: Controlled form component for creating alerts
   - `AlertTable`: Displays alerts with actions and filters
   - `App`: State management and API orchestration

3. **API Layer**
   - Dedicated `alertApi.js` service
   - Centralized error handling
   - Easy to mock for testing

4. **UX Considerations**
   - Loading states for async operations
   - Success/error notifications
   - Confirmation dialog for delete
   - Responsive grid layout

## 🔧 What I'd Improve for Production

### Backend Improvements

1. **Database Integration**
   - Use PostgreSQL or MongoDB for persistent storage
   - Add connection pooling and proper indexing
   - Implement database migrations

2. **Authentication & Authorization**
   - Add JWT-based authentication
   - Role-based access control (admin, viewer)
   - Rate limiting per user

3. **Input Validation**
   - Use a validation library like Joi or Zod
   - Sanitize inputs to prevent injection attacks
   - Add request body size limits

4. **API Enhancements**
   - Add pagination for large datasets
   - Implement sorting options
   - Add full-text search capability
   - Versioned API endpoints (v1/alerts)

5. **Observability**
   - Structured logging (Winston, Pino)
   - Request tracing with correlation IDs
   - Health checks and metrics endpoint
   - Error tracking (Sentry)

6. **Testing**
   - Unit tests for controllers and middleware
   - Integration tests for API endpoints
   - Load testing

### Frontend Improvements

1. **State Management**
   - Use React Query for server state caching
   - Optimistic updates for better UX
   - Proper loading skeletons

2. **Form Handling**
   - Use React Hook Form for complex forms
   - Client-side validation with error messages
   - Debounced input validation

3. **UI/UX**
   - Accessibility improvements (ARIA labels)
   - Dark mode support
   - Toast notifications library
   - Infinite scroll or pagination

4. **Performance**
   - Component code splitting
   - Image optimization
   - Service worker for offline support

5. **Testing**
   - Component unit tests (Jest + Testing Library)
   - E2E tests (Playwright)

### DevOps & Deployment

1. **Containerization**
   - Dockerfiles for both services
   - Docker Compose for local development
   - Multi-stage builds for smaller images

2. **CI/CD Pipeline**
   - Automated testing on PR
   - Linting and type checking
   - Automated deployments

3. **Infrastructure**
   - Deploy to cloud (AWS, Vercel, Railway)
   - Environment-based configurations
   - SSL/TLS certificates
   - CDN for static assets

## 🤖 Where AI Helped vs Where I Had to Think

### Where AI Helped

1. **Boilerplate Code**
   - Express server setup and middleware configuration
   - React component structure and styling
   - API service layer implementation

2. **Code Patterns**
   - Standard CRUD operation implementations
   - Error handling middleware patterns
   - Form validation logic

3. **CSS Styling**
   - Modern gradient backgrounds
   - Status badge styling
   - Responsive grid layout

4. **Documentation**
   - README structure and formatting
   - API documentation with examples
   - Code comments

### Where I Had to Think

1. **Architecture Decisions**
   - Choosing between file-based vs in-memory storage
   - Deciding on the folder structure
   - How to organize middleware

2. **Data Model Design**
   - What fields are required vs optional
   - Status transition logic
   - What filters make sense

3. **UX Flow**
   - How status updates should work (cycle through states)
   - When to show loading states
   - Error message presentation

4. **Edge Cases**
   - Handling concurrent updates
   - What happens when filters return no results
   - Form reset after successful submission

5. **Trade-offs**
   - Simplicity vs feature completeness
   - What to include vs what to defer to "production improvements"
   - How much validation is enough for an assessment

## 📝 Bonus Features Implemented

- ✅ **Input Validation**: Both client-side required fields and server-side validation middleware
- ✅ **Environment Variables**: PORT and NODE_ENV configurable via .env
- ✅ **Query Filters**: Filter alerts by country and/or status
- ✅ **Responsive Design**: Works on mobile and desktop

## 📜 License

MIT - Feel free to use this code!