import ServerMethods from '@/enums/ServerMethods'
import { H3Event, Router, defineEventHandler, handleCors } from 'h3'

export default class SuperRoute {
  /**
   * The HTTP method to use for this route.
   */
  method: ServerMethods

  /**
   * The path to use for this route.
   */
  path: string

  /**
   * The handler to use for this route.
   */
  handler: (event: H3Event) => Promise<unknown> | unknown

  /**
   * Registers this route to the given router.
   * @param router
   */
  register(router: Router) {
    router[this.method](this.path, defineEventHandler((event: H3Event) => {
      handleCors(event, {
        origin: '*',
      })
      return this.handler(event)
    }))
  }
}
