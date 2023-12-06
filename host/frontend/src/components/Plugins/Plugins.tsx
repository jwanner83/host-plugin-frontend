import { Fragment, Suspense } from 'react'
import Plugin from './Plugin.tsx'
import environment from '../../../environment.ts'
import PluginsItem from '../../interfaces/PluginsItem.ts'

interface Props {
  plugins: PluginsItem[]
  path: string
}

export default function Plugins ({ path, plugins }: Props) {
  return <Suspense fallback="loading">
    <div className="flex p-12 gap-5">
      {plugins && plugins.filter(plugin => plugin.plugin.location.includes(path)).map((plugin, index) => {
        return <Fragment key={index}>
          <Plugin url={`${environment.PLUGIN_SERVER}/api/plugins/${plugin.entry}`} scope="default"
                  module="./Module"/>
        </Fragment>
      })}
    </div>
  </Suspense>
}