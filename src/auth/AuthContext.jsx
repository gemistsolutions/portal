import React, { createContext, useState, useEffect } from 'react'

// We’ll mock the authentication flow for now.
// In a real app, you’d call an API to log in/out and store tokens.

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  // user = null means not logged in. Otherwise, it's an object like { email, companyName, firstName }
  const [user, setUser] = useState(null)

  // On mount, check localStorage for a “token” and parse the user
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  function login(email, password) {
    // Mock: accept any email/password. In a real app, POST to /api/auth/login
    const fakeUser = {
      email,
      firstName: 'Bob',
      companyName: 'ACME Trucking'
    }
    localStorage.setItem('token', 'fake-jwt-token')
    localStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    return Promise.resolve(true)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
