"use client";
import { Box, Grid, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import DashboardCard from "../components/shared/DashboardCard";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const ClaimForm = () => {

  const columns: GridColDef[] = [
    {
      field: "diary_No",
      headerName: "Diary Number",
      minWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Name & Designation",
      minWidth: 130,
    },
    {
      field: "claimed_Amount",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Claimed Amount",
      minWidth: 130,
    },]

    const [rows, setRows] = useState<any>([])

    const [formData, setFormData] = useState({
      id: rows.length +1,
      name: "",
      diary_No: '',
      claimed_Amount: '',
    });

    const handleSubmit =()=>{
      setRows([...rows, formData])
      setFormData({...formData, name:"", diary_No: '' , claimed_Amount: ''})
    }
  
    
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Typography variant="h1" m={2}>
        {" "}
        Diary Entry{" "}
      </Typography>

      <DashboardCard title={"Dak Entry"}>
        <>
        <Grid container spacing={5} mb={2}>
          <Grid item xs={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Diary Number
            </Typography>
            <CustomTextField
            value={formData.diary_No}
              onChange={(e: any) =>
                setFormData({ ...formData, diary_No: e.target.value })
              }
              type="number"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Name & Designation
            </Typography>
            <CustomTextField
            value={formData.name}
              onChange={(e: any) =>
                setFormData({ ...formData, name: e.target.value })
              }
              id="name"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Claimed Amount
            </Typography>
            <CustomTextField
            value={formData.claimed_Amount}
              onChange={(e: any) =>
                setFormData({ ...formData, claimed_Amount: e.target.value })
              }
              type="number"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <Button
            disabled={formData.name==="" || formData.diary_No==="" || formData.claimed_Amount===""}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: 3}}
              onClick={handleSubmit}
            >
              Submit
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
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      </>
      </DashboardCard>

      
    </PageContainer>
  );
};

export default ClaimForm;
