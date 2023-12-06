import {
  FSWatcher,
  watch
} from 'chokidar'
import decompress from 'decompress'
import { mkdir, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import PluginScopes from '@/enums/PluginScopes'
import PluginTypes from '@/enums/PluginTypes'
import { compareVersions } from 'compare-versions'

export default class DeploymentHandler {
  /**
   * The source where the artifacts are placed in
   * @private
   */
  private readonly source: string

  /**
   * The destination where the artifacts get deployed to
   * @private
   */
  private readonly destination: string

  /**
   * The watcher for the source directory
   * @private
   */
  private watcher: FSWatcher

  constructor (source: string, destination: string) {
    this.source = source
    this.destination = destination
  }

  /**
   * Starts the deployment handler
   */
  public start () {
    void mkdir(this.source, { recursive: true })
    void mkdir(this.destination, { recursive: true })

    this.watcher = watch(this.source, { ignored: /^\./, persistent: true })

    this.watcher.on('add', async (path) => {
      if (path.endsWith('.zip')) {
        const split = path.split('/')[path.split('/').length - 1].replace('.zip', '').split('-')
        const version = split[split.length - 1]
        const name = split.slice(2, split.length - 1).join('-')

        let scope = split[0] as PluginScopes
        switch (scope) {
          case PluginScopes.CUSTOMER:
            break
          case PluginScopes.REQUIRED:
            break
          case PluginScopes.DEFAULT:
            break
          default:
            console.warn('unknown plugin scope', scope)
            console.warn('ignoring', path)
            return
        }

        let type = split[1] as PluginTypes
        switch (type) {
          case PluginTypes.NAVIGATION:
            break
          case PluginTypes.WIDGET:
            break
          default:
            console.warn('unknown plugin type', type)
            console.warn('ignoring', path)
            return
        }

        try {
          const directories = await readdir(join(this.destination, join(scope, type)))
          for (const directory of directories) {
            const localVersion = directory.split('-')[directory.split('-').length - 1]

            if (compareVersions(version, localVersion) === 1 || compareVersions(version, localVersion) === 0) {
              await rm(join(this.destination, join(scope, type, directory)), {
                recursive: true,
                force: true
              })

              console.info(`removed ${directory} (${scope}) (${type}) from ${join(this.destination, join(scope, type, directory))}`)
            }
          }
        } catch {
          // ignore
        }

        await decompress(path, join(this.destination, join(scope, type, `${name}-${version}`)))
        await rm(path, {
          force: true
        })
        console.info(`deployed ${name}-${version} (${scope}) (${type}) to ${join(this.destination, join(scope, type, `${name}-${version}`))}`)
      } else {
        console.log('ignoring', path)
      }
    })

    console.log('DeploymentHandler started')
  }

  /**
   * Stops the deployment handler
   */
  public async stop () {
    console.log('DeploymentHandler stopped')
  }
}