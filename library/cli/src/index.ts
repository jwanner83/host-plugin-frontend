import args from 'args'
import usePackage from './Actions/usePackage'

args
  .command('package', 'Package a plugin as an archive.', async () => {
    console.log('packaging')
    await usePackage()
    console.log('packaging done')
  })

args.parse(process.argv)