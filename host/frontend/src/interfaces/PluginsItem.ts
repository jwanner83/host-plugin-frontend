import PluginTypes from '../enums/PluginTypes.ts'

export default interface PluginsItem {
  type: PluginTypes,
  name: string,
  entry: string,
}