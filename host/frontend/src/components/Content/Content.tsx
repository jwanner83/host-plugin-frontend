import useGetPlugins from '../../hooks/useGetPlugins.ts'
import PluginTypes from '../../enums/PluginTypes.ts'
import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Plugins from '../Plugins/Plugins.tsx'
import Admin from '../Admin/Admin.tsx'

export default function Content () {
  const { plugins: navigations } = useGetPlugins({
    type: PluginTypes.NAVIGATION
  })
  const { plugins } = useGetPlugins({
    type: PluginTypes.WIDGET
  })

  return <Suspense fallback="loading">
    <Routes>
      {navigations && navigations[0].navigation.pages.map(page =>
        <Route key={page.url} path={page.url} element={<div>
          <Plugins plugins={plugins || []} path={page.url} />
        </div>}/>
      )}

      <Route path="/admin" element={<Admin />}/>
    </Routes>
  </Suspense>
}