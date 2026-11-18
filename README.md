# NOIR & SPICE
### The Art of Bold Flavour

A modern, premium restaurant website built using **Next.js, TypeScript, Tailwind CSS and NeonDB (PostgreSQL)**.

NOIR & SPICE is a fictional restaurant based in Sargodha, Pakistan. The project focuses on creating an elegant restaurant website with a dynamic menu system powered by a cloud-based PostgreSQL database.

---

## 🍽️ Project Overview

NOIR & SPICE provides a contemporary digital dining experience with a luxury-inspired interface, featuring a midnight-black theme, warm copper accents and elegant typography.

The main objective of this project is to develop a dynamic restaurant menu where food items are retrieved, added and deleted directly through a NeonDB database.

---

## ✨ Features

- **Premium UI Design:** Modern restaurant interface with a dark luxury theme.
- **Dynamic Menu:** Displays food items retrieved directly from NeonDB.
- **Add Menu Items:** Add new dishes with their name, price and description.
- **Delete Menu Items:** Remove existing dishes from the database.
- **Database Integration:** Uses NeonDB PostgreSQL for persistent storage.
- **Automatic Updates:** Menu updates after adding or deleting an item.
- **Responsive Design:** Designed to work on desktop and mobile screens.
- **API Integration:** Uses Next.js API Route Handlers and Fetch API.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend and backend framework |
| TypeScript | Programming language |
| React | UI components and state management |
| Tailwind CSS | Website styling |
| NeonDB | Cloud PostgreSQL database |
| Neon Serverless Driver | Database connectivity |
| Fetch API | Frontend and backend communication |
| Next.js API Routes | Backend operations |

---

## 🗄️ Database Structure

The project uses a NeonDB PostgreSQL database with a table named `menu_items`.

The table contains the following fields:

| Column | Data Type | Description |
|---|---|---|
| id | SERIAL | Unique primary key |
| name | VARCHAR(255) | Food item name |
| price | NUMERIC | Food item price |
| description | TEXT | Food item description |

All menu items are stored in the database, ensuring that changes remain available after refreshing the website.

---

## 📂 Project Structure

```text
project-one/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── menu/
│   │   │       └── route.ts
│   │   │
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   └── lib/
│       └── db.ts
│
├── public/
│
├── .env.local
├── package.json
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone or Download the Project

Open the project folder in Visual Studio Code.

### 2. Install Dependencies

Run the following command in the terminal:

```bash
npm install
```

Install the NeonDB serverless driver:

```bash
npm install @neondatabase/serverless
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root project directory.

Add your NeonDB connection string:

```env
DATABASE_URL="YOUR_NEON_DATABASE_CONNECTION_STRING"
```

Replace the placeholder with your actual NeonDB connection string.

**Important:** Never share your database credentials or upload `.env.local` to a public GitHub repository.

### 4. Configure NeonDB

Create a PostgreSQL database in NeonDB and execute the following SQL query in the Neon SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL
);
```

### 5. Run the Development Server

Start the application:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🔌 API Endpoints

The project uses a Next.js API Route Handler located at:

`src/app/api/menu/route.ts`

| Method | Endpoint | Function |
|---|---|---|
| GET | /api/menu | Retrieve all menu items |
| POST | /api/menu | Add a new menu item |
| DELETE | /api/menu?id=1 | Delete a menu item by ID |

The API communicates with NeonDB to perform database operations.

---

## 🎨 Website Design

The visual identity of NOIR & SPICE is based on a premium contemporary restaurant aesthetic.

**Color Palette:**
- Midnight Black: `#101010`
- Charcoal: `#242321`
- Warm Copper: `#B87345`
- Ivory: `#F2EBDD`

The interface includes:
- Navigation bar
- Restaurant hero section
- About / Our Story section
- Dynamic food menu
- Menu management form
- Restaurant footer

---

## 🎯 Project Objectives

The main objectives of this project are:

1. Understand Next.js App Router and project structure.
2. Learn how frontend and backend communicate using API routes.
3. Connect a Next.js application with a PostgreSQL database.
4. Perform database operations using SQL queries.
5. Implement dynamic content using React state and effects.
6. Build a responsive and professional restaurant website.

---

## 👨‍💻 Project Information

**Project Name:** NOIR & SPICE – Project One

**Project Type:** Dynamic Restaurant Website

**Location:** Sargodha, Punjab, Pakistan

**Framework:** Next.js

**Database:** NeonDB (PostgreSQL)

**Purpose:** University Practical Assignment

---

### NOIR & SPICE
*The Art of Bold Flavour.*

© 2026 NOIR & SPICE. All Rights Reserved.