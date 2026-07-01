import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import Favorites from './pages/Favorites'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'favorites', element: <Favorites /> },
    ]
  },
  { path: '*', element: <NotFound /> }
])

function App() {
  return <RouterProvider router={router} />
}

export default App