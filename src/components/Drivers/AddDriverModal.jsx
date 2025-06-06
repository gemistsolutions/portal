import React, { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'


export function AddDriverModal({ onClose, onSaved }) {
    const [saving,setSaving]=useState(false)
    const [name,setName]=useState('')
    // TODO: more fields
    async function save(){
      setSaving(true)
      // TODO: add to Firestore
      setTimeout(()=>{ setSaving(false); onSaved() },800)
    }
    return (
      <Dialog open={true} onClose={onClose} className="relative z-40">
        <div className="fixed inset-0 bg-black/25" aria-hidden="true"/>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-medium mb-4">Add / Edit Driver</h3>
            <label className="block mb-2 text-sm">Full Name</label>
            <input className="w-full border border-gray-300 px-3 py-2 rounded mb-4" value={name} onChange={e=>setName(e.target.value)} />
            <div className="flex justify-end space-x-3">
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 bg-primary text-white rounded hover:bg-[#082234] disabled:opacity-50">
                {saving? 'Saving…':'Save'}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }