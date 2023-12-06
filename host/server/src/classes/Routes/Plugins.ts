import SuperRoute from '@/classes/Routes/SuperRoute'
import ServerMethods from '@/enums/ServerMethods'
import { getQuery, getRouterParam, H3Event } from 'h3'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import PluginScopes from '@/enums/PluginScopes'
import PluginTypes from '@/enums/PluginTypes'

export default class Plugins extends SuperRoute {
  path = '/api/plugins'
  method = ServerMethods.GET

  handler = async (event: H3Event) => {
    const query = getQuery(event)

    const defaultPlugins = await this.getPluginForType(PluginScopes.DEFAULT, query.type as PluginTypes)
    const customerPlugins = await this.getPluginForType(PluginScopes.CUSTOMER, query.type as PluginTypes)

    if (query.all) {
      const plugins = [...customerPlugins]
      for (const defaultPlugin of defaultPlugins) {
        if (customerPlugins.find((customerPlugin) => customerPlugin.name === defaultPlugin.name)) {
          plugins.push({
            ...defaultPlugin,
            overwritten: true
          })
        } else {
          plugins.push(defaultPlugin)
        }
      }

      return {
        plugins
      }
    } else {
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

    if (type === PluginTypes.NAVIGATION) {
      for (const directory of directories) {
        const navigation = await readFile(path.join('plugins', scope, type, directory, 'navigation.json'), 'utf-8')

        plugins.push({
          scope: scope,
          name: directory.split('-').slice(0, directory.split('-').length - 1).join('-'),
          version: directory.split('-')[directory.split('-').length - 1],
          entry: path.join(scope, type, directory, 'navigation.json'),
          navigation: JSON.parse(navigation)
        })
      }
    } else if (type === PluginTypes.WIDGET) {
      for (const directory of directories) {
        const pack = await readFile(path.join('plugins', scope, type, directory, 'package.json'), 'utf-8')
        const packageJson = JSON.parse(pack)

        plugins.push({
          scope: scope,
          name: directory.split('-').slice(0, directory.split('-').length - 1).join('-'),
          version: directory.split('-')[directory.split('-').length - 1],
          entry: path.join(scope, type, directory, 'remote-entry.js'),
          plugin: packageJson.plugin
        })
      }

    }

    return plugins
  }

  private async getNavigationPlugin (scope: PluginScopes) {

  }
}