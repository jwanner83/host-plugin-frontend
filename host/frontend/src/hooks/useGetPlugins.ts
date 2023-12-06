import { useEffect, useState } from 'react'
import environment from '../../environment.ts'
import PluginsItem from '../interfaces/PluginsItem.ts'
import PluginTypes from '../enums/PluginTypes.ts'

interface Props {
  type: PluginTypes
  all?: boolean
}

export default function useGetPlugins ({ type, all }: Props) {
  const [loading, setLoading] = useState(true)
  const [plugins, setPlugins] = useState<PluginsItem[]>()

  useEffect(() => {
    fetch(`${environment.PLUGIN_SERVER}/api/plugins?type=${type}${all ? '&all=true' : ''}`)
      .then((res) => res.json())
      .then((data) => {
        if (type === PluginTypes.NAVIGATION && data.plugins.length > 1) {
          console.error('More than one navigation plugin found. This is not supported.')
        } else {
          setPlugins(data.plugins)
          setLoading(false)
        }
      })
  }, [])

  return { loading, plugins }
}