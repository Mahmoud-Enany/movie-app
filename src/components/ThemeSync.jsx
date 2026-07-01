import { useEffect } from 'react'
import useThemeStore from '../store/themeStore'

function ThemeSync() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.body.dataset.theme = theme
  }, [theme])

  return null
}

export default ThemeSync