// Simple function to format an ISO‐format date string to "MMM dd, yyyy"
export function formatDate(isoString) {
    const date = new Date(isoString)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }
  