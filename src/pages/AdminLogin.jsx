
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLogin', 'true')

      navigate('/admin/dashboard', { replace: true })
    } else {
      setError('Invalid Username or Password')
    }
  }

  return (
    <div className="admin-login">

      <div className="login-box">

        <div className="login-logo">
          <h2>CHAMUNDA</h2>
          <span>DIGITAL STUDIO</span>
        </div>

        <h3>Admin Login</h3>

        <p className="login-subtitle">
          Welcome Back! Please Login to Continue
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              required
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
            />
          </div>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button type="submit" className="login-button">
            LOGIN
          </button>

        </form>

        <p className="login-footer">
          © 2026 CHAMUNDA DIGITAL
        </p>

      </div>

    </div>
  )
}

export default AdminLogin
