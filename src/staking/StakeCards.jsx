import {
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useStakerDetails, {
  RewardInfoReader,
  StakerInfoReader,
} from "./StakerDetails";
import { useLoadingIndicatorReader } from "./LoadingIndicator";
import LoadingButton from "@mui/lab/LoadingButton";
import { formatBigNumber } from "./Converters";

const Stake = () => {
  const { stake } = useStakerDetails();
  const loadingIndicator = useLoadingIndicatorReader();
  const [stakeAmount, setStakeAmount] = useState(0);
  return (
    <>
      <TextField
        name={"amount"}
        fullWidth
        value={stakeAmount}
        onChange={(event) => setStakeAmount(event?.target?.value)}
        type={"number"}
        label={"Enter Amount to stake"}
      />
      <br />
      <br />
      <LoadingButton
        loading={loadingIndicator.isStaking}
        variant={"outlined"}
        fullWidth
        onClick={() => stake(stakeAmount)}
      >
        Stake
      </LoadingButton>
    </>
  );
};

const Unstake = () => {
  const { unstake } = useStakerDetails();
  const loadingIndicator = useLoadingIndicatorReader();
  const stakerInfo = StakerInfoReader();
  return (
    <>
      <Typography textAlign={"center"}>
        Staked Amount: {formatBigNumber(stakerInfo.stakeAmount)}
      </Typography>
      <br />
      <LoadingButton
        variant={"outlined"}
        fullWidth
        loading={loadingIndicator.isUnstaking}
        onClick={unstake}
      >
        Un-stake and Withdraw
      </LoadingButton>
    </>
  );
};

const Claim = () => {
  const loadingIndicator = useLoadingIndicatorReader();
  const rewardsInfo = RewardInfoReader();
  const { claim } = useStakerDetails();
  return (
    <>
      <Typography textAlign={"center"} fontWeight={600}>
        Claim Rewards
      </Typography>
      <br />
      <Typography textAlign={"center"}>
        Total earned: {formatBigNumber(rewardsInfo.earnedTokens, 8)}
      </Typography>
      <Typography textAlign={"center"}>
        Claimable: {formatBigNumber(rewardsInfo.claimableTokens, 8)}
      </Typography>
      <br />
      <LoadingButton
        variant={"outlined"}
        fullWidth
        onClick={claim}
        loading={loadingIndicator.isClaimingRewards}
      >
        Claim and Withdraw
      </LoadingButton>
    </>
  );
};
const StakeCards = () => {
  const stakerInfo = StakerInfoReader();
  return (
    <Container maxWidth={"lg"} sx={{ padding: 0 }}>
      <Stack direction={"row"} justifyContent={"space-evenly"} sx={{ mt: 5 }}>
        <Card sx={{ width: "40%" }}>
          <CardContent>
            <Typography textAlign={"center"} fontWeight={600}>
              Stake/Un-stake
            </Typography>
            <br />
            {!stakerInfo.stakeStatus ? <Stake /> : <Unstake />}
          </CardContent>
        </Card>
        <Card sx={{ width: "40%" }}>
          <CardContent>
            <Claim />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default StakeCards;
