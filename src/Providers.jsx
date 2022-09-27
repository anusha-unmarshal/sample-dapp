import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { RecoilRoot } from "recoil";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 9000;
  return library;
}

const client = new ApolloClient({
  uri: "https://dep-w7dbbw2konwrmfhb-graphql.prod.unmarshal.com/stakingcon_kurxy/graphql",
  cache: new InMemoryCache(),
});

const Providers = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot>{children}</RecoilRoot>
      </Web3ReactProvider>
    </ApolloProvider>
  );
};

export default Providers;
