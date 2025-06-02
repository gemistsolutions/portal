import React from 'react'
import TicketForm from './TicketForm'
import TicketList from './TicketList'

function SupportPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Support</h1>
      <p className="mb-6">
        Need help? Submit a ticket below or view past tickets and chat with our compliance team.
      </p>
      <TicketForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Past Tickets</h2>
        <TicketList />
      </div>
    </div>
  )
}

export default SupportPage
