# Dental Care - Dental Management System

A comprehensive web-based dental practice management system built with React, Redux Toolkit, and modern web technologies.

## 🚀 Features

- **Patient Management**: Complete patient registration, medical history, and records
- **Appointment Scheduling**: Calendar-based appointment booking and management
- **Inventory Management**: Track dental supplies and equipment
- **Odontogram**: Digital dental charting system
- **User Authentication**: Secure login with role-based access (Admin/User)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome, React Icons
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: SweetAlert2

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd DentalCare
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your API endpoints and configuration.

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts
- `npm run analyze` - Analyze bundle size

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (LoadingSpinner, etc.)
│   ├── Appoiments/     # Appointment-related components
│   ├── Inventory/      # Inventory management components
│   ├── LandingPage/    # Landing page components
│   ├── Odontograma/    # Dental charting components
│   ├── Pacients/       # Patient management components
│   └── PatientsDetails/ # Patient detail components
├── services/           # API services and utilities
├── store/              # Redux store and slices
│   └── features/       # Redux slices
├── utils/              # Utility functions and constants
├── views/              # Page components
└── assets/             # Static assets
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Error Boundaries**: Graceful error handling
- **Input Validation**: Form validation and sanitization
- **Secure Storage**: LocalStorage with proper token management
- **API Security**: Centralized API service with interceptors

## 🎨 UI/UX Improvements

- **Loading States**: Consistent loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Modern UI**: Clean, professional design

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting
- **Lazy Loading**: Component lazy loading
- **Memoization**: React.memo and useMemo optimizations
- **Bundle Analysis**: Bundle size monitoring
- **Caching**: API response caching

## 📝 API Integration

The application uses a centralized API service layer with:

- **Axios Interceptors**: Automatic token management
- **Error Handling**: Consistent error responses
- **Request/Response Logging**: Development debugging
- **Timeout Handling**: Network timeout management

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_ENDPOINT=https://your-api-endpoint.com/api
VITE_PATIENTS_URL=https://your-api-endpoint.com/api/pacientes
VITE_MEDICAL_HISTORY_URL=https://your-api-endpoint.com/api/historiales
VITE_APPOINTMETS_URL=https://your-api-endpoint.com/api/turnos
VITE_AVAILABLE_DAYS_URL=https://your-api-endpoint.com/api/dias-disponibles
```

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Error Boundaries**: Catch JavaScript errors
- **API Error Handling**: Consistent error responses
- **User Feedback**: Informative error messages
- **Logging**: Error logging for debugging

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive tablet layouts
- **Desktop Optimization**: Enhanced desktop experience
- **Touch Friendly**: Touch-optimized interactions

## 🔄 State Management

Redux Toolkit is used for state management with:

- **Centralized Store**: Single source of truth
- **Slice Pattern**: Organized state slices
- **Selectors**: Optimized state access
- **Async Actions**: Thunk-based async operations

## 🧪 Testing

To run tests (when implemented):

```bash
npm test
```

## 📦 Deployment

### Production Build

```bash
npm run build
```

### Vercel Deployment

The project includes `vercel.json` for easy deployment on Vercel.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team.

---

**Version**: 1.0.0
**Last Updated**: December 2024
