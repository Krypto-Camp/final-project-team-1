import { useAccount } from "wagmi";
import "./assets/style/reset.css";
import "./assets/style/index.css";
import "./assets/style/function.scss";
import "./assets/style/custom.scss";
import "./assets/style/home.scss";
import "./assets/style/profile.scss";

import { Account, Connect, NetworkSwitcher, GetContract, Section1, Section2, Section3, Section4, Section5 } from "./components";

export const App = () => {
  // const [{ data: accountData }] = useAccount();

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* <GetContract /> */}
    </>
  )
};
