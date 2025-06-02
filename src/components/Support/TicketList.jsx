import React from 'react'
import useFetch from '../../hooks/useFetch'

function TicketList() {
  const { data, loading } = useFetch('/tickets')

  if (loading) {
    return <div>Loading tickets...</div>
  }

  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticket #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                #{ticket.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {ticket.submittedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {ticket.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {ticket.status === 'Open' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentYellow text-white">
                    Open
                  </span>
                )}
                {ticket.status === 'In Progress' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentYellow text-white">
                    In Progress
                  </span>
                )}
                {ticket.status === 'Closed' && (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentGreen text-white">
                    Closed
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <button
                  onClick={() => alert(`View chat history for ticket ${ticket.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketList
