import React from 'react'
import useFetch from '../../hooks/useFetch'
import { formatDate } from '../../utils/formatDate'
import { Download, Trash2, RefreshCw } from 'lucide-react'

function DocumentTable({ filter }) {
  const { data, loading } = useFetch('/documents')
  if (loading) {
    return <div>Loading documents...</div>
  }

  // Simple filter by category if provided
  const filtered = filter
    ? data.filter((doc) =>
        doc.category.toLowerCase().includes(filter.toLowerCase())
      )
    : data

  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiration Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Uploaded On
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filtered.map((doc) => (
            <tr key={doc.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doc.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doc.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(doc.expiresAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {doc.status === 'Valid' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentGreen text-white">
                    Valid
                  </span>
                )}
                {doc.status === 'Expiring' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentYellow text-white">
                    Expiring
                  </span>
                )}
                {doc.status === 'Expired' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentRed text-white">
                    Expired
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(doc.uploadedOn)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <div className="flex items-center justify-center space-x-3">
                  <button className="hover:text-primary">
                    <Download size={18} title="Download" />
                  </button>
                  <button className="hover:text-red-600">
                    <Trash2 size={18} title="Delete" />
                  </button>
                  <button className="hover:text-blue-600">
                    <RefreshCw size={18} title="Reupload" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination would go here if needed */}
    </div>
  )
}

export default DocumentTable
