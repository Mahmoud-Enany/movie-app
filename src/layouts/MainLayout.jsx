import { Outlet } from 'react-router-dom'
import AppFooter from '../components/layout/AppFooter'
import AppNavbar from '../components/layout/AppNavbar'

function MainLayout() {
  return (
    <div className="app-shell d-flex flex-column">
      <AppNavbar />
      <main className="flex-grow-1 py-4 py-lg-5">
        <div className="container py-lg-3">
          <Outlet />
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

export default MainLayout