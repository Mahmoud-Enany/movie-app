import { create } from 'zustand'

const THEME_STORAGE_KEY = 'movie-app-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    set({ theme })
  },
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark'

    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    set({ theme: nextTheme })
  },
}))

export default useThemeStore