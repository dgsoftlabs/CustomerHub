# CustomerHub

A modern Customer Management Application built with Next.js 15, Drizzle ORM, and SQLite.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database:** SQLite
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript

## Features

- 📋 View list of customers
- ➕ Add new customers
- 🗑️ Delete customers
- ⚡ Server Actions for data mutations
- 🌗 Dark mode support (via Tailwind)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project uses SQLite. The database file will be created automatically when you push the schema.

```bash
# Push the schema to the database (creates sqlite.db)
npm run db:push
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js App Router pages and actions
- `/db` - Database schema and connection configuration
- `/drizzle` - Drizzle Kit migrations folder
- `drizzle.config.ts` - Drizzle configuration
