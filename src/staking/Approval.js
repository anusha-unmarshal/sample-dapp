import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { stakerInfoState } from "./StakerDetails";
import { BigNumber } from "bignumber.js";

const allowanceState = atom({
  key: "ALLOWANCE_STATE",
  default: new BigNumber(0),
});

const derivedAllowanceState = selector({
  key: "DERIVED_ALLOWANCE_STATE",
  get: ({ get }) => {
    const allowanceValue = get(allowanceState);
    const { balance: tokenBalance } = get(stakerInfoState);
    return {
      hasAllowance:
        allowanceValue.gte(tokenBalance) && allowanceValue.gt(new BigNumber(0)),
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
