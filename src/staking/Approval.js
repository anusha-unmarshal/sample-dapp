import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { stakerInfoState } from "./StakerDetails";
import { BigNumber } from "bignumber.js";

const allowanceState = atom({
  key: "allowanceState",
  default: new BigNumber(0),
});

const derivedAllowanceState = selector({
  key: "derivedAllowanceStateV2",
  get: ({ get }) => {
    const allowanceValue = get(allowanceState);
    const { balance: tokenBalance } = get(stakerInfoState);
    return {
      hasAllowance:
        allowanceValue.gte(tokenBalance) &&
        allowanceValue.gte(new BigNumber(0)),
      value: allowanceValue,
    };
  },
});

export const useAllowancesUpdater = () => {
  return useSetRecoilState(allowanceState);
};

export const useAllowancesReader = () => {
  return useRecoilValue(derivedAllowanceState);
};
