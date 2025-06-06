import { useState, useEffect } from "react"
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
export function AuditPrepCenter(){
    const [checklist,setChecklist]=useState(null)
    const [generating,setGenerating]=useState(false)
  
    useEffect(()=>{
      // TODO: fetch checklist status (cloud function?)
      setChecklist([
        {item:'Driver Roster (CSV)',           ready:true},
        {item:'Last 6 mo HOS ELD Logs',        ready:false,  note:'2 days missing'},
        {item:'Vehicle Maint. Files',          ready:true},
        {item:'Accident Register',             ready:false},
        {item:'Random Drug Program Docs',      ready:false, note:'Pending lab results'},
      ])
    },[])
  
    if(!checklist) return <div>Loading audit checklist…</div>
  
    async function generatePacket(){
      setGenerating(true)
      // TODO: server‑side ZIP creation
      setTimeout(()=>{ alert('Audit packet ready for download (stub).'); setGenerating(false) },2000)
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Audit Prep Center</h1>
          <button onClick={generatePacket} disabled={generating} className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#082234]">
            {generating ? 'Generating…' : 'Generate Audit Packet'}
          </button>
        </div>
        <div className="bg-white shadow-sm rounded-2xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checklist Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {checklist.map(c=> (
                <tr key={c.item} className={c.ready? '' : 'bg-yellow-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.ready ? <StatusGood/> : <StatusWarn/>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.note||''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  function StatusGood(){return <span className="inline-flex items-center text-accentGreen"><CheckCircle2 className="mr-1" size={16}/> Ready</span>}
  function StatusWarn(){return <span className="inline-flex items-center text-accentYellow"><XCircle className="mr-1" size={16}/> Needs attention</span>}
  