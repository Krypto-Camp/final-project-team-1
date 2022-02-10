import * as React from 'react'
import { useAccount } from 'wagmi'
import { Account, NetworkSwitcher, Connect } from "./index";

export const Header = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="header">
      <div className="footer"><Connect /></div>
      <div className="right">
        {
          (accountData?.address) && <Account />
        }
      </div>
      <NetworkSwitcher />
    </div>
  )
}