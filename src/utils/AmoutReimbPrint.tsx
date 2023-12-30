import React, { forwardRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const PrintData = forwardRef(
  ({ data, InadmiAmo, fileNumber, AmountInWord }: any, ref: any) => {
    console.log(data, "ROW DATA");
    const rows = Object.entries(data).map(([key, value], index) => ({
      id: index + 1,
      key,
      value,
    }));

    const columns = [
      {
        field: "Name & Designation of the Govt. Servant",
        headerName: data.name,
      },
      {
        field:
          "Name of the Patient & his/her relationship with the Govt. Servant",
        headerName: data.patient_Name,
      },
      {
        field: "Whether CGHS/Non-CGHS Benificiary",
        headerName: data.CGHS_Type,
      },
      {
        field: "Nature of treatment (Whether OPD or Indoor)",
        headerName: data.nature_Of_Treatment,
      },
      {
        field: "Whether treatment taken under Emergency",
        headerName: data.emergency,
      },
      {
        field:
          "Whether treatment taken from (CGHS Dispensary / Govt. Hospital / unrecognised Private Hospital)",
        headerName: data.hospital_Name,
      },
      {
        field: "Visited CGHS empanelled hospital on recommendation of: ",
        headerName: data.recomendation_Of,
      },
      {
        field:
          "Period of treatment for which the reimbursement claim submitted",
        headerName: `${data.from} & ${data.to}`,
      },
      { field: "Amout Claimed", headerName: data.amount_Claimed },
      { field: "Inadmissible Amount", headerName: InadmiAmo },
      { field: "Admissible Amount", headerName: data.amount_Claimed },
      {
        field: "Authority/Rule under which amount reimbursable",
        headerName: data.CGHS_Type,
      },
      { field: "No. of emergency claim during 2023-24", headerName: "1" },
    ];

    const tableCell = { border: "1px solid black" };

    return (
      <Box ref={ref} style={{ width: "90%", margin: "30px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "right", padding: "8px 20px" }}
        >
          {`File No. D-12015/ ${fileNumber} /2023-Admin.IV`}
        </Box>
        <Box
          p={1}
        >{`Medical Reimbursement Claim (Flag/PUC) recived in r/o , UPSC as per the details furnished below: `}</Box>
        <Table sx={{ margin: "0 10px" }}>
          <TableBody sx={{ border: "1px solid black" }}>
            {columns.map((data: any, i: any) => (
              <TableRow
                sx={{ border: "1px solid black", height: "10px" }}
                key={i}
              >
                <TableCell sx={{ ...tableCell, height: "10px" }}>
                  <Typography>{i + 1}.</Typography>
                </TableCell>
                <TableCell sx={{ ...tableCell, height: "10px" }}>
                  <Typography>{data.field}</Typography>
                </TableCell>
                <TableCell sx={{ ...tableCell, height: "10px" }}>
                  <Typography>{data.headerName}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
              {`14.  The rates of tests/investigations/treatment have been cross-checked with CGHS rates and found to be in order. The Data Sheet for admissible amount is at page 35/corr.`}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
              {`15.  JS(Admn.), UPSC, being the competent authority [As per Office Order No. A-36019/1/96-Admn.I dt. 20/04/2005], may be requested to sanction the admissible amount of Rs.${data.amount_Claimed}/- (Rupees${AmountInWord} Only) to ${data.name}`}
            </Typography>
          </Box>
          <Box my={1}>
            {["SO(Admn.IV)", "US(Admn.II)- L.O.", "DS(SKG)", "JS(Admn.)"].map(
              (text, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textDecoration: "underline",
                    padding: "2px 0",
                  }}
                >
                  {text}
                </Typography>
              )
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default PrintData;
