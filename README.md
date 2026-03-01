# Portfolio Admin Panel

A modern, responsive admin dashboard built with React and Vite to manage your portfolio content. This application allows you to easily create, edit, and delete portfolio entries including projects, skills, experience, and education.

## 🌟 Features

- **Authentication**: Secure login with JWT token-based authentication
- **Dashboard**: Overview with stats cards showing counts of projects, skills, experience, and education
- **Projects Management**: Create, view, and delete projects with tech stack tracking
- **Skills Management**: Manage your technical skills
- **Experience Management**: Track your professional experience
- **Education Management**: Manage your educational background
- **Responsive Design**: Beautiful dark theme with Tailwind CSS
- **Real-time Updates**: Data syncs with backend API in real-time
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js `>= 16.0.0`
- npm or yarn package manager
- Backend API running on `http://127.0.0.1:8080`

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd portfolio-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install -D @tailwindcss/postcss
   ```

## ⚙️ Configuration

### API Configuration
The API base URL is configured in `src/api/axios.js`:
```javascript
baseURL: 'http://127.0.0.1:8080/api/v1'
```

Update this if your backend runs on a different address.

### Environment Variables
Create a `.env.local` file in the root directory (optional):
```
VITE_API_URL=http://127.0.0.1:8080/api/v1
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── api/
│   └── axios.js              # API configuration with interceptors
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── ProtectedRoute.jsx    # Protected route wrapper
│   └── Modal.jsx             # Reusable modal component
├── context/
│   └── AuthContext.jsx       # Authentication context & provider
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Dashboard.jsx         # Dashboard with stats
│   ├── Projects.jsx          # Projects management
│   ├── Skills.jsx            # Skills management
│   ├── Experience.jsx        # Experience management
│   └── Education.jsx         # Education management
├── App.jsx                   # Main app component with routes
├── main.jsx                  # Entry point
└── index.css                 # Global styles with Tailwind
```

## 🔐 Authentication

### Login
- Navigate to `/login`
- Enter username and password
- On successful login, JWT token is stored in localStorage
- Token is automatically attached to all API requests via interceptors

### Protected Routes
- All dashboard routes require authentication
- Unauthorized users are redirected to `/login`
- ProtectedRoute component handles the protection logic

## 📡 API Endpoints

### Authentication
- `POST /api/v1/login` - Login with username and password
  - Request: `{ "username": "admin", "password": "password" }`
  - Response: `{ "token": "jwt_token_here" }`

### Projects
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project
- `DELETE /api/v1/projects/:id` - Delete project

### Skills
- `GET /api/v1/skills` - Get all skills
- `POST /api/v1/skills` - Create new skill
- `DELETE /api/v1/skills/:id` - Delete skill

### Experience
- `GET /api/v1/experience` - Get all experience entries
- `POST /api/v1/experience` - Create new experience
- `DELETE /api/v1/experience/:id` - Delete experience

### Education
- `GET /api/v1/education` - Get all education entries
- `POST /api/v1/education` - Create new education
- `DELETE /api/v1/education/:id` - Delete education

## 🎯 Usage Guide

### Dashboard
- View summary statistics of your portfolio content
- Click "New Project" to navigate to projects page
- Hover over tooltips to see "Coming soon" messages for future features
- Quick links provide shortcuts to common tasks (coming soon)

### Adding Content
1. Navigate to the desired section from sidebar (Projects, Skills, Experience, Education)
2. Click the "Add" button
3. Fill in the form with required information
4. Click "Save" to submit
5. Data will be automatically fetched and displayed

### Deleting Content
1. Find the item you want to delete
2. Click the trash icon on the right
3. Confirm the deletion
4. Item will be removed immediately

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Technologies

- **Vite**: Fast development server and build tool
- **Tailwind CSS v4**: Utility-first CSS framework
- **@tailwindcss/postcss**: New Tailwind CSS with engine
- **Axios**: Promise-based HTTP client
- **React Router**: Client-side routing
- **Lucide Icons**: Beautiful SVG icons

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://127.0.0.1:8080`
- Check that CORS is enabled on the backend
- Verify API base URL in `src/api/axios.js`

### Authentication Problems
- Clear browser localStorage if token is corrupted
- Check login credentials with backend
- Verify token format in Network tab (DevTools)

### Styling Not Loading
- Make sure Tailwind CSS is installed: `npm install -D @tailwindcss/postcss`
- Clear browser cache or hard refresh (Ctrl+Shift+R)
- Check that `src/index.css` has `@import "tailwindcss"`

## 📝 Notes

- The app uses JWT authentication via Bearer tokens
- All API responses follow the format: `{ "status": "success", "data": [...] }`
- MongoDB ObjectIds are handled properly with `_id.$oid` parsing
- Tokens are stored in localStorage and automatically included in request headers

## 🤝 Support

For issues or questions, please check:
1. Browser Developer Console for errors
2. Network tab to verify API calls
3. Backend logs for server-side errors
4. Ensure backend CORS configuration allows frontend origin

## 📄 License

This project is part of the Portfolio Site application.
