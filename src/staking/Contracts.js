import { Contract } from "@ethersproject/contracts";
import StakingABI from "../staking-contract/staking.abi.json";
import ERC20ABI from "../staking-contract/erc20.abi.json";

const useContracts = () => {
  const contractAddress = process.env.REACT_APP_STAKING_CONTRACT_ADDRESS;
  const stakingToken = process.env.REACT_APP_STAKING_TOKEN_ADDRESS;
  const getStakingContract = (signer) =>
    new Contract(contractAddress, StakingABI, signer);
  const getTokenContract = (signer) =>
    new Contract(stakingToken, ERC20ABI, signer);
  return {
    getTokenContract,
    getStakingContract,
    unmarshalToken: stakingToken,
  };
};

export default useContracts;
