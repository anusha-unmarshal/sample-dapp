import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const DefaultLoadingStatus = {
  isApproving: false,
  isStaking: false,
  isUnstaking: false,
  isClaimingRewards: false,
  isLoadingStakingDetails: true,
};

export const loadingIndicatorState = atom({
  key: "loadingIndicatorState",
  default: DefaultLoadingStatus,
});

export const useLoadingIndicatorUpdater = () => {
  return useSetRecoilState(loadingIndicatorState);
};

export const useLoadingIndicatorReader = () => {
  return useRecoilValue(loadingIndicatorState);
};
