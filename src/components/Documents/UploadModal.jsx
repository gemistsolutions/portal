import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function UploadModal({ onClose }) {
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('Driver')
  const [name, setName] = useState('')
  const [expiration, setExpiration] = useState('')

  function handleUpload(e) {
    e.preventDefault()
    // In a real app, you'd send multipart/form-data to /api/documents
    alert(`Uploading ${name} as ${category}, expires at ${expiration}`)
    onClose()
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
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-[#082234]"
                    >
                      Upload
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
