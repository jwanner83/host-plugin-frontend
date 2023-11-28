import { Fragment, Suspense } from 'react'
import useGetPlugins from '../hooks/useGetPlugins.ts'
import Plugin from './Plugin.tsx'
import environment from '../../environment.ts'
import PluginTypes from '../enums/PluginTypes.ts'

export default function Plugins () {
  const { plugins, loading } = useGetPlugins()

  return <Suspense fallback={loading ? 'loading plugins' : 'no plugins'}>
    {plugins && plugins.filter(plugin => plugin.type !== PluginTypes.REQUIRED).map((plugin, index) => {
      return <Fragment key={index}>
        <Plugin url={`${environment.PLUGIN_SERVER}/api/plugins/${plugin.entry}`} scope="default" module="./Module" />
      </Fragment>
    })}
  </Suspense>
}