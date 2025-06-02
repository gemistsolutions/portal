import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DocumentTable from './DocumentTable'
import UploadModal from './UploadModal'

function DocumentsPage() {
  const [searchParams] = useSearchParams()
  const filterParam = searchParams.get('filter') || ''
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
        >
          Upload New Document
        </button>
      </div>
      <DocumentTable filter={filterParam} />
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  )
}

export default DocumentsPage
