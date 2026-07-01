import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  byUser: {},
}

const getOwnerKey = (userEmail) => userEmail?.trim().toLowerCase() || 'guest'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesForUser: (state, action) => {
      const { userEmail, items } = action.payload

      state.byUser[getOwnerKey(userEmail)] = items
    },
    addFavorite: (state, action) => {
      const { userEmail, movie } = action.payload
      const ownerKey = getOwnerKey(userEmail)
      const items = state.byUser[ownerKey] ?? []
      const exists = items.some((item) => item.id === movie.id)

      if (!exists) {
        state.byUser[ownerKey] = [...items, movie]
      }
    },
    removeFavorite: (state, action) => {
      const { userEmail, movieId } = action.payload
      const ownerKey = getOwnerKey(userEmail)
      const items = state.byUser[ownerKey] ?? []

      state.byUser[ownerKey] = items.filter((movie) => movie.id !== movieId)
    },
    toggleFavorite: (state, action) => {
      const { userEmail, movie } = action.payload
      const ownerKey = getOwnerKey(userEmail)
      const items = state.byUser[ownerKey] ?? []
      const exists = items.some((item) => item.id === movie.id)

      if (exists) {
        state.byUser[ownerKey] = items.filter((item) => item.id !== movie.id)
        return
      }

      state.byUser[ownerKey] = [...items, movie]
    },
    clearFavorites: (state, action) => {
      const ownerKey = getOwnerKey(action.payload?.userEmail)

      state.byUser[ownerKey] = []
    },
  },
})

export const { addFavorite, clearFavorites, removeFavorite, setFavoritesForUser, toggleFavorite } =
  favoritesSlice.actions

export const selectFavoriteMoviesForUser = (state, userEmail) =>
  state.favorites.byUser[getOwnerKey(userEmail)] ?? []

export const selectFavoriteCountForUser = (state, userEmail) =>
  selectFavoriteMoviesForUser(state, userEmail).length

export default favoritesSlice.reducer