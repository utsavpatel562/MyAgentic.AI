# MyAgentic.AI

MyAgentic.AI is a SaaS platform designed to build and deploy autonomous AI agents tailored to your specific workflows. Built with a modern tech stack, it allows you to automate complex tasks, enhance productivity, and facilitate seamless human-agent collaboration.

## ✨ Key Features

- **Autonomous AI Agents**: Create and customize agents powered by OpenAI to handle specific tasks and instructions.
- **Secure Authentication**: Robust user management and authentication powered by BetterAuth, supporting both email/password and social logins (Google, GitHub).
- **Type-Safe API**: End-to-end type safety between the frontend and backend using tRPC.
- **Modern UI/UX**: A sleek, responsive, and component-driven interface built with Next.js, Tailwind CSS, and Shadcn/UI.
- **Scalable Database**: Utilizes Drizzle ORM with a Neon serverless PostgreSQL database for a reliable and efficient data layer.
- **Modular Architecture**: Features are organized into self-contained modules (e.g., `agents`, `auth`, `dashboard`) for better maintainability and scalability.

## 🛠️ Tech Stack

| Category         | Technology / Library                                       |
| ---------------- | ---------------------------------------------------------- |
| **Framework**    | Next.js (with App Router)                                  |
| **UI**           | React, Tailwind CSS, Shadcn UI                             |
| **API**          | tRPC                                                       |
| **ORM**          | Drizzle ORM                                                |
| **Database**     | PostgreSQL via Neon                                        |
| **Authentication**| BetterAuth                                                |
| **State Management**| React Query                                             |
| **Validation**   | Zod                                                        |

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager
- A [Neon](https://neon.tech/) account for the PostgreSQL database.

### 1. Clone the Repository

```bash
git clone https://github.com/utsavpatel562/MyAgentic.AI.git
cd MyAgentic.AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. You will need to get the credentials from their respective platforms (Neon, GitHub, Google).

```env
# Get from your Neon database project settings
DATABASE_URL="your_neon_database_connection_string"

# BetterAuth Keys
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="better_auth_url"

# Get from GitHub OAuth App settings
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Get from Google Cloud Console OAuth 2.0 Client ID settings
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 4. Push Database Schema

Run the following command to sync your database schema with the schema defined in `src/db/schema.ts`.

```bash
npm run db:push
```

### 5. Run the Development Server

You can now start the development server.

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

- **`npm run dev`**: Starts the development server with Turbopack.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lints the codebase using ESLint.
- **`npm run db:push`**: Pushes schema changes to your database using Drizzle Kit.
- **`npm run db:studio`**: Opens Drizzle Studio to browse your database.
