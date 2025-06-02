import React, { useState } from 'react'

function TicketForm() {
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('General Question')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // In a real app, POST to /api/tickets
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    setSubject('')
    setCategory('General Question')
    setDescription('')
    setAttachment(null)
  }

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
      {success && (
        <div className="bg-green-100 text-green-800 px-3 py-2 rounded mb-4">
          Ticket created successfully! We’ll get back to you within 24 hours.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option>General Question</option>
            <option>File Issue</option>
            <option>Audit Concern</option>
            <option>Billing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Attachment (optional)
          </label>
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  )
}

export default TicketForm
