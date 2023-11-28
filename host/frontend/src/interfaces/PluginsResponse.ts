import PluginsItem from './PluginsItem.ts'

export default interface PluginsResponse {
  '@required': PluginsItem[],
  '@default': PluginsItem[],
  '@customer': PluginsItem[]
}