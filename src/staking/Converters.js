import { BigNumber } from "bignumber.js";

const NO_OF_DECIMAL_PLACES = 2;
export const formatBigNumber = (
  value = new BigNumber(0),
  decimalPlaces = NO_OF_DECIMAL_PLACES
) => {
  return value.toFormat(decimalPlaces);
};

export const hexaToBigNumber = (tokenBNValue, decimals) => {
  if (tokenBNValue) {
    const tokenBN = new BigNumber(tokenBNValue.toString());
    const decimalsBN = new BigNumber(10 ** decimals);
    const tokenValue = tokenBN.dividedBy(decimalsBN);
    return tokenValue;
  } else {
    return new BigNumber(0);
  }
};
