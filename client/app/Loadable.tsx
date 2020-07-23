import React from 'react'
import Loadable, { LoadingComponentProps } from 'react-loadable'

const styles: React.CSSProperties = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

function Loading({
  isLoading,
  timedOut,
  pastDelay,
  error
}: LoadingComponentProps) {
  if (error || (isLoading && timedOut)) {
    if (typeof window !== 'undefined') {
      console.log(error)

      if (process.env.NODE_ENV === 'production') {
        window.location.reload(true)
      }
    }

    return <div style={styles}>Loading...</div>
  }

  if (isLoading && pastDelay) {
    return <div style={styles}>Please wait a bit more...</div>
  }

  return null
}

export function Load(options: { loader: () => any }) {
  const config = { ...options, delay: 2000, timeout: 40000, loading: Loading }
  return Loadable(config)
}
