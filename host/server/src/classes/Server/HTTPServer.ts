import Server from '@/interfaces/Server'
import {
  App,
  Router,
  createApp,
  createRouter,
  toNodeListener, fromNodeMiddleware, handleCors
} from 'h3'
import serveStatic from 'serve-static'
import { Server as NodeServer, createServer } from 'node:http'
import Plugins from '@/classes/Routes/Plugins'
import path from 'node:path'

export default class HTTPServer implements Server {
  private readonly app: App
  private readonly router: Router
  private server: NodeServer

  constructor () {
    this.app = createApp()
    this.router = createRouter()
    this.app.use(this.router)

    this.registerRoutes()
    this.registerStatic()
  }

  private registerRoutes (): void {
    new Plugins().register(this.router)
  }

  private registerStatic (): void {
    this.app.use('/api/plugins', fromNodeMiddleware(serveStatic(path.join('plugins'), {
      setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
      }
    })))
  }

  start (): void {
    this.server = createServer(toNodeListener(this.app)).listen(
      3001
    )
    console.info(
      `HTTP Server started on port 3001`
    )
  }

  async stop (): Promise<void> {
    await new Promise((resolve) => this.server.close(resolve))
    console.info('HTTP Server stopped.')
  }
}
