// PrintableTable.js
import React, { forwardRef } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const BillEntryPrint = React.forwardRef(
  ({ data, billNumber, expenditure, balance }: any, ref: any) => {
    const tableCell = { border: "1px solid black" };

    return (
      <Box ref={ref} style={{ width: "90%", margin: "50px" }}>
        <Stack alignItems={"center"}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            G.A.R. 23
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            {" "}
            (See Rule 91)
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Medical Charges Reimbursement Bill
          </Typography>
        </Stack>

        <Stack>
          <Typography>{`Bill No. ${billNumber}`}</Typography>
          <Typography>{`Ministry/Department/Office of Union Public Service Commission For the Month/year: 17.07.2023`}</Typography>
          <Typography>{`Head of Account: 2051-Public Service Commission 00.101-UPSC 01 Administrative Expenditure 01.00.06 Medical Treatment`}</Typography>
        </Stack>

        <Table sx={{ margin: "20px 0px", border: "1px solid black" }}>
          <TableHead sx={{ border: "1px solid black" }}>
            <TableRow sx={tableCell}>
              <TableCell sx={tableCell}>
                <Typography>SL NO. 1.</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>
                  Section of Establishment and Name of Incumbent 2
                </Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Gross Claim (Rs.) 3</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Recovery of Advance (Rs.) 4</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Net Amount Payable (Rs.) 5</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Remarks 6</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ border: "1px solid black" }}>
            <TableRow sx={tableCell}>
              <TableCell sx={tableCell}>
                <Typography>1</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{data?.name}</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{data?.amount_Claimed}</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography></Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{data?.amount_Claimed}</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={tableCell}>
              <TableCell sx={tableCell} colSpan={6}>
                {`Net amount required for payment (In words) `}
                <b>(Rupees {data?.amount_In_Words} Only)</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box>
          <Typography my={3}>
            {`Certified that I have satisfied myself that the amounts included in Bills drawn 1 month/2 months previous to this date, with the execution of these detailed below (of which the total amount has been refunded by deduction from this bill) have been disbursed to the Govt. servants therein named and their receipts taken in the office copy for the bill or in a separate acquaintance roll.`}
          </Typography>

          <Box>
            <Typography my={3}>Details of Medical charges refunded</Typography>
            <Typography my={3}>
              2. Certified that Essentiality certificate, receipts etc. are
              appended.
            </Typography>
            <Typography my={3}>
              3. Please issue a cheque in favour of the official concerned/F&BO,
              UPSC, New Delhi.
            </Typography>
            <Box my={3}>
              <Typography>{`4. a) Appropriation for 2023-24 Rs. 40000000`}</Typography>
              <Typography>{`   b) Expenditure including this bill Rs. ${expenditure}`}</Typography>
              <Typography>{`   c) Balance Rs. ${balance}`}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1rem",
            }}
          >
            <Typography>Received payment</Typography>
            <Typography>Signature -----------------</Typography>
            <Typography>Designation of drawing officer</Typography>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default BillEntryPrint;
