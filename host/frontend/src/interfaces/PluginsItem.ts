import NavigationType from './NavigationType.ts'
import PluginTypes from '../enums/PluginTypes.ts'
import PluginScopes from '../enums/PluginScopes.ts'

export default interface PluginsItem {
  name: string
  entry: string
  version: string
  navigation: NavigationType
  scope: PluginScopes
  plugin: {
    type: PluginTypes
    location: string[]
  }
  overwritten?: boolean
}