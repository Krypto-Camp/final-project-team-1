import * as React from 'react'
import { useConnect } from 'wagmi'

export const Connect = () => {
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  return (
    <div>
      <div className="btns">
        {connectors.map((x) => (
          <div className="connect-btn" disabled={!x.ready} key={x.name} onClick={() => connect(x)}>
            {x.name}
            {!x.ready && ' (unsupported)'}
            {loading && x.name === connector?.name && '…'}
          </div>
        ))}
      </div>
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </div>
  )
}
