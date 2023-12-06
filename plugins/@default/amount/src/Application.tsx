import { useEffect, useState } from 'react'
import './styling/style.css'

export default function Application() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.addEventListener('@default/amount/amount', handleCountChange)

    return () => {
      document.removeEventListener('@default/amount/amount', handleCountChange)
    }
  }, [count])

  const handleCountChange = (event: any) => {
    setCount(event.detail + count)
  }

  return (
    <div className="bg-slate-200 p-5 w-full">
      <h2 className="mb-0">Amount</h2>
      <p className="mt-2">Change the amount in the Increment plugin and see the changes here.</p>
      <div className="card">
        {count}
      </div>
    </div>
  )
}
