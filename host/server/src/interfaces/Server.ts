export default interface Server {
  /**
   * Starts the server and listens for incoming connections.
   */
  start(): void

  /**
   * Stops the server and closes all connections gracefully.
   */
  stop(): void
}
