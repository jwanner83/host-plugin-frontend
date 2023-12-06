import { memo, Suspense } from 'react'
import useGetFederatedPlugin from '../../hooks/useGetFederatedPlugin.ts'

interface Props {
  url: string
  scope: string
  module: string
}

function Plugin ({ url, scope, module }: Props) {
  const { Component } = useGetFederatedPlugin(url, scope, module)
  return <Suspense fallback={false}>
    {Component && <Component/>}
  </Suspense>
}

export default memo(Plugin)