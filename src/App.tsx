import { useAccount } from "wagmi";
import "./assets/style/reset.css";
import "./assets/style/index.css";

import { Account, Connect, NetworkSwitcher, GetContract } from "./components";

export const App = () => {
  const [{ data: accountData }] = useAccount();

  return accountData?.address ? (
    <>
      <div className="container">
        <GetContract />
      </div>
    </>
  ) : ''
};
