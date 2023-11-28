export interface Container {
  init (shareScope: string): void;
  get (module: string): () => Promise<any>
}