import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function FAQAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <ChevronDown
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  )
}

export default FAQAccordion
