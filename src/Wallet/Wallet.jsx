import { useConnector } from "./Connector";
import { Button, Typography } from "@mui/material";

const Wallet = () => {
  const { connectWallet, isActive, walletAddress } = useConnector();
  return (
    <>
      {!isActive ? (
        <Button
          variant={"outlined"}
          color={"success"}
          onClick={() => {
            connectWallet();
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Typography>{walletAddress}</Typography>
      )}
    </>
  );
};

export default Wallet;
