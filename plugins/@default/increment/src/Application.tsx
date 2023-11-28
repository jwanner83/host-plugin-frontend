import './styling/style.css'

export default function Application() {

  const increment = () => {
    document.dispatchEvent(new CustomEvent('@default/amount/amount', { detail: 1 }))
  }

  return (
    <div className="bg-slate-200 p-5">
      <h2 className="mb-0">Increment</h2>
      <p className="mt-2">Change the amount in the Home plugin and see the changes here.</p>
      <div className="card">
        <button onClick={() => increment()}>
          incremenet count on amount
        </button>
      </div>
    </div>
  )
}
