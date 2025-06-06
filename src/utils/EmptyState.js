export function EmptyState({ label, actionText, onAction }) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6 text-center text-gray-500">
        {label}
        {actionText && <div className="mt-4"><button onClick={onAction} className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]">{actionText}</button></div>}
      </div>
    )
  }