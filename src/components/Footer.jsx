import React from 'react'

function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gemist Compliance. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
