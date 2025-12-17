# CustomerHub - Customer Management System

A modern, responsive customer management application built with **Next.js** and **Drizzle ORM**.

## Features

- ✨ **Full CRUD Operations**: Add, view, edit, and delete customers
- 📊 **Dashboard**: View customer statistics and recent activity
- 🔍 **Advanced Search**: Filter customers by ID, name, email, or phone
- 📄 **Pagination**: Adjustable rows per page (10, 25, 50, 100)
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ⚙️ **Settings Page**: Configure application preferences
- 🔐 **Secure Login**: Authentication system for protected access
- 🎨 **Modern UI**: Clean interface with Tailwind CSS
- 🚀 **Fast Performance**: Built on Next.js with Turbopack

## Default Credentials

To access the application, use the following credentials:

- **Username**: `admin`
- **Password**: `admin`

> ⚠️ **Note**: These are default credentials for demonstration purposes. In a production environment, you should implement proper user management and secure authentication.

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **ORM**: Drizzle ORM
- **Database**: SQLite (better-sqlite3)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: lucide-react
- **Data Generation**: @faker-js/faker

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd CustomerHub
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:push
```

4. (Optional) Seed the database with 1000 test customers:
```bash
npm run db:seed
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You will be redirected to the login page. Use the credentials above to access the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with test data

## Project Structure

```
CustomerHub/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── settings/          # Settings page
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Customer list page
│   └── actions.ts         # Server actions
├── components/            # React components
│   ├── AppLayout.tsx      # Main layout wrapper
│   ├── Header.tsx         # Top navigation
│   ├── Sidebar.tsx        # Side navigation
│   ├── Footer.tsx         # Footer component
│   ├── CustomerTable.tsx  # Customer table with CRUD
│   ├── CustomerDialog.tsx # Add/Edit modal
│   ├── DeleteConfirmation.tsx # Delete confirmation
│   ├── Dialog.tsx         # Reusable dialog component
│   └── ProtectedRoute.tsx # Authentication guard
├── db/                    # Database configuration
│   ├── index.ts          # Database connection
│   ├── schema.ts         # Database schema
│   └── seed.ts           # Seeding script
├── lib/                   # Utilities
│   └── auth.tsx          # Authentication logic
└── drizzle.config.ts     # Drizzle configuration
```

## Database Schema

### Customers Table

| Column    | Type      | Description                  |
|-----------|-----------|------------------------------|
| id        | INTEGER   | Primary key (auto-increment) |
| name      | TEXT      | Customer name                |
| email     | TEXT      | Unique email address         |
| phone     | TEXT      | Phone number                 |
| createdAt | TEXT      | Creation timestamp           |

## Features in Detail

### Customer Management
- View all customers in a responsive table
- Add new customers with validation
- Edit existing customer information
- Delete customers with confirmation dialog
- Search across multiple fields (ID, name, email, phone)

### Dashboard
- Total customer count
- Customers added this month
- Recent customer activity
- Quick statistics overview

### Settings
- Toggle notifications
- Configure dark mode preferences
- Set auto-backup options
- Change password functionality

### Authentication
- Session-based login system
- Protected routes
- Logout functionality
- Automatic redirect to login for unauthenticated users

## Customization

### Changing Database Location

Edit `.env` file:
```env
DATABASE_URL=your-custom-path.db
```

### Modifying Customer Schema

1. Update `db/schema.ts`
2. Run `npm run db:push` to apply changes

## Credits

Built by **DGSoftLabs** - [GitHub](https://github.com/dgsoftlabs)

## License

MIT License - feel free to use this project for learning and development purposes.
- `drizzle.config.ts` - Drizzle configuration
