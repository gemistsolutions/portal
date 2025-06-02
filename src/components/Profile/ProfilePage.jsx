import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'

function ProfilePage() {
  const { user, logout } = useContext(AuthContext)
  const [firstName, setFirstName] = useState(user.firstName)
  const [companyName] = useState(user.companyName)
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    // In a real app, PUT to /api/users/me
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {success && (
        <div className="bg-green-100 text-green-800 px-3 py-2 rounded mb-4">
          Profile updated successfully!
        </div>
      )}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage
