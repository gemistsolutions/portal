import React, { useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Client Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <span
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => alert('Redirect to password reset')}
            >
              Forgot Password?
            </span>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
