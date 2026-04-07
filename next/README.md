# Blog Application

A blog app built with Next.js, React, and Sanity CMS. Features a responsive design, infinite scroll pagination, theme switching, and syntax highlighting for code blocks.

## Features

- **Modern Stack**: Next.js 13+ with App Router, React, TypeScript support
- **Headless CMS**: Sanity integration for content management
- **Responsive Design**: Bootstrap-based responsive layout
- **Performance Optimized**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Interactive Features**:
  - Infinite scroll pagination
  - Theme switching (light/dark mode)
  - Filter and sorting options
  - Syntax highlighting for code blocks
- **SEO Friendly**: Optimized for search engines with proper meta tags
- **Developer Experience**: ESLint, Prettier, Husky pre-commit hooks

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Bootstrap, SCSS
- **Backend**: Sanity CMS, Next.js API Routes
- **Data Fetching**: SWR for client-side, SSG for initial load
- **Styling**: Bootstrap + Custom SCSS
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Sanity account and project setup

## 🚀 Getting Started

### 1. Clone the repository

### 2. Install dependencies

### 3. Set up environment variables

Create an `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your_api_token
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for production

```bash
npm run build
```

### 6. Run production server

```bash
npm run start
```

## Project Structure

```
blog-me/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and helpers
├── public/              # Static assets
├── styles/              # Global styles and SCSS files
├── sanity/              # Sanity CMS configuration
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Testing

Run unit/integration tests:

```bash
npm run test
```

Run Playwright smoke tests:

```bash
npm run test:e2e
```

Install Playwright browsers (first run only):

```bash
npm run test:e2e:install
```

## Vercel Deployment

This app is ready to deploy as a dedicated Vercel project with root directory set to `next`.

Required Vercel environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_PROJECT_ID` (optional if `NEXT_PUBLIC_SANITY_PROJECT_ID` is set)
- `SANITY_DATASET_NAME` (optional if `NEXT_PUBLIC_SANITY_DATASET` is set)

Recommended pre-deploy checks:

```bash
npm run build
npm run test
npm run test:e2e
```
