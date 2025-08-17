# Claude Code Prompt: Modern Registration/Login System

Build a complete, production-ready authentication system with the following specifications:

## Tech Stack Requirements
- **Backend**: Node.js with Express.js
- **Database**: Supabase
- **Frontend**: React with TypeScript and Tailwind CSS
- **Authentication**: JWT tokens with refresh token rotation
- **Validation**: Zod for schema validation
- **Security**: bcrypt for password hashing, rate limiting, CORS

## Core Features

### 1. User Registration
- Email and password registration
- Email verification flow with verification tokens
- Password strength requirements (min 8 chars, uppercase, lowercase, number, special char)
- Duplicate email prevention
- Input sanitization and validation

### 2. User Login
- Email/password authentication
- "Remember me" functionality
- Account lockout after failed attempts (5 attempts, 15-minute lockout)
- Rate limiting on login endpoints

### 3. Password Management
- Secure password reset via email
- Password change functionality for authenticated users
- Password history to prevent reuse of last 5 passwords
- Temporary password reset tokens with expiration

### 4. Security Features
- JWT access tokens (15-minute expiry)
- Refresh tokens (7-day expiry) with rotation
- CSRF protection
- Secure HTTP-only cookies for refresh tokens
- Input validation and sanitization
- SQL injection prevention via Prisma
- XSS protection headers

### 5. User Profile
- Basic profile management (name, email updates)
- Email change verification flow
- Account deletion functionality
- Session management (view/revoke active sessions)

## Database Schema
Create tables for:
- Users (id, email, password_hash, name, email_verified, created_at, updated_at)
- Email verifications (token, user_id, expires_at, verified_at)
- Password resets (token, user_id, expires_at, used_at)
- Password history (user_id, password_hash, created_at)
- Refresh tokens (token, user_id, expires_at, revoked_at)
- Login attempts (email, ip_address, success, attempted_at)

## API Endpoints Structure
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
POST /api/auth/change-password
GET /api/auth/me
PUT /api/auth/profile
DELETE /api/auth/account
GET /api/auth/sessions
DELETE /api/auth/sessions/:id
```

## Frontend Requirements

### Components to Build
1. **Registration Form**
   - Real-time password strength indicator
   - Email format validation
   - Loading states and success/error handling
   - Accessibility features (ARIA labels, keyboard navigation)

2. **Login Form**
   - Email/password fields with validation
   - "Remember me" checkbox
   - "Forgot password" link
   - Social login placeholder buttons (Google, GitHub)

3. **Password Reset Flow**
   - Forgot password form
   - Reset password form with token validation
   - Success/error states

4. **Profile Dashboard**
   - User information display
   - Password change form
   - Active sessions list
   - Account deletion option

5. **Email Verification**
   - Verification pending page
   - Resend verification email
   - Verification success/failure pages

### UX/UI Requirements
- Modern, clean design with smooth transitions
- Mobile-responsive layout
- Dark/light mode support
- Loading spinners and skeleton screens
- Toast notifications for feedback
- Form validation with inline error messages
- Progressive enhancement

## Security Best Practices
- Environment variables for secrets
- HTTPS enforcement in production
- Secure cookie settings
- Rate limiting with Redis (if available) or in-memory store
- Input sanitization on all endpoints
- Proper error handling (no sensitive info in errors)
- Audit logging for security events

## Additional Features
- Email service integration (SendGrid, AWS SES, or Nodemailer with Gmail)
- Middleware for authentication and authorization
- API response standardization
- Comprehensive error handling
- Database connection pooling
- Health check endpoints
- Basic admin functionality for user management

## Testing Requirements
- Unit tests for authentication logic
- Integration tests for API endpoints
- Frontend component tests
- End-to-end test scenarios for complete flows

## Configuration
- Environment-based configuration
- Docker setup for development
- Database migrations and seeding
- Production deployment considerations

## Expected Deliverables
1. Complete backend API with all endpoints
2. React frontend with all components and pages
3. Database schema and migrations
4. Authentication middleware and utilities
5. Email templates for verification and password reset
6. Environment configuration files
7. README with setup and deployment instructions
8. Basic test suite

Please implement this as a complete, working application that can be run locally for development and deployed to production. Focus on security, user experience, and maintainable code structure.