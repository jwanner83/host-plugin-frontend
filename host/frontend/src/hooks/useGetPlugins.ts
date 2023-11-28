import { useEffect, useState } from 'react'
import environment from '../../environment.ts'
import PluginsItem from '../interfaces/PluginsItem.ts'
import PluginTypes from '../enums/PluginTypes.ts'

interface Props {
  type?: PluginTypes
}

export default function useGetPlugins ({ type }: Props) {
  const [loading, setLoading] = useState(true)
  const [plugins, setPlugins] = useState<PluginsItem[]>()

  useEffect(() => {
    fetch(`${environment.PLUGIN_SERVER}/api/plugins${type ? `?type=${type}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        const plugins: PluginsItem[] = []

        Object.keys(data.plugins).forEach((key) => {
          data.plugins[key].forEach((plugin: PluginsItem) => {
            plugins.push(plugin)
          })
        })
        setPlugins(plugins)
        setLoading(false)
      })
  }, [])

  return { loading, plugins }
}