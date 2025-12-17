# CustomerHub

## 📋 Overview

**CustomerHub** is a modern customer management system that helps businesses organize and manage their customer database. Built with Next.js and TypeScript, it provides a fast, intuitive interface for tracking customer information, contacts, and interactions.

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

## 🚀 Instalacja i uruchomienie

### Wymagania
- Node.js 20+
- npm/yarn/pnpm

### Kroki instalacji

1. **Klonowanie repozytorium**
```bash
git clone <repository-url>
cd CustomerHub
```

2. **Instalacja zależności**
```bash
npm install
```

3. **Konfiguracja środowiska**
Utwórz plik `.env` w katalogu głównym:
```env
DATABASE_URL=./local.db
```

4. **Inicjalizacja bazy danych**
```bash
# Generowanie migracji
npm run db:generate

# Aplikowanie migracji
npm run db:push

# Seed danych testowych (opcjonalnie)
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
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Apply schema changes
npm run db:seed      # Seed database with test data
```

## 📖 Usage

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

## 📝 License

MIT - Use this project as you wish.

