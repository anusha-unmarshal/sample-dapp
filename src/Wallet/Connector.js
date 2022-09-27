import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby-light.eth.linkpool.io/"
);

const doNothing = () => void {};
export const metamaskConnector = new InjectedConnector({
  supportedChainIds: [4],
});

export function useConnector() {
  const {
    activate,
    library,
    active: isActive,
    account: walletAddress,
  } = useWeb3React();
  const getSigner = () => library?.getSigner();
  const getProvider = () => provider;

  const connectWallet = () => {
    activate(metamaskConnector, undefined, true)
      .then(doNothing)
      .catch((e) => {
        console.log(e);
      });
  };

  return { connectWallet, getSigner, getProvider, isActive, walletAddress };
}
