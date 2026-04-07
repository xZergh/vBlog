# Blog Me - Sanity Studio

A modern, TypeScript-powered Sanity Studio for managing blog content.

## Quick Start

1. Clone and install dependencies:
```bash
npm install
 ```
2. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit .env.local with your Sanity project details.

3. Start the development server:
```bash
npm run dev
```
4. Open your browser:

Navigate to http://localhost:3333

## Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `SANITY_STUDIO_PROJECT_ID` | Your Sanity project ID | ✅ |
| `SANITY_STUDIO_DATASET` | Dataset name (usually 'production') | ✅ |
| `SANITY_STUDIO_API_VERSION` | API version (e.g., '2025-09-01') | ✅ |

## Available Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run deploy - Deploy to Sanity
- npm run type-check - Check TypeScript types
- npm run lint - Lint code
- npm run format - Format code with Prettier
- npm run test - Run unit tests
- npm run validate - Run type-check, lint, format check, and tests

## Vercel Deployment

If you want the Studio hosted on Vercel, create a separate Vercel project with root directory `sanity`.

Required environment variables:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION` (optional, defaults to `2024-01-01`)

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```
