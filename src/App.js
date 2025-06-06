import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Dashboard from './components/Dashboard/Dashboard'
import { DriversPage } from './components/Drivers/DriversPage'
import DocumentsPage from './components/Documents/DocumentsPage'
import TasksPage from './components/Tasks/TasksPage'
import SupportPage from './components/Support/SupportPage'
import AdminInbox from './components/Support/AdminInbox'
import ResourcesPage from './components/Resources/ResourcesPage'
import ProfilePage from './components/Profile/ProfilePage'
import NotificationSettings from './components/Profile/NotificationSettings'
import { AuthContext } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import { VehiclesPage } from './components/Vehicles/VehiclesPage'
import { AuditPrepCenter } from './components/AuditPrep/AuditPrep'


function App() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

          {/* All protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <DriversPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehiclesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auditprep"
            element={
              <ProtectedRoute>
                <AuditPrepCenter />
              </ProtectedRoute>
            }
          />

          {!user.admin && <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />}
          {user.admin && <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <AdminInbox />
              </ProtectedRoute>
            }
          />}
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/notifications"
            element={
              <ProtectedRoute>
                <NotificationSettings />
              </ProtectedRoute>
            }
          />
          {/* Catch‐all: redirect to dashboard */}
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  )
}

export default App
