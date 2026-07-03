import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import FavoritesPage from './pages/FavoritesPage'
import Home from './pages/Home'
import HomePage from './pages/HomePage'
import MovieDetails from './pages/MovieDetails'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="dashboard" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App