import { gql, useQuery } from "@apollo/client";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useConnector } from "../Wallet/Connector";

const FILMS_QUERY = gql`
  query GetStakeHistory($walletAddress: String) {
    allStakeEvents(
      filter: { staker: { equalTo: $walletAddress } }
      orderBy: BLOCK_TIME_DESC
    ) {
      edges {
        node {
          id
          stakedAmount
          blockNumber
          gas
          gasPrice
          blockTime
          txHash
        }
      }
    }
  }
`;

const StakeHistory = () => {
  const { walletAddress } = useConnector();
  const { data, loading, error } = useQuery(FILMS_QUERY, {
    variables: { walletAddress: walletAddress.toLowerCase() },
    pollInterval: 500,
  });

  if (loading)
    return (
      <>
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </>
    );
  if (error) return <pre>{error.message}</pre>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Tx Hash</Typography>
          </TableCell>
          <TableCell>
            <Typography>Amount (unm)</Typography>
          </TableCell>
          <TableCell>
            <Typography>Block</Typography>
          </TableCell>
          <TableCell>
            <Typography>Time</Typography>
          </TableCell>
          <TableCell>
            <Typography>Gas (rinkebyETH)</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.allStakeEvents.edges.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <Typography>{event.node.txHash}</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {event.node.stakedAmount / Math.pow(10, 8)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{event.node.blockNumber}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{event.node.blockTime}</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {(
                  (event.node.gas * event.node.gasPrice) /
                  Math.pow(10, 18)
                ).toFixed(8)}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StakeHistory;
