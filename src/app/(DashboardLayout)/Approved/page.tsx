"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BillEntryForm from "../components/forms/BillEntryForm/BillEntryForm";

function ApprovedFiles() {
  const [toBillEntry, setToBillEntry] = useState(false);

  const [info, setInfo] = useState({});

  

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "First name",
      minWidth: 130,
    },
    {
      field: "lastName",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Last name",
      minWidth: 130,
    },
    {
      field: "age",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Age",
      type: "number",
      minWidth: 100,
    },
    {
      field: "status",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Status",
      minWidth: 110,
    },
    {
      field: "approval",
      headerName: "Approval",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          setInfo(params.row);
          setToBillEntry(true);
        };

        return (
          <Button
            variant="contained"
            endIcon={<BorderColorIcon />}
            onClick={() => handleClick()}
          >
            Bill entry
          </Button>
        );
      },
    },
  ];

  const [rows, setRows] = useState([
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "Approved" },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      status: "Approved",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      status: "Approved",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      status: "Approved",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: 18,
      status: "Approved",
    },
  ]);

  const handleSend = (item:any) => {
    setToBillEntry(false);
    setRows(rows.filter((elem:any)=> elem.id!==item.id))
  };


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title={toBillEntry ? "Bill Entry" : "Approved Files"}>
        <>
          {!toBillEntry ? (
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
          ) : (
            <BillEntryForm send={handleSend} info={info} back={setToBillEntry} />
          )}
        </>
      </DashboardCard>
    </PageContainer>
  );
}

export default ApprovedFiles;
