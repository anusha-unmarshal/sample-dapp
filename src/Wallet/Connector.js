import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const doNothing = () => void {};
export const metamaskConnector = new InjectedConnector({
  supportedChainIds: [4], //rinkeby-testnet
});

export function useConnector() {
  const {
    activate,
    library,
    active: isActive,
    account: walletAddress,
  } = useWeb3React();
  const getSigner = () => library?.getSigner();

  const connectWallet = () => {
    activate(metamaskConnector, undefined, true)
      .then(doNothing)
      .catch((e) => {
        console.log(e);
      });
  };

  return { connectWallet, getSigner, isActive, walletAddress };
}
