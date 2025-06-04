import React, { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// Firebase imports
import { AuthContext } from '../../auth/AuthContext'
import { storage, db } from '../../Firebase'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function UploadModal({ onClose, onUploaded }) {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('Driver')
  const [name, setName] = useState('')
  const [expiration, setExpiration] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  async function handleUpload(e) {
    e.preventDefault()
    setError('')

    if (!file) {
      setError('Please select a file first.')
      return
    }

    if (!user) {
      setError('You must be logged in to upload.')
      return
    }

    setUploading(true)

    try {
      // Build a unique path in Storage: e.g. "documents/{user.uid}/{timestamp}_{filename}"
      const timestamp = Date.now()
      const safeFileName = file.name.replace(/\s+/g, '_')
      const path = `documents/${user.uid}/${timestamp}_${safeFileName}`

      // Create a storage reference
      const sRef = storageRef(storage, path)

      // Start upload
      const uploadTask = uploadBytesResumable(sRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track progress %
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(percent)
        },
        (err) => {
          setError('Upload failed: ' + err.message)
          setUploading(false)
        },
        async () => {
          // Once upload is complete, get the Download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Determine “status” based on expiration date:
          const expiresAtDate = new Date(expiration)
          const now = new Date()
          const msDiff = expiresAtDate - now
          let status = 'Valid'
          if (msDiff <= 0) status = 'Expired'
          else if (msDiff <= 1000 * 60 * 60 * 24 * 30) status = 'Expiring' // <30 days

          // Add a document to Firestore under "documents" collection:
          await addDoc(collection(db, 'documents'), {
            companyId: user.uid,
            name: name.trim(),
            category,
            expiresAt: serverTimestamp(expiresAtDate),
            status,
            uploadedOn: serverTimestamp(),
            url: downloadURL,
            path, // so we can delete from Storage later
          })

          // Notify parent that upload succeeded
          // Notify parent, then immediately close the modal
          if (onUploaded) onUploaded()
          onClose()
          // (Optional) if you want to reset fields in case modal re-opens later:
          setFile(null)
          setName('')
          setCategory('Driver')
          setExpiration('')
          setProgress(0)
          setUploading(false)
        }
      )
    } catch (err) {
      console.error('Error during upload:', err)
      setError('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition transform ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition transform ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl px-6 py-8 shadow-xl max-w-md w-full">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Upload New Document
                </Dialog.Title>
                {error && (
                  <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
                    {error}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleUpload}>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Document Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    >
                      <option>Driver</option>
                      <option>Vehicle</option>
                      <option>Compliance</option>
                      <option>CSAreport</option>
                      <option>IFTA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Choose File
                    </label>
                    <input
                      type="file"
                      accept=".pdf, .xlsx, .docx, .jpg, .png"
                      onChange={(e) => {
                        setFile(e.target.files[0])
                        setError('')
                      }}
                      required
                      className="w-full"
                    />
                  </div>
                  {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={uploading}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-[#082234] disabled:opacity-50"
                    >
                      {uploading ? `Uploading (${progress}%)…` : 'Upload'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default UploadModal
