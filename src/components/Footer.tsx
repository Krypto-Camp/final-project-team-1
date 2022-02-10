import { useAccount } from 'wagmi'
import { Account, NetworkSwitcher, Connect } from "./index";


export const Footer = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="footer">
      {
        !accountData?.address &&
        <Connect />
      }
      {
        (accountData?.address) && <><Account /><NetworkSwitcher /></>

      }
    </div>
  )
}