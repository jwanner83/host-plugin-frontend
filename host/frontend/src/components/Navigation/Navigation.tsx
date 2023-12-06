import useGetPlugins from '../../hooks/useGetPlugins.ts'
import PluginTypes from '../../enums/PluginTypes.ts'
import { Link } from 'react-router-dom'

export default function Navigation () {
  const { plugins, loading } = useGetPlugins({
    type: PluginTypes.NAVIGATION
  })

  return <div className="flex justify-between">
    <div className="flex gap-3">
      {loading && <>
        {Array.from(Array(3).keys()).map((index) =>
          <div key={index}
               className="text-transparent bg-gray-400/50 animate-pulse rounded w-[70px]">.</div>
        )}
      </>}
      {plugins && plugins[0].navigation.pages.map(page =>
        <div key={page.url}>
          <Link to={page.url}>{page.title}</Link>
        </div>
      )}
    </div>
    <div>
      <Link to="/admin">Admin</Link>
    </div>
  </div>
}