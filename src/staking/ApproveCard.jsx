import { Card, Container, Stack, Typography } from "@mui/material";
import useStakerDetails from "./StakerDetails";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLoadingIndicatorReader } from "./LoadingIndicator";

const ApproveCard = () => {
  const { getApproval } = useStakerDetails();
  const loadingIndicator = useLoadingIndicatorReader();
  return (
    <Container maxWidth={"lg"} sx={{ padding: 0 }}>
      <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5 }}>
        <Card sx={{ width: "80%", p: 3 }}>
          <Typography textAlign={"center"}>Approve MARSH_TESTNET</Typography>
          <LoadingButton
            loading={loadingIndicator.isApproving}
            variant={"outlined"}
            fullWidth
            onClick={getApproval}
          >
            Approve
          </LoadingButton>
        </Card>
      </Stack>
    </Container>
  );
};

export default ApproveCard;
