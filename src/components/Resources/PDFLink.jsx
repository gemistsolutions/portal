import React from 'react'

function PDFLink({ name }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l8-4-8-4-8 4 8 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v9m0 0l-6-4m6 4l6-4" />
        </svg>
        <span className="font-medium">{name}</span>
      </div>
      <button className="text-blue-600 hover:underline">Download</button>
    </div>
  )
}

export default PDFLink
