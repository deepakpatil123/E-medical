"use client"
import {
  Box,
  Grid,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import DashboardCard from "../shared/DashboardCard";
import { Asterisk, numStyle } from "../StylesnS";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const RoleDistribution = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    password: "",
    email_id: "",
    role: "",
    phone_num: "",
    active_Status: true,
  });

  const auth: any = useAuth();

  const [roles, setRoles] = useState<any>([])

  const [rows, setRows] = useState<any>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no.",
      maxWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
        field: "role",
        headerName: "Role",
        minWidth: 50,
        headerClassName: "super-app-theme--header",
        flex: 1,
      },
      {
        field: "email_id",
        headerName: "Email",
        minWidth: 50,
        headerClassName: "super-app-theme--header",
        flex: 1,
      },
      {
        field: "phone_num",
        headerName: "Contact",
        minWidth: 50,
        headerClassName: "super-app-theme--header",
        flex: 1,
      },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      maxWidth: 90,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          setRows(rows.map((item:any)=> {
            if(item.email_id===params.row.email_id) return {...item, active_Status: !params.row.active_Status}
            return item
          }))
        };

        return (
          <>
            <Button variant="contained" color="primary" onClick={handleClick}>
              {params.row.active_Status ? <HowToRegIcon /> : <CancelIcon />}
            </Button>
          </>
        );
      },
    },
  ];

  const registration = async() =>{
    const data = await axios.post('http://localhost:4400/api/medical/createUser', formData);
    getData()
    setFormData({
      name: "",
      password: "123456789",
      email_id: "",
      role: "",
      phone_num: "",
      active_Status: true,
    });
  }

  const getData = async()=>{
    const data = await axios.get('http://localhost:4400/api/medical/getAllUser')

    const rowData = data.data.data.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
      role: item.role.name
    }));
    setRows(rowData);
  }

  const getRoles =async()=>{
    const data = await axios.get('http://localhost:4400/api/medical/getAllRole');
    setRoles(data.data.data.map((item:any)=>({id: item._id, role: item.name})));
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    getRoles()
  },[])

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title={"Dak Entry"}>
        <>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                mb="5px"
              >
                Name
              </Typography>
              <Asterisk />
              <CustomTextField
                value={formData.name}
                type="text"
                onChange={(e: any) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                variant="outlined"
                fullWidth
              />
              {!/^[a-zA-Z, ]*$/.test(formData.name) && (
                <FormHelperText error> Enter Valid Name.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                mb="5px"
              >
                Password
              </Typography>
              <Asterisk />
              <CustomTextField
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                sx={numStyle}
                variant="outlined"
                fullWidth
              />
              {formData.password.length < 8 && formData.password.length > 0 && (
                <FormHelperText error>
                  {" "}
                  Password should be greater than 8 digit.
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                mb="5px"
              >
                Email
              </Typography>
              <Asterisk />
              <CustomTextField
                value={formData.email_id}
                type="email"
                onChange={(e: any) =>
                  setFormData({ ...formData, email_id: e.target.value })
                }
                sx={numStyle}
                variant="outlined"
                fullWidth
              />
              {!(/\S+@\S+\.\S+/).test(formData.email_id) && formData.email_id.length>0 && (
                <FormHelperText error> Enter Valid Email.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <FormControl fullWidth>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
              >
                Role<Asterisk />
              </Typography>
                <Select

                size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.role}
                  label="Age"
                  onChange={(e: any) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  {roles.map((item:any)=><MenuItem key={item.id} value={item.id}>{item.role}</MenuItem>)}
                </Select>
              </FormControl>
              {formData.role === "" && (
                <FormHelperText error> Select a role to asign.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                mb="5px"
              >
                Phone Number
              </Typography>
              <Asterisk />
              <CustomTextField
                value={formData.diary_No}
                type="number"
                onChange={(e: any) =>
                  setFormData({ ...formData, phone_num: e.target.value })
                }
                sx={numStyle}
                variant="outlined"
                fullWidth
              />
            {formData.phone_num.length > 0 && formData.phone_num.length !== 10 && (
                <FormHelperText error> Enter Valid Number.</FormHelperText>
              )}
            </Grid>


            <Grid item xs={6} sm={4} md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                mb="5px"
              ></Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ marginTop: "27px" }}
                onClick={registration}
                disabled={
                  formData.name === "" ||
                  formData.password === "" ||
                  formData.email_id === "" ||
                  formData.role_id === "" ||
                  formData.phone_num === ""
                }
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#bccdfb",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default RoleDistribution;