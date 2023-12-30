"use client";
import React, { useState, useRef } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
const PermissionList = () => {
  const defaultValue = [
    {
      id: "1",
      email: "rganjare22@gmail.com",
      name: "Sunil Joshi",
      sname: "Nirav Joshi",
      relation: "son",
      post: "Web Designer",
      pname: "Elite Admin",
      priority: "active",
      pbg: "primary.main",
      budget: "3089",
      phoneNumber: "6789032471",
      date: "03/25/2015",
    },
    {
      id: "2",
      name: "Andrew McDownland",
      email: "riteshganjare2@gmail.com",
      sname: "Niu roy",
      relation: "wife",
      post: "Project Manager",
      pname: "Real Homes WP Theme",
      priority: "active",
      pbg: "secondary.main",
      budget: "2475",
      phoneNumber: "5473892167",
      date: "01/20/2015",
    },
    {
      id: "3",
      name: "Christopher Jamil",
      email: "sdfgh@gmail.com",
      sname: "Rao ji",
      relation: "son",
      post: "Project Manager",
      pname: "MedicalPro WP Theme",
      priority: "non-active",
      pbg: "error.main",
      budget: "1288",
      phoneNumber: "9864092321",
      date: "2023-07-27",
    },
    {
      id: "4",
      name: "Nirav Joshi",
      email: "sdfgghfg@gmail.com",
      sname: "Bajirao",
      relation: "wife",
      post: "Frontend Engineer",
      pname: "Hosting Press HTML",
      priority: "active",
      pbg: "success.main",
      budget: "2884",
      phoneNumber: "8903245601",
      date: "2023-07-26",
    },
  ];
  const [position, setPosition] = React.useState<number | Array<number>>(50);
  const [open, setOpen] = React.useState(false);

  const [exp, setExp] = useState("null");
  const [filter, setFilter] = useState("null2");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(defaultValue);
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
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{ marginTop: "10px" }}
          >
            Add New
          </Button>
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
                    S.No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Hospital Code
                  </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Activate/<br></br>Non Active
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Hospital Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Contact Number
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Edit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newArray.map((product) => (
                <TableRow key={product.budget}>
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
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: product.pbg,
                        color: "#fff",
                      }}
                      size="small"
                      label={product.priority}
                    ></Chip>
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
                  <TableCell align="center">
                    <Typography variant="h6">{product.phoneNumber}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                        marginTop: "2px",
                      }}
                    >
                      <Typography variant="h6">{product.email}</Typography>
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <EditIcon />
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

export default PermissionList;
