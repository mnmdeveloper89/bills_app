# Oireachtas Bills UI

A React + TypeScript + Material UI application for browsing, filtering, and favouriting Irish Oireachtas bills. Users can view bill details (English & Gaeilge), mark favourites, and filter by bill type.

## Prerequisites

- Node.js 18+ (https://nodejs.org)  
- A package manager: pnpm (recommended), npm, or yarn

## Features

- Browse Bills – fetches bills from the Oireachtas API  
- Filter by Type – quickly filter bills by their type  
- **Favourites – mark/unmark bills as favourites (persisted to `localStorage`)  
- Details Modal – view bill details in English or Irish (Gaeilge)  
- Pagination – navigate large datasets easily  
- Responsive UI – built with [Material-UI (MUI)](https://mui.com/)  

## Getting Started

Clone the repository:
```bash
git https://github.com/mnmdeveloper89/bills_app.git
cd bills_app

## Install dependencies:

pnpm install
# or
npm install
# or
yarn install

## Start the development server:

npm run dev

## Open the app in your browser:

http://localhost:5173

## Notes

- Favouriting is persisted to localStorage and logs a mock dispatch to console.
- `services/api.ts` has a `USE_MOCK` toggle for live API work. Adjust mapping once the endpoint is confirmed.
- Code style enforced via ESLint + Prettier.

## Project Structure

src/
│── components/      # UI components (tables, modals, etc.)
│── hooks/           # Custom React hooks (data fetching, favourites)
│── services/        # API services (with mock/live toggle)
│── App.tsx          # Main app component
│── index.tsx        # React DOM rendering entry point
