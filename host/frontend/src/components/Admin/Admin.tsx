import PluginTypes from '../../enums/PluginTypes.ts'
import useGetPlugins from '../../hooks/useGetPlugins.ts'
import AdminItem from './AdminItem.tsx'

export default function Admin () {
  const { plugins } = useGetPlugins({
    type: PluginTypes.WIDGET,
    all: true
  })
  const { plugins: navigations } = useGetPlugins({
    type: PluginTypes.NAVIGATION,
    all: true
  })

  return <div className="p-12">
    <div className="bg-slate-200 p-5">
    <h1 className="text-3xl">Admin</h1>
    <div>
      <h2 className="text-xl">Navigations</h2>
      <ul>
       {navigations?.map((item) => <AdminItem key={`${item.scope}/${item.name}`} item={item} />)}
      </ul>

      <h2 className="text-xl">Widgets</h2>
      <ul>
        {plugins?.map((item) => <AdminItem key={`${item.scope}/${item.name}`} item={item} />)}
      </ul>
    </div>
  </div>
  </div>
}