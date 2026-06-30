import { Outlet } from 'react-router-dom'
import AppFooter from './layout/AppFooter'
import AppNavbar from './layout/AppNavbar'

function MainLayout() {
  return (
    <div className="app-shell d-flex flex-column">
      <AppNavbar />
      <main className="flex-grow-1 py-5">
        <div className="container py-lg-3">
          <Outlet />
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

export default MainLayout