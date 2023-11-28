import HTTPServer from '@/classes/Server/HTTPServer'
import DeploymentHandler from '@/classes/Handler/DeploymentHandler'

const httpServer = new HTTPServer()
httpServer.start()

const deploymentHandler = new DeploymentHandler(
  'deploy',
  'plugins'
)
deploymentHandler.start()

process.on('SIGTERM', async () => {
  await httpServer.stop()
  await deploymentHandler.stop()
  console.info('Server stopped.')
  process.exit(0)
})
