import React, { useState } from 'react'

function NotificationSettings() {
  const [email7days, setEmail7days] = useState(true)
  const [emailTicketUpdate, setEmailTicketUpdate] = useState(true)
  const [smsMockAudit, setSmsMockAudit] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    // In real app, call PUT /api/users/me/preferences
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Notification Preferences</h1>
      {success && (
        <div className="bg-green-100 text-green-800 px-3 py-2 rounded mb-4">
          Preferences saved!
        </div>
      )}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Email me 7 days before any expiration</span>
          <input
            type="checkbox"
            checked={email7days}
            onChange={() => setEmail7days(!email7days)}
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Email me when a ticket is updated</span>
          <input
            type="checkbox"
            checked={emailTicketUpdate}
            onChange={() => setEmailTicketUpdate(!emailTicketUpdate)}
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>SMS reminders for mock audit scheduling</span>
          <input
            type="checkbox"
            checked={smsMockAudit}
            onChange={() => setSmsMockAudit(!smsMockAudit)}
            className="h-5 w-5"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
        >
          Save Preferences
        </button>
      </form>
    </div>
  )
}

export default NotificationSettings
