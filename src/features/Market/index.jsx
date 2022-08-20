import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useImmerReducer } from "use-immer";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";

// "e": "1hTicker",    // Event type
// "E": 123456789,     // Event time
// "s": "BNBBTC",      // Symbol
// "p": "0.0015",      // Price change
// "P": "250.00",      // Price change percent
// "o": "0.0010",      // Open price
// "h": "0.0025",      // High price
// "l": "0.0010",      // Low price
// "c": "0.0025",      // Last price
// "w": "0.0018",      // Weighted average price
// "v": "10000",       // Total traded base asset volume
// "q": "18",          // Total traded quote asset volume
// "O": 0,             // Statistics open time
// "C": 86400000,      // Statistics close time
// "F": 0,             // First trade ID
// "L": 18150,         // Last trade Id
// "n": 18151          // Total number of trades

const symbols = ["btc", "eth", "dot", "doge", "shib", "sol"];
const symbolTickers = symbols.map((symbol) => symbol + "usdt@ticker").join("/");
const endpoint = `wss://stream.binance.com:9443/ws/${symbolTickers}`;

const initialState = {};

function reducer(state, { payload }) {
  state[payload.s] = payload;
}

function toLocaleString(value) {
  let locale = "" || undefined;
  let localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  let number = Number(value);

  if (number > 0 && number < 1) {
    localeOptions.minimumFractionDigits = 8;
    localeOptions.maximumFractionDigits = 8;
  }

  return number.toLocaleString(locale, localeOptions);
}

const Market = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const { lastJsonMessage: stockObject, readyState } = useWebSocket(endpoint);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (stockObject !== null) {
      dispatch({ payload: stockObject });
    }
  }, [stockObject, dispatch]);

  return (
    <>
      <h3>The WebSocket is currently {connectionStatus}</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="center">High / Low</TableCell>
              <TableCell align="right">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(state).map((value) => (
              <TableRow
                key={value.s}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.s.replace("USDT", "")}
                </TableCell>
                <TableCell align="right">${toLocaleString(value.c)}</TableCell>
                <TableCell align="right">{toLocaleString(value.P)}</TableCell>
                <TableCell align="center">
                  ${toLocaleString(value.h)} / ${toLocaleString(value.l)}
                </TableCell>
                <TableCell align="right">
                  ${toLocaleString(value.q / 1000000)}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Market;
