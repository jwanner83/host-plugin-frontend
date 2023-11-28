import { createReadStream, createWriteStream } from 'node:fs'
import archiver from 'archiver'
import * as path from 'path'
import { mkdir, readFile } from 'node:fs/promises'
import { cwd } from 'node:process'

export default async function usePackage () {
  await new Promise(async (resolve, reject) => {
    const packageFile = await readFile(path.join(cwd(), 'package.json'))
    const { name, version, plugin: { type, location } } = JSON.parse(packageFile.toString())

    const scope = name.split('/')[0]
    const pluginName = name.split('/')[1].replace('/', '-')

    await mkdir(path.join('build'), { recursive: true })
    const output = createWriteStream(path.join('build', `${scope}-${type}-${pluginName}-${version}.zip`))
    const archive = archiver('zip')

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.warn(err)
      } else {
        console.error(err)
        reject(err)
      }
    })

    archive.on('error', function (err) {
      console.error(err)
      reject(err)
    })

    archive.pipe(output)

    if (type === 'widget') {
      archive.directory(path.join('dist', 'assets'), false)
    } else if (type === 'navigation') {
      archive.append(createReadStream(path.join('navigation.json')), { name: 'navigation.json' })
    }
    archive.append(createReadStream(path.join('package.json')), { name: 'package.json' })

    await archive.finalize()

    output.on('close', function () {
      resolve(true)
    })
  })
}