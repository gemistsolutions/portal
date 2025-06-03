import { useState, useEffect } from 'react'

// A simple fetch hook placeholder. In a real‐world app you'd pass in URL, method, headers, etc.
// For now we’ll mock success responses with a small delay.

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false
    async function fetchData() {
      setLoading(true)
      try {
        // Replace this with a real fetch call:
        await new Promise((r) => setTimeout(r, 500))
        // Mock data based on URL
        let mock
        if (url.includes('/dashboard/summary')) {
          mock = {
            complianceScore: 89,
            nextAudit: '2025-07-15',
            pendingTasks: 3,
            drivers: { total: 12, complete: 10 },
            vehicles: { total: 8, updated: 6 },
            expirations: [
              { text: '3 CDL licenses expire in 21 days' },
            ],
            alerts: [
              { text: 'IFTA report due in 5 days' },
              { text: 'Driver John Doe missing med exam' },
            ]
          }
        } else if (url.startsWith('/documents')) {
          mock = [
            {
              id: 1,
              name: 'John Doe – CDL License',
              category: 'Driver',
              expiresAt: '2025-07-15',
              status: 'Expiring',
              uploadedOn: '2025-05-10'
            },
            {
              id: 2,
              name: 'ACME Trucking – IFTA Report Q2',
              category: 'Compliance',
              expiresAt: '2025-06-30',
              status: 'Expiring',
              uploadedOn: '2025-05-01'
            },
            {
              id: 3,
              name: 'Vehicle 123 – Maintenance Log',
              category: 'Vehicle',
              expiresAt: '2025-08-01',
              status: 'Valid',
              uploadedOn: '2025-04-20'
            }
          ]
        } else if (url.startsWith('/tasks')) {
          mock = [
            {
              id: 1,
              title: 'Driver John Doe – Med Cert Expiring in 5 days',
              type: 'Expiration',
              dueDate: '2025-07-10',
              priority: 'High',
              status: 'Open',
              notes: 'Called driver on 5/15, awaiting visit.'
            },
            {
              id: 2,
              title: 'Vehicle 123 – Maintenance log missing',
              type: 'Missing Document',
              dueDate: '2025-07-01',
              priority: 'Medium',
              status: 'Open',
              notes: 'Last update 3 months ago.'
            },
            {
              id: 3,
              title: 'IFTA Report Q2 due in 7 days',
              type: 'Audit Prep',
              dueDate: '2025-07-08',
              priority: 'High',
              status: 'Open',
              notes: 'Reminder email sent.'
            }
          ]
        } else if (url.startsWith('/tickets')) {
          mock = [
            {
              id: 1234,
              submittedAt: '2025-05-20',
              subject: 'CDL License Question',
              status: 'In Progress'
            },
            {
              id: 1228,
              submittedAt: '2025-05-15',
              subject: 'IFTA Filing Issue',
              status: 'Closed'
            },
            {
              id: 1201,
              submittedAt: '2025-04-30',
              subject: 'General Billing',
              status: 'Closed'
            }
          ]
        } else if (url.startsWith('/resources')) {
          mock = {
            pdfs: [
              { id: 1, name: 'Drug & Alcohol Policy' },
              { id: 2, name: 'Vehicle Inspection Checklist' },
              { id: 3, name: 'Hours of Service Guide' }
            ],
            videos: [
              { id: 1, title: 'ELD How-To', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
              { id: 2, title: 'MVR Review Process', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
              { id: 3, title: 'IFTA Filing Tutorial', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
            ],
            templates: [
              { id: 1, name: 'Driver Qualification File Template' },
              { id: 2, name: 'Maintenance Log Template' },
              { id: 3, name: 'Audit Prep Checklist' }
            ],
            faqs: [
              { question: 'How do I submit IFTA?', answer: 'To submit an IFTA report, navigate to the Documents page and upload your IFTA PDF under Compliance category.' },
              { question: 'When is next CSA update?', answer: 'CSA updates every quarter. Next update is scheduled for 2025-07-01.' },
              { question: 'Renewing CDL online?', answer: 'You can renew your CDL online through your state DMV portal. Download our CDL renewal template under Resources → Templates.' }
            ]
          }
        } else {
          mock = null
        }

        if (!isCancelled) {
          setData(mock)
          setLoading(false)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err)
          setLoading(false)
        }
      }
    }
    fetchData()

    return () => {
      isCancelled = true
    }
  }, [url])

  return { data, loading, error }
}
