import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import {
  Typography,
  Grid,
  Paper,
  IconButton,
  Badge,
  InputBase,
} from "@mui/material";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Heading3 = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontFamily: "Nunito",
  fontSize: "18px",
  lineHeight: "30.01px",
  fontWeight: 500,
  marginTop: "32px",
}));

const EmployeeDetails = (props: any) => {
  const Datakeys = Object.keys(props.employeeDetails.data[0])
    .map((item: any) =>
      item
        .split("_")
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .filter(
      (item: any) =>
        item !== "Family Detaills" && item !== " Id" && item !== "  V"
    );

  let router = useRouter();
  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 3, sm: 2, md: 3 }}
      sx={{
        width: "100%",
        height: "auto",
        background: "#F7F7F7",
      }}
    >
      <Grid
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >
        <Grid display={"flex"} justifyContent={"space-between"}>
          {/* <Heading1Black>
            {" "}
            {`Employee Details (Login ID - ${props.employeeDetails.data[0]._id})`}{" "}
          </Heading1Black> */}

          <Box display={"flex"}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                marginX: 5,
                width: 300,
              }}
            >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Any Keywords"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <KeyboardVoiceIcon />
              </IconButton>
            </Paper>

            <Badge badgeContent={1} color="error">
              <NotificationsNoneIcon fontSize="large" />
            </Badge>

            <SettingsIcon fontSize="large" sx={{ marginX: 5 }} />

            <AccountBoxIcon fontSize="large" />
          </Box>
        </Grid>
        <TableContainer>
          <Table
            sx={{ minWidth: 250, marginTop: "27px" }}
            size="small"
            aria-label="a dense table"
          >
            <TableBody
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 10,
                  borderColor: "white",
                },

                backgroundColor: "#F7F7F7",
                height: "44px",
              }}
            >
              {Datakeys.map((item: any, index:number) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ height: 51 }}>{item}</TableCell>
                    <TableCell sx={{ height: 51 }}>
                      {
                        props.employeeDetails.data[0][
                          item.toLowerCase().split(" ").join("_")
                        ]
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell sx={{ height: 51 }}>Identity Proof</TableCell>
                <TableCell sx={{ height: 51 }}>
                  {" "}
                  <Image src="/adhaar.png" alt="ID document" width={300} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default EmployeeDetails;
