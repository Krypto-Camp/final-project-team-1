import * as React from 'react'
import { useProvider, useContract, useContractRead, useContractWrite } from 'wagmi'

import { atomic_token, bayc_contract } from '../config/contract'


export const GetContract = () => {
  const provider = useProvider()

  const [{ data: symbol, error, loading }, read] = useContractRead({
    addressOrName: atomic_token.address,
    contractInterface: atomic_token.abi,
    signerOrProvider: provider,
  }, 'symbol')

  const [{ }, mintApe] = useContractWrite({
    addressOrName: bayc_contract.address,
    contractInterface: bayc_contract.abi,
    signerOrProvider: provider,
  }, 'mintApe')

  const baycContract = useContract({
    addressOrName: bayc_contract.address,
    contractInterface: bayc_contract.abi,
    signerOrProvider: provider,
  })

  const handleMint = async () => {
    const result = await mintApe({
      args: [1],
      overrides: {
        from: "0xFF655f91EED51627936DCCF07DAd641B7130Fb8F",
        gasLimit: 203000,
        gasPrice: 60000000000,
        value: 100000000000000,
      }
    })

    console.log(result)
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>connect contract and get token symbol: {symbol}</div>
      <button onClick={handleMint}>Mint 1 Ape from external contract (AMA課程的)</button>
      <a href={`https://rinkeby.etherscan.io/address/${baycContract.address}`} target="_blank">bayc合約地址：{baycContract.address}</a>
    </div>
  )
}
