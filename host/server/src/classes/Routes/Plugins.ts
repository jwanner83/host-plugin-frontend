import SuperRoute from '@/classes/Routes/SuperRoute'
import ServerMethods from '@/enums/ServerMethods'
import { H3Event } from 'h3'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import PluginScopes from '@/enums/PluginScopes'
import PluginTypes from '@/enums/PluginTypes'

export default class Plugins extends SuperRoute {
  path = '/api/plugins'
  method = ServerMethods.GET

  handler = async (event: H3Event) => {
    const defaultPlugins = await this.getPlugins(PluginScopes.DEFAULT)
    const customerPlugins = await this.getPlugins(PluginScopes.CUSTOMER)

    const plugins = [...customerPlugins]
    for (const defaultPlugin of defaultPlugins) {
      if (!customerPlugins.find((customerPlugin) => customerPlugin.name === defaultPlugin.name)) {
        plugins.push(defaultPlugin)
      }
    }

    return {
      plugins
    }
  }

  private async getPlugins (scope: PluginScopes) {
    if (await stat(path.join('plugins', scope)).catch(() => false) === false) {
      return []
    }

    const navigationPlugins = await this.getPluginForType(scope, PluginTypes.NAVIGATION)
    const widgetPlugins = await this.getPluginForType(scope, PluginTypes.WIDGET)

    return [...navigationPlugins, ...widgetPlugins]
  }


  private async getPluginForType (scope: PluginScopes, type: PluginTypes) {
    const plugins = []

    if (await stat(path.join('plugins', scope, type)).catch(() => false) === false) {
      return []
    }

    const files = await readdir(path.join('plugins', scope, type))
    const directories = files.filter(async (file) => {
      const stats = await stat(path.join('plugins', scope, type, file))
      return stats.isDirectory()
    })

    plugins.push(...directories.map((directory) => ({
      type: scope,
      name: directory.split('-').slice(0, directory.split('-').length - 1).join('-'),
      version: directory.split('-')[0],
      entry: path.join(scope, type, directory, 'remote-entry.js')
    })))

    return plugins
  }
}