import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { RecoilRoot } from "recoil";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 9000;
  return library;
}

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>{children}</RecoilRoot>
    </Web3ReactProvider>
  );
};

export default Providers;
