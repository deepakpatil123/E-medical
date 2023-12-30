"use client";
import { Box, Grid, Typography, FormHelperText } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import DashboardCard from "../../shared/DashboardCard";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import {numStyle, Asterisk, onKeyDown} from "../../StylesnS";

const DakEntry = () => {

  const auth:any = useAuth();

  const [editMode, seEditMode] = useState(false);

  const [rows, setRows] = useState<any>([]);

  const [formData, setFormData] = useState({
    name: "",
    diary_No: "",
    amount_Claimed: "",
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no.",
      maxWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
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
      field: "amount_Claimed",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Claimed Amount",
      minWidth: 130,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      maxWidth: 90,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          seEditMode(true);
          setFormData({
            name: params.row.name,
            diary_No: params.row.diary_No,
            amount_Claimed: params.row.amount_Claimed,
          });
        };

        return (
          <>
            <Button variant="contained" color="primary" onClick={handleClick}>
              <EditNoteIcon />
            </Button>
          </>
        );
      },
    },
  ]; 
  

  const handleSubmit = async () => {
    try {
     
      if (editMode) {
        const res = await axios.put(
          "http://localhost:4400/api/medical/updateDakEntry",
          formData,
          {
            headers: {
              authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );
        setFormData({ name: "", diary_No: "", amount_Claimed: "" });
      } else {
        const res = await axios.post(
          "http://localhost:4400/api/medical/createDakEntry",
          formData,
          {
            headers: {
              authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );
      }
      getData();
      setFormData({
        name: "",
        diary_No: "",
        amount_Claimed: "",
      })
    } catch (err: any) {
      alert(err.response.data.message);
    }

    
    if(editMode) seEditMode(false)
  };

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );
    const reqRes = res.data.data.filter(
      (item: any) =>
        !item.forward_By_Assistant_Diary_Entry && !item.returnFromReimbursement
    );
    const rowData = reqRes.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));
    setRows(rowData.sort((b: any, a: any) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
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
              {!editMode && <Asterisk/>}
              <CustomTextField
                disabled={editMode}
                value={formData.diary_No}
                onChange={(e: any) =>
                  setFormData({ ...formData, diary_No: e.target.value })
                }
                type="number"
                onKeyDown={onKeyDown}
                sx={numStyle}
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
              <Asterisk/>
              <CustomTextField
                value={formData.name}
                onChange={(e: any) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                id="name"
                variant="outlined"
                fullWidth
              />
              {!(/^[a-zA-Z(), ]*$/.test(formData.name)) && <FormHelperText error> Enter Valid Input </FormHelperText>}
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
              <Asterisk/>
              <CustomTextField
                value={formData.amount_Claimed}
                onChange={(e: any) =>
                  setFormData({ ...formData, amount_Claimed: e.target.value })
                }
                type="number"
                onKeyDown={onKeyDown}
                sx={numStyle}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                disabled={
                  formData.name === "" ||
                  formData.diary_No === "" ||
                  formData.amount_Claimed === "" ||
                  !/^[a-zA-Z(), ]*$/.test(formData.name)
                }
                variant="contained"
                endIcon={editMode ? <EditNoteIcon /> : <SendIcon />}
                sx={{ marginTop: 3 }}
                onClick={handleSubmit}
              >
                {editMode ? "Edit" : "Submit"}
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

export default DakEntry;