# CustomerHub

## 📋 Overview

**CustomerHub** is a modern customer management system that helps businesses organize and manage their customer database. Built with Next.js and TypeScript, it provides a fast, intuitive interface for tracking customer information, contacts, and interactions.

## 📸 Screenshots

### Desktop View
![CustomerHub Desktop](screenshots/CutomerHub1.png)

### Mobile View
![CustomerHub Mobile](screenshots/CutomerHubMob1.png)

## 🎯 Purpose

This application serves as a centralized platform for:
- **Managing customer data** - Store and organize customer contact information
- **Quick access** - Fast search and retrieval of customer details
- **Data security** - Secure authentication system protecting customer information
- **Easy operations** - Simple CRUD operations for daily business needs

## 🔑 Default Credentials

```
Username: admin
Password: admin
```

> ⚠️ **Note:** For production use, implement a secure authentication system (e.g., NextAuth.js, Clerk, Auth0).

## 🛠️ Technology Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router and Server Components
- **[React 19.2](https://react.dev/)** - Latest UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static typing for code reliability
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Database
- **[Drizzle ORM 0.45](https://orm.drizzle.team/)** - TypeScript ORM with excellent DX
- **[Better-SQLite3](https://github.com/WiseLibs/better-sqlite3)** - Fast, synchronous SQLite database
- **Server Actions** - Native Next.js API for client-server communication

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migrations and schema management
- **[Faker.js](https://fakerjs.dev/)** - Test data generation
- **[TSX](https://tsx.is/)** - TypeScript executor for scripts

## ✨ Features

### Customer Management
- ➕ **Add new customers** - Quick form to register new customer information
- 📋 **View customer list** - Table view with all customer details
- ✏️ **Edit customers** - Update customer information as needed
- 🗑️ **Delete customers** - Remove customers with confirmation dialog
- ☑️ **Bulk selection** - Select multiple customers with checkboxes

### Communication & Marketing
- 📧 **Bulk messaging** - Send offers and information to multiple customers at once
- 🎯 **Targeted campaigns** - Select specific customers for your messages
- ✉️ **Custom messages** - Personalize subject and content for each campaign
- 📊 **Recipient tracking** - See exactly who will receive your message

### Security
- 🔐 **User authentication** - Secure login system
- 🛡️ **Protected routes** - Dashboard access only for authenticated users
- 🔒 **Session management** - Automatic session handling

### User Interface
- 📱 **Responsive design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS
- 🚀 **Fast navigation** - Sidebar menu for quick access to all sections
- 💬 **Modal dialogs** - Smooth interactions for adding/editing data
- ⚡ **Real-time updates** - Instant UI refresh after data changes

## 🏗️ Application Architecture

### Project Structure

```
CustomerHub/
├── app/                      # Next.js App Router
│   ├── actions.ts           # Server Actions (CRUD operations)
│   ├── layout.tsx           # Root layout with AuthProvider
│   ├── page.tsx             # Home page
│   ├── dashboard/           # Customer dashboard
│   ├── login/               # Login page
│   └── settings/            # Settings page
│
├── components/              # React Components
│   ├── AppLayout.tsx       # Main app layout
│   ├── CustomerDialog.tsx  # Add/Edit customer dialog
│   ├── CustomerTable.tsx   # Customer list table
│   ├── DeleteConfirmation.tsx # Delete confirmation modal
│   ├── ProtectedRoute.tsx  # Protected route wrapper
│   └── [UI Components]     # Header, Sidebar, Footer, Dialog
│
├── db/                      # Database layer
│   ├── schema.ts           # Database schema (Drizzle)
│   ├── index.ts            # DB connection instance
│   └── seed.ts             # Seed script for test data
│
├── lib/                     # Utilities
│   └── auth.tsx            # Authentication context
│
├── drizzle.config.ts       # Drizzle ORM configuration
└── package.json
```

### Data Flow

```
User Action (Client)
    ↓
Client Component
    ↓
Server Action (app/actions.ts)
    ↓
Drizzle ORM
    ↓
SQLite Database
    ↓
revalidatePath → UI Update
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm
- SMTP server credentials (Gmail, Outlook, or custom SMTP)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd CustomerHub
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and configure your settings:
```env
# Database
DATABASE_URL=./local.db

# SMTP Configuration (required for sending emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@customerhub.com
```

**Gmail SMTP Setup:**
1. Enable 2-Factor Authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password for "Mail"
4. Use that App Password in `SMTP_PASSWORD`

**Other SMTP Providers:**
- **Outlook/Hotmail**: smtp-mail.outlook.com:587
- **SendGrid**: smtp.sendgrid.net:587 (username: "apikey", password: your-api-key)
- **Custom SMTP**: Contact your provider for credentials

> **Note**: If SMTP is not configured, emails will be simulated (logged to console only).

4. **Initialize database**
```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:push

# Seed test data (optional)
npm run db:seed
```

5. **Run the application**
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests with Jest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Apply schema changes
npm run db:seed      # Seed database with test data
```

## 🧪 Testing

The project includes 25 comprehensive tests covering:
- **Component tests** - BulkMessageDialog, Header, Footer
- **SMTP library tests** - Email sending functionality
- **Integration tests** - Full user workflows

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

All tests are automatically run in the CI/CD pipeline before deployment.

## � Deployment

### AWS Cloud Deployment

This project includes automated CI/CD pipeline for AWS deployment using GitHub Actions.

**Supported deployment targets:**
- AWS S3 + CloudFront (static hosting)
- AWS Amplify (full-stack hosting)
- AWS ECS (Docker containers)

**Deployment is disabled by default.** See [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md) for detailed setup instructions.

**Quick start:**
1. Configure AWS credentials in GitHub Secrets
2. Choose deployment target (S3/Amplify/ECS)
3. Enable deployment:
   - Manual: Go to Actions → Run workflow → Enable deployment
   - Auto: Set `AUTO_DEPLOY: 'true'` in workflow file

### Other Deployment Options

- **[Vercel](https://vercel.com/)** - Recommended for Next.js (zero config)
- **[Railway](https://railway.app/)** - Simple containerized deployment
- **[Netlify](https://www.netlify.com/)** - JAMstack hosting
- **Docker** - Use included Dockerfile for any container platform

## �📖 Usage

### Logging In
1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Enter credentials: **admin** / **admin**
4. Click "Sign In"

### Managing Customers
- **View customers**: Dashboard displays all customers in a table
- **Add customer**: Click "Add Customer" button, fill in the form, and save
- **Delete customer**: Click the trash icon next to a customer and confirm deletion
- **Search**: Use the search bar to filter customers by name or email

### Sending Bulk Messages
1. In the customer dashboard, select customers using the checkboxes
2. Click the "Send to X" button that appears when customers are selected
3. Fill in the message subject and content
4. Review the recipient list
5. Click "Send Message" to deliver your offer or information

> **Note**: Emails are sent via SMTP if configured in `.env`. Without SMTP configuration, emails will be simulated (logged to console).

## 🔧 Configuration

### Database
The application uses SQLite by default. To change the database:
1. Update `DATABASE_URL` in `.env`
2. Modify `drizzle.config.ts` dialect setting
3. Run migrations

### Authentication
Current implementation uses simple session storage. For production:
- Implement NextAuth.js or similar
- Add password hashing
- Use secure session management
- Add role-based access control

### SMTP Email Configuration

The application includes **built-in SMTP support** using Nodemailer. Configure your SMTP settings in the `.env` file:

#### Quick Setup Guide

**Option 1: Gmail (Recommended for testing)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
```

**Steps for Gmail:**
1. Enable 2-Factor Authentication: [Google Account Security](https://myaccount.google.com/security)
2. Generate App Password: [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and your device
4. Copy the 16-character password to `SMTP_PASSWORD`

**Option 2: Outlook/Hotmail**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=your-email@outlook.com
```

**Option 3: Custom SMTP Server**
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=admin@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=noreply@yourdomain.com
```

**Option 4: SendGrid**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM_EMAIL=noreply@yourdomain.com
```

#### SMTP Configuration Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` (TLS) or `465` (SSL) |
| `SMTP_SECURE` | Use SSL/TLS | `false` for port 587, `true` for port 465 |
| `SMTP_USER` | SMTP username (usually email) | `user@gmail.com` |
| `SMTP_PASSWORD` | SMTP password or app password | Your password or app-specific password |
| `SMTP_FROM_EMAIL` | Default sender email | `noreply@customerhub.com` |

#### Testing SMTP Connection

The application automatically falls back to simulation mode if SMTP is not configured. Check the console logs:
- ✅ "SMTP server is ready to send emails" - Configuration successful
- ⚠️ "SMTP credentials not configured" - Will use simulation mode
- ❌ "SMTP connection failed" - Check your credentials and firewall

#### Common Issues

**Gmail: "Less secure app access"**
- Use App Passwords instead of your regular password
- Ensure 2FA is enabled first

**Connection Timeout**
- Check firewall settings
- Verify port 587 or 465 is not blocked
- Try toggling `SMTP_SECURE` between true/false

**Authentication Failed**
- Double-check username and password
- For Gmail, use App Password not regular password
- Some providers require specific username format

#### Production Recommendations

For production deployments, consider:
- **SendGrid**: 100 emails/day free, excellent deliverability
- **AWS SES**: Very low cost, reliable infrastructure  
- **Mailgun**: Developer-friendly with good free tier
- **Postmark**: Premium deliverability, transactional focus

Configure environment variables in your hosting platform (Vercel, Railway, etc.) instead of using `.env` files.

## 📝 License

MIT - Use this project as you wish.

