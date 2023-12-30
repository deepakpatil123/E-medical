"use client";
import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
const OnlineBills = () => {
  const auth: any = useAuth();
  const defaultValue = [
    {
      id: "1(56767)",
      name: "Sunil Joshi",
      sname: "Nirav Joshi",
      relation: "son",
      post: "Web Designer",
      pname: "Elite Admin",
      priority: "open",
      pbg: "primary.main",
      budget: "3.9",
      phoneNumber: "6789032471",
      date: "03/25/2015",
    },
    {
      id: "2(56767)",
      name: "Andrew McDownland",
      sname: "Niu roy",
      relation: "wife",
      post: "Project Manager",
      pname: "Real Homes WP Theme",
      priority: "open",
      pbg: "secondary.main",
      budget: "24.5",
      phoneNumber: "5473892167",
      date: "01/20/2015",
    },
    {
      id: "3(56767)",
      name: "Christopher Jamil",
      sname: "Rao ji",
      relation: "son",
      post: "Project Manager",
      pname: "MedicalPro WP Theme",
      priority: "close",
      pbg: "error.main",
      budget: "12.8",
      phoneNumber: "9864092321",
      date: "2023-07-27",
    },
    {
      id: "4(56767)",
      name: "Nirav Joshi",
      sname: "Bajirao",
      relation: "wife",
      post: "Frontend Engineer",
      pname: "Hosting Press HTML",
      priority: "open",
      pbg: "success.main",
      budget: "2.4",
      phoneNumber: "8903245601",
      date: "2023-07-26",
    },
  ];
  const [position, setPosition] = React.useState<number | Array<number>>(50);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [exp, setExp] = useState("null");
  const [filter, setFilter] = useState("null2");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(defaultValue);
  const TYPE =
    filter === "phone" ? "number" : filter === "dateValue" ? "date" : "text";
  const numberType = {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spinauthhhhhhhhhh-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  };
  console.log(search);
  const newArray = products.filter((word) => {
    switch (filter) {
      case "phone":
        return word.phoneNumber.startsWith(search);
        break;
      case "name":
        return word.name.includes(search);
        break;
      case "dateValue":
        return word.date === search;
        break;
      default:
        return word;
    }
  });
  return (
    <PageContainer
      title="Permission List"
      description="Manage Former data here"
    >
      <DashboardCard title="Permission List">
        <>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    S.No/<br></br>Per-ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Employee name/<br></br>Petient(with Relation)
                  </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Received From
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status & <br></br>authority
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Forword To
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Movement
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    View Docs
                  </Typography>
                  {/* <VisibilityIcon /> */}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Print
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newArray.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {product.post}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          <Chip
                            sx={{
                              px: "4px",
                              backgroundColor: "primary.main",
                              color: "#fff",
                            }}
                            size="small"
                            label={product.relation}
                          ></Chip>
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {product.pname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: product.priority==="open" ? "primary.main" : "error.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={product.priority}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{product.sname}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: product.pbg,
                        color: "#fff",
                      }}
                      size="small"
                      label="View"
                    ></Chip>

                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                        marginTop: "2px",
                      }}
                    >
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: product.pbg,
                          color: "#fff",
                        }}
                        size="small"
                        label="History"
                      ></Chip>
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <VisibilityIcon onClick={handleOpen} />
                  </TableCell>
                  <TableCell align="center">
                  <TableCell align="center">
                  <Button  variant="contained" size="small"  sx={{width:"30px", height:"20px", padding:"12px 20px",fontSize: "8px",}}>Note Shee</Button>

                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "8px",
                        marginTop: "2px",
                      }}
                    >
                      <Button  variant="contained" size="small" sx={{width:"30px", height:"20px", padding:"12px 20px",fontSize: "8px", }}>Permission</Button>
                    </Typography>
                  </TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default OnlineBills;
