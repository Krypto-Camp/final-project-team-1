import * as React from "react";
import * as ReactDOM from "react-dom";
import { providers } from "ethers";
import { Header, Profile, Footer } from "./components";

// Imports
import { Connector, Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

import { App } from "./App";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// Get environment variables
// const alchemy = import.meta.env.VITE_ALCHEMY_ID as string
// const etherscan = import.meta.env.VITE_ETHERSCAN_API_KEY as string
const infuraId = import.meta.env.VITE_INFURA_ID as string;

// Pick chains
const chains = [chain.hardhat, ...defaultChains];
// console.log(chains);
const defaultChain = chain.mainnet;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "wagmi",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

// Set up providers
const provider = ({ chainId, connector }: ProviderConfig) =>
  chainId == 31337
    ? new providers.JsonRpcProvider(
        connector?.chains.find((x) => x.id == 31337)?.rpcUrls[0]
      )
    : providers.getDefaultProvider(
        isChainSupported(chainId) ? chainId : defaultChain.id,
        {
          // alchemy,
          // etherscan,
          infuraId,
        }
      );
// const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
//   isChainSupported(chainId)
//     ? new providers.InfuraWebSocketProvider(chainId, infuraId)
//     : undefined

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      // webSocketProvider={webSocketProvider}
    >
      <BrowserRouter>
        <Header />
        <div className="bg-container">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
