import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'

const FAVORITES_STORAGE_KEY = 'movie-app-favorites'

const readFavoritesState = () => {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!storedFavorites) {
      return undefined
    }

    const parsedFavorites = JSON.parse(storedFavorites)

    if (Array.isArray(parsedFavorites?.items)) {
      return { byUser: { guest: parsedFavorites.items } }
    }

    if (parsedFavorites?.byUser && typeof parsedFavorites.byUser === 'object') {
      return parsedFavorites
    }

    return undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  preloadedState: readFavoritesState(),
  reducer: {
    favorites: favoritesReducer,
  },
})

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(store.getState().favorites))
  })
}