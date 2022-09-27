import Wallet from "../Wallet/Wallet";
import { Container, Paper, Stack, Typography } from "@mui/material";
import useStakerDetails, { StakerInfoReader } from "./StakerDetails";
import { useConnector } from "../Wallet/Connector";
import { useEffect } from "react";
import StakeCards from "./StakeCards";
import { useAllowancesReader } from "./Approval";
import ApproveCard from "./ApproveCard";
import { formatBigNumber } from "./Converters";
import StakeHistory from "../history/StakeHistory";

const StakingPage = () => {
  const { getTokenBalance, getStakerInfo, getClaimableTokens, getAllowance } =
    useStakerDetails();
  const { walletAddress, isActive } = useConnector();
  const stakerInfo = StakerInfoReader();
  const { hasAllowance } = useAllowancesReader();

  useEffect(() => {
    if (isActive) {
      getTokenBalance();
      getStakerInfo();
      getAllowance();
      getClaimableTokens();
    }
  }, [isActive, walletAddress]);

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
                Bal: {formatBigNumber(stakerInfo.balance, 8)} unm
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Paper>
      {isActive ? (
        <>
          {!hasAllowance ? <ApproveCard /> : <StakeCards />}
          <Container maxWidth={"lg"} sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Typography
                textAlign={"center"}
                fontSize={"20px"}
                fontWeight={600}
              >
                Stake History
              </Typography>
              <StakeHistory />
            </Paper>
          </Container>
        </>
      ) : (
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={500}>
          Connect wallet to stake
        </Typography>
      )}
    </>
  );
};

export default StakingPage;
