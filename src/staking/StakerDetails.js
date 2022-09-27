import useContracts from "./Contracts";
import { useConnector } from "../Wallet/Connector";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { ethers } from "ethers";
import { hexaToBigNumber } from "./Converters";
import { useAllowancesUpdater } from "./Approval";
import { BigNumber } from "bignumber.js";
import { useLoadingIndicatorUpdater } from "./LoadingIndicator";

export const stakerInfoState = atom({
  key: "Staker_details",
  default: {
    balance: new BigNumber(0),
    stakeAmount: new BigNumber(0),
    claimed: new BigNumber(0),
    stakeStatus: false,
  },
});

const StakerInfoSetter = () => {
  return useSetRecoilState(stakerInfoState);
};

export const StakerInfoReader = () => {
  return useRecoilValue(stakerInfoState);
};

const rewardsState = atom({
  key: "Claimable_rewards",
  default: {
    claimableTokens: new BigNumber(0),
  },
});

const RewardInfoSetter = () => {
  return useSetRecoilState(rewardsState);
};

export const RewardInfoReader = () => {
  return useRecoilValue(rewardsState);
};

const useStakerDetails = () => {
  const { getSigner, walletAddress } = useConnector();
  const { getTokenContract, getStakingContract } = useContracts();
  const stakerInfoSetter = StakerInfoSetter();
  const setRewardsInfo = RewardInfoSetter();
  const setAllowance = useAllowancesUpdater();
  const updateLoadingStatus = useLoadingIndicatorUpdater();

  const getTokenBalance = () => {
    const tokenContract = getTokenContract(getSigner());
    tokenContract.balanceOf(walletAddress).then((balance) => {
      stakerInfoSetter((state) => ({
        ...state,
        balance: hexaToBigNumber(balance, 8),
      }));
    });
  };

  const handleTransaction = async (transaction, successMessage) => {
    try {
      const trx = await transaction();
      await trx.wait();
      alert(successMessage);
    } catch (e) {
      console.log(e);
      if (e.code === 4001) {
        alert("User denied the transaction!");
        return;
      }
      console.warn(e);
      alert("Transaction Failed! " + (e.message || e?.message?.error || ""));
    }
  };

  const stake = async (amount) => {
    const stakingContract = getStakingContract(getSigner());
    console.log("Stake", amount);
    updateLoadingStatus((state) => ({ ...state, isStaking: true }));

    const formattedAmount = ethers.utils.parseUnits(amount.toString(), 8);
    await handleTransaction(
      () => stakingContract.stake(formattedAmount),
      "Stake completed"
    );
    updateLoadingStatus((state) => ({ ...state, isStaking: false }));
    getStakerInfo();
    // getStakingDetails();
    getTokenBalance();
  };

  const getAllowance = async () => {
    const tokenContract = getTokenContract(getSigner());
    const stakingContract = getStakingContract(getSigner());
    const allowance = await tokenContract.allowance(
      walletAddress,
      stakingContract.address
    );

    const allowanceValue = hexaToBigNumber(allowance, 8);
    setAllowance(allowanceValue);
  };

  const getStakerInfo = () => {
    const stakingContract = getStakingContract(getSigner());
    stakingContract
      .stakeMap(walletAddress)
      .then(({ stakeAmount, claimed, stakeStatus }) => {
        stakerInfoSetter((state) => ({
          ...state,
          stakeAmount: hexaToBigNumber(stakeAmount, 8),
          claimed: hexaToBigNumber(claimed, 0),
          stakeStatus: stakeStatus,
        }));
      });
  };

  const getClaimableTokens = () => {
    const stakingContract = getStakingContract(getSigner());
    stakingContract
      .getClaimableToken(walletAddress)
      .then(({ claimableTokens }) => {
        console.log(walletAddress);
        console.log(claimableTokens);
        setRewardsInfo((state) => ({
          ...state,
          claimableTokens: hexaToBigNumber(claimableTokens, 0),
        }));
      })
      .catch((e) => console.log(e));
  };

  const getApproval = async () => {
    const tokenContract = getTokenContract(getSigner());
    const stakingContract = getStakingContract(getSigner());
    updateLoadingStatus((state) => ({ ...state, isApproving: true }));
    const totalSupply = await tokenContract.totalSupply();

    await handleTransaction(
      () => tokenContract.approve(stakingContract.address, totalSupply),
      "Approved"
    );

    updateLoadingStatus((state) => ({ ...state, isApproving: false }));
    await getAllowance();
  };

  async function unstake() {
    updateLoadingStatus((state) => ({ ...state, isUnstaking: true }));
    const stakingContract = getStakingContract(getSigner());
    await handleTransaction(
      () => stakingContract.unstake(),
      "Unstaked successfully"
    );
    await handleTransaction(
      () => stakingContract.withdrawFromPool(),
      "Withdraw completed"
    );
    updateLoadingStatus((state) => ({ ...state, isUnstaking: false }));
    getStakerInfo();
    getTokenBalance();
  }

  const claim = async () => {
    updateLoadingStatus((state) => ({ ...state, isClaimingRewards: true }));
    const stakingContract = getStakingContract(getSigner());
    await handleTransaction(
      () => stakingContract.claim(),
      "Reward claimed successfully"
    );
    await handleTransaction(
      () => stakingContract.withdrawFromPool(),
      "Withdraw completed"
    );
    updateLoadingStatus((state) => ({ ...state, isClaimingRewards: false }));
    getStakerInfo();
    getClaimableTokens();
    getTokenBalance();
  };

  return {
    getTokenBalance,
    stake,
    getApproval,
    getStakerInfo,
    unstake,
    getClaimableTokens,
    claim,
  };
};

export default useStakerDetails;
