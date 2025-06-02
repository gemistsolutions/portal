import React, { useState } from 'react'
import UploadModal from '../Documents/UploadModal'

function QuickActions() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setShowUpload(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
        >
          Upload New Document
        </button>
        <button
          onClick={() => alert('Open mock audit modal')}
          className="bg-secondary border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white"
        >
          Request Mock Audit
        </button>
        <button
          onClick={() => alert('Open add/edit driver modal')}
          className="bg-secondary border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white"
        >
          Add/Edit Driver
        </button>
        <button
          onClick={() => alert('Open schedule consultation modal')}
          className="bg-secondary border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white"
        >
          Schedule Consultation
        </button>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  )
}

export default QuickActions
