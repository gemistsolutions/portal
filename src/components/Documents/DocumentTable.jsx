// src/components/Documents/DocumentTable.jsx
import React, { useState, useEffect, useContext } from 'react'
import { formatDate } from '../../utils/formatDate'
import { Download, Trash2, RefreshCw } from 'lucide-react'

// Firestore + Firebase Storage imports
import { AuthContext } from '../../auth/AuthContext'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,     // ← requires Firestore v9.19+
  deleteDoc,
  doc as firestoreDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { db, storage } from '../../Firebase'

function DocumentTable({ filter, refreshKey }) {
  const { user } = useContext(AuthContext)
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState(null)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (!user) return

    // Reset state on user or filter or refreshKey change
    setDocs([])
    setLastVisible(null)
    setHasMore(false)
    setLoading(true)

    async function loadDocuments() {
      try {
        // 1) Fast-count to see if ANY docs exist for this user.
        //    This returns a COUNT of matching documents (no data fetched).
        const countQuery = query(
          collection(db, 'documents'),
          where('companyId', '==', user.uid)
        )
        const snapshot = await getCountFromServer(countQuery)
        const totalCount = snapshot.data().count ?? 0

        if (totalCount === 0) {
          // No documents at all — skip the full fetch
          setDocs([])        // empty array
          setHasMore(false)  // nothing to page
          setLoading(false)  // turn off spinner immediately
          return
        }

        // 2) At least one doc exists → run the real paged fetch (limit 30)
        const docsRef = collection(db, 'documents')
        const firstPageQuery = query(
          docsRef,
          where('companyId', '==', user.uid),
          orderBy('uploadedOn', 'desc'),
          limit(30)
        )
        const firstSnap = await getDocs(firstPageQuery)
        const firstItems = firstSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        setDocs(firstItems)
        setLastVisible(firstSnap.docs[firstSnap.docs.length - 1])
        // If we fetched exactly 30, maybe there is a next page
        setHasMore(firstSnap.docs.length === 30)
      } catch (err) {
        console.error('Error loading documents:', err)
        // If something goes wrong, we still want to hide the spinner so user sees an error or empty state
        setDocs([])
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    loadDocuments()
  }, [user, filter, refreshKey])

  // Handler to fetch the next “page” of 30 docs
  async function fetchNextPage() {
    if (!lastVisible || !user) return
    setLoading(true)
    try {
      const docsRef = collection(db, 'documents')
      const nextQuery = query(
        docsRef,
        where('companyId', '==', user.uid),
        orderBy('uploadedOn', 'desc'),
        startAfter(lastVisible),
        limit(30)
      )
      const nextSnap = await getDocs(nextQuery)
      const nextItems = nextSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setDocs((prev) => [...prev, ...nextItems])
      setLastVisible(nextSnap.docs[nextSnap.docs.length - 1] || null)
      setHasMore(nextSnap.docs.length === 30)
    } catch (err) {
      console.error('Error fetching next page:', err)
    } finally {
      setLoading(false)
    }
  }

  // Delete both from Storage and Firestore
  async function handleDelete(docItem) {
    if (
      !window.confirm(
        `Delete “${docItem.name}” and its file forever? This cannot be undone.`
      )
    )
      return

    try {
      // 1) Delete file from Storage
      const fileRef = storageRef(storage, docItem.path)
      await deleteObject(fileRef)

      // 2) Delete Firestore metadata
      await deleteDoc(firestoreDoc(db, 'documents', docItem.id))

      // 3) Remove from local state so the row disappears instantly
      setDocs((prev) => prev.filter((d) => d.id !== docItem.id))
    } catch (err) {
      console.error('Error deleting document:', err)
      alert('Failed to delete document. Try again.')
    }
  }

  // If still loading (and count was > 0), show spinner
  if (loading) {
    return <div>Loading documents...</div>
  }

  // If loading is false AND docs is empty → “No documents” state
  if (!docs.length) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6 text-center text-gray-500">
        You have no documents uploaded.
      </div>
    )
  }

  // Otherwise, render the table of rows
  const filtered = filter
    ? docs.filter((docItem) =>
        docItem.category.toLowerCase().includes(filter.toLowerCase())
      )
    : docs

  return (
    <div>
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
            {filtered.map((docItem) => (
              <tr key={docItem.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {docItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {docItem.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(docItem.expiresAt.toDate())}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {docItem.status === 'Valid' && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentGreen text-white">
                      Valid
                    </span>
                  )}
                  {docItem.status === 'Expiring' && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentYellow text-white">
                      Expiring
                    </span>
                  )}
                  {docItem.status === 'Expired' && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accentRed text-white">
                      Expired
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(docItem.uploadedOn.toDate())}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <div className="flex items-center justify-center space-x-3">
                    <a
                      href={docItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      <Download size={18} title="Download" />
                    </a>
                    <button
                      onClick={() => handleDelete(docItem)}
                      className="hover:text-red-600"
                    >
                      <Trash2 size={18} title="Delete" />
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="hover:text-blue-600"
                    >
                      <RefreshCw size={18} title="Reupload" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* “Load More” button if there are more than 30 docs */}
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={fetchNextPage}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default DocumentTable
