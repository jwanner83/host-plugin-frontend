import Navigation from '../Navigation/Navigation.tsx'

export default function Header () {
  return <div className="py-6 px-8 bg-slate-200">
    <h1 className="mb-0">Host</h1>
    <p className="mt-3">The host application</p>

    <Navigation />
  </div>
}