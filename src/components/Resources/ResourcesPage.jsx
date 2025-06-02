import React, { useState } from 'react'
import PDFLink from './PDFLink'
import VideoCard from './VideoCard'
import FAQAccordion from './FAQAccordion'
import useFetch from '../../hooks/useFetch'

function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('pdfs')
  const { data, loading } = useFetch('/resources')

  if (loading || !data) {
    return <div>Loading resources...</div>
  }

  const { pdfs, videos, templates, faqs } = data

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Resources</h1>
      <div className="mb-6">
        <div className="inline-flex space-x-2">
          <button
            onClick={() => setActiveTab('pdfs')}
            className={`px-4 py-2 rounded ${
              activeTab === 'pdfs'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            PDFs & Policies
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded ${
              activeTab === 'videos'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded ${
              activeTab === 'templates'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded ${
              activeTab === 'faqs'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            FAQs
          </button>
        </div>
      </div>

      {activeTab === 'pdfs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pdfs.map((pdf) => (
            <PDFLink key={pdf.id} name={pdf.name} />
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <ul className="space-y-2">
          {templates.map((tpl) => (
            <li key={tpl.id} className="bg-white shadow-sm rounded-2xl p-4 flex justify-between">
              <span>{tpl.name}</span>
              <button className="text-blue-600 hover:underline">Download</button>
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQAccordion key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourcesPage
