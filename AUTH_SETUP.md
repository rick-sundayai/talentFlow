# TalentFlow Frontend Authentication Setup

Complete authentication system integration for the TalentFlow recruiting and sales management platform.

## 🚀 Quick Start

### 1. Environment Configuration
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

Required environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000  # Your auth-system backend URL
NODE_ENV=development
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

## 🏗️ Architecture Overview

### Route Structure
```
/auth/login                    # Sign in page
/auth/register                 # Sign up page  
/auth/forgot-password          # Password reset request
/auth/reset-password/[token]   # Password reset form
/auth/verify-email/[token]     # Email verification
/dashboard                     # Protected dashboard (existing functionality)
```

### Authentication Flow
1. **Unauthenticated users** → Redirected to `/auth/login`
2. **Successful login** → Redirected to `/dashboard`
3. **Registration** → Email verification required
4. **Dashboard access** → Protected by middleware

## 🔐 Authentication Features

### Complete Authentication System
- ✅ User registration with email verification
- ✅ Secure login with JWT tokens + HTTP-only cookies
- ✅ Password reset flow via email
- ✅ Real-time password strength indicator
- ✅ Form validation with inline errors
- ✅ Auto-redirects based on auth state
- ✅ Route protection middleware
- ✅ Session management
- ✅ Logout functionality

### UI/UX Features
- ✅ Dark/light mode support (inherited from dashboard)
- ✅ Responsive design (mobile-friendly)
- ✅ Loading states and error handling
- ✅ Success/error alerts
- ✅ Progressive form validation
- ✅ Email verification status indicator

## 📁 File Structure

### New Authentication Files
```
app/
├── auth/                      # Authentication pages
│   ├── login/page.tsx         # Login page
│   ├── register/page.tsx      # Registration page
│   ├── forgot-password/page.tsx # Password reset request
│   ├── reset-password/[token]/page.tsx # Password reset
│   ├── verify-email/[token]/page.tsx   # Email verification
│   └── layout.tsx             # Auth layout (no sidebar)
│
├── components/
│   ├── auth/                  # Auth-specific components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── EmailVerificationForm.tsx
│   │
│   └── ui/                    # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Alert.tsx
│
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
│
├── dashboard/                 # Protected dashboard area
│   ├── page.tsx              # Main dashboard (moved here)
│   └── layout.tsx            # Dashboard layout
│
└── middleware.ts              # Route protection
```

### Updated Existing Files
- `app/layout.tsx` - Added AuthProvider
- `app/page.tsx` - Now redirects to appropriate route
- `app/components/MainDashboard.tsx` - Added user info & logout

## 🛠️ Integration Details

### AuthContext Features
The `AuthContext` provides:
- User state management
- Login/logout functions
- Registration with email verification
- Password reset functionality
- Profile management
- Automatic token refresh
- Loading states

### API Integration
All forms connect to your auth-system backend:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Route Protection
Middleware handles:
- Redirect unauthenticated users to login
- Redirect authenticated users away from auth pages
- Store intended destination for post-login redirect
- Handle root route based on auth status

## 🎨 UI Components

### Reusable Components
- **Button** - Loading states, variants, accessibility
- **Input** - Labels, errors, validation states
- **Alert** - Success/error/warning messages

### Form Features
- Real-time validation
- Password strength indicator
- Loading states during submission
- Error handling with user feedback
- Accessibility features (ARIA labels, keyboard navigation)

## 🔄 Development Workflow

### Testing the Authentication Flow
1. **Start both servers:**
   ```bash
   # Terminal 1: Auth backend
   cd ../auth-system/backend
   npm run dev

   # Terminal 2: Frontend
   cd tti
   npm run dev
   ```

2. **Test user registration:**
   - Visit http://localhost:3000
   - Should redirect to `/auth/login`
   - Click "Sign up" → `/auth/register`
   - Register with valid email
   - Check email for verification link

3. **Test login flow:**
   - Login with verified account
   - Should redirect to `/dashboard`
   - Existing dashboard functionality preserved

### Customization
- **Styling**: All components use Tailwind CSS with dark mode support
- **Branding**: Update colors in component files
- **Validation**: Modify rules in form components
- **API Endpoints**: Update URLs in `AuthContext.tsx`

## 🚦 Production Deployment

### Frontend (TTI)
Deploy to Vercel/Netlify with environment variables:
```env
NEXT_PUBLIC_API_URL=https://your-auth-api.herokuapp.com
NODE_ENV=production
```

### Backend Integration
Ensure CORS is configured for your frontend domain in the auth-system backend.

## 🐛 Troubleshooting

### Common Issues
- **CORS Errors**: Update `CORS_ORIGIN` in auth backend environment
- **Redirect Loops**: Check middleware configuration
- **Token Issues**: Verify JWT secrets in backend
- **Email Issues**: Check email service configuration in backend

### Development Tips
- Use browser dev tools to inspect cookies
- Check network tab for API calls
- Monitor console for React errors
- Verify middleware is running (check route redirects)

## 🔗 Related Files

- **Backend**: `../auth-system/backend/` - Authentication API
- **Database**: Auth backend handles all user data
- **Dashboard Data**: Existing Supabase integration for business data unchanged

The authentication system is now fully integrated while preserving all existing dashboard functionality!