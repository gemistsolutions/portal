import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlayCircle } from 'lucide-react'

function VideoCard({ video }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="bg-white shadow-sm rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PlayCircle className="h-6 w-6 text-green-500" />
          <span className="font-medium">{video.title}</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="text-blue-600 hover:underline">
          Play
        </button>
      </div>

      {/* Modal */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
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
                <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
                  <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-2xl"
                      src={video.embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default VideoCard
