
import { useEffect } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'

function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const login = localStorage.getItem('adminLogin')

    if (login !== 'true') {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminLogin')
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">
          <h2>CHAMUNDA</h2>
          <span>DIGITAL STUDIO</span>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div>
            <h4>Admin</h4>
            <p>Super Administrator</p>
          </div>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="admin-nav">

          <NavLink to="/admin/dashboard" className="sidebar-link">
            <span>▦</span>
            Dashboard
          </NavLink>

          <NavLink to="/admin/bookings" className="sidebar-link">
            <span>▣</span>
            Manage Bookings
          </NavLink>

          <NavLink to="/admin/gallery" className="sidebar-link">
            <span>▧</span>
            Manage Gallery
          </NavLink>

        </nav>

        <div className="sidebar-bottom">
          <p className="sidebar-label">WEBSITE</p>

          <Link to="/" className="sidebar-link">
            <span>⌂</span>
            View Website
          </Link>

          <button className="sidebar-logout" onClick={handleLogout}>
            <span>⇥</span>
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <h3>Admin Panel</h3>
            <p>Manage your studio website</p>
          </div>

          <div className="admin-top-profile">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>

      </main>

    </div>
  )
}

export default AdminLayout
