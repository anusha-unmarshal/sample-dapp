import Wallet from "../Wallet/Wallet";
import { Container, Paper, Stack, Typography } from "@mui/material";
import useStakerDetails, {
  RewardInfoReader,
  StakerInfoReader,
} from "./StakerDetails";
import { useConnector } from "../Wallet/Connector";
import { useEffect } from "react";
import StakeCards from "./StakeCards";
import { useAllowancesReader } from "./Approval";
import ApproveCard from "./ApproveCard";
import { formatBigNumber } from "./Converters";

const StakingPage = () => {
  const { getTokenBalance, getStakerInfo, getClaimableTokens } =
    useStakerDetails();
  const { walletAddress } = useConnector();
  const stakerInfo = StakerInfoReader();
  const rewardsInfo = RewardInfoReader();
  const { hasAllowance } = useAllowancesReader();

  console.log(rewardsInfo);
  console.log();
  useEffect(() => {
    getTokenBalance();
    getStakerInfo();
    getClaimableTokens();
  }, [walletAddress]);

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "rgba(225,225,225,0.5)",
          py: 2,
          borderRadius: 0,
        }}
      >
        <Container maxWidth={"lg"} sx={{ padding: 0 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={"20px"} fontWeight={700}>
              Staking DAPP
            </Typography>
            <Stack direction={"column"} justifyContent={"flex-end"}>
              <Wallet />
              <Typography textAlign={"right"}>
                Bal: {formatBigNumber(stakerInfo.balance)}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Paper>
      {!hasAllowance ? <ApproveCard /> : <StakeCards />}
    </>
  );
};

export default StakingPage;
