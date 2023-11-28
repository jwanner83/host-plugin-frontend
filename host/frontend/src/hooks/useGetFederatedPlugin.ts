import { Container } from '../interfaces/Container.ts'
import { lazy, useEffect, useState } from 'react'


function loadModule (url: string) {
  try {
    return import(/* @vite-ignore */ url)
  } catch (e) {
    console.log(e)
  }
  return null
}

const componentCache = new Map()

export default function useGetFederatedPlugin (url: string, scope: any, module: string) {
  const key = `${url}-${scope}-${module}`
  const [Component, setComponent] = useState<any>(null)

  useEffect(() => {
    if (Component) setComponent(null)
  }, [key])

  useEffect(() => {
    if (!Component) {
      const Comp = lazy(async () => {
        const container: Container = await loadModule(url)
        container.init(scope)
        const factory = await container.get(module);
        const Module = await factory();
        return Module
      })
      componentCache.set(key, Comp)
      setComponent(Comp)
    }
  }, [Component, key])

  return { Component }
}

