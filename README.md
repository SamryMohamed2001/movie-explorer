# Movie Explorer

A movie discovery web app built with React and the [TMDb API](https://developers.themoviedb.org/3). Search for movies, browse trending and popular titles, filter by genre/year/rating, view full details with cast and trailer, and save favorites, all persisted locally.

## Features

- **Search** with debounced infinite scroll, plus a recent-searches dropdown
- **Trending** section and a **browse/discover** grid with a "Load More" button
- **Filters** by genre, release year, and minimum rating
- **Movie details** page: overview, genres, cast, and embedded YouTube trailer
- **Favorites** and **search history**, stored in `localStorage`
- **"Continue Where You Left Off"**, remembers the last movie you viewed
- **Light/dark mode** toggle
- Mock login gate (any username/password signs you in, no backend)
- Responsive, mobile-first layout

## Tech stack

- **React** via **Vite** (the brief specified Create React App, but CRA is deprecated and no longer plays well with current Node versions, so this uses Vite as a drop-in modern replacement with the same React/Router/Axios/MUI stack)
- **Material UI (MUI)** for components and theming
- **Axios** for API requests
- **React Router** for navigation
- **React Context API** for state (auth, favorites/search history, theme)

## Getting started

```bash
git clone https://github.com/SamryMohamed2001/movie-explorer.git
cd movie-explorer
npm install
```

Create a `.env` file (copy `.env.example`) and add your own [TMDb API key](https://www.themoviedb.org/settings/api):

```
VITE_TMDB_API_KEY=your_tmdb_v3_api_key_here
```

Then run the dev server:

```bash
npm run dev
```

## Project structure

```
src/
  api/          TMDb API client
  components/   Reusable UI (MovieCard, SearchBar, HeroBanner, StarRating, ...)
  context/      Auth, movie/favorites, and theme state
  pages/        Route-level views (Home, MovieDetails, Favorites, Login)
```

## Design inspiration

The homepage hero banner draws layout/style inspiration from [this Behance concept](https://www.behance.net/gallery/241289445/Modern-Homepage-Design-for-Movie-Rating-Website) by Abbas Chaaban, adapted and built from scratch with original code and live TMDb data (no assets from the original were used).

## Notes on AI assistance

Parts of this project were built with AI assistance (Claude), primarily for debugging issues, working through certain TMDb API and MUI quirks, and iterating on UI polish. All code was reviewed and tested (including live, end-to-end against the real API) before being committed.

## Attribution

This product uses the TMDb API but is not endorsed or certified by TMDb.
