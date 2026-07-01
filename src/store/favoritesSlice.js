import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.movies.find(m => m.id === action.payload.id)
      if (!exists) {
        state.movies.push(action.payload)
      }
    },
    removeFromFavorites: (state, action) => {
      state.movies = state.movies.filter(m => m.id !== action.payload)
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer