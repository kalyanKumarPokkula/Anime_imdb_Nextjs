## Anime_imdb

# To start Database you have to follow this steps:

create a .env assign a variable for DATABASE_URL example assign "mysql://username:password@localhost:3306/anime_imdb"

```bash
npx prisma migrate dev

npx prisma studio
```

This command will create a tables in your database

## Getting Started

First, run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
