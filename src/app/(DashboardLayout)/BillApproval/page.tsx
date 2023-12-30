"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function BillApproval() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 90,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",
      headerName: "First name",
      minWidth: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerClassName: "super-app-theme--header",
      headerName: "Last name",
      minWidth: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      headerClassName: "super-app-theme--header",
      type: "number",
      minWidth: 110,
      editable: true,
      flex: 1,
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
        const handleApprove = () => {
          const obj = { ...params.row, status: "Approved" };
          setRows(rows.map((item: any) => (item.id === obj.id ? obj : item)));
        };

        const handleReject = () => {
          const obj = { ...params.row, status: "Returned" };
          setRows(rows.map((item: any) => (item.id === obj.id ? obj : item)));
        };

        return (
          <>
            <Button
              disabled={params.row.status === "Approved"}
              variant="contained"
              color="success"
              onClick={() => handleApprove()}
            >
              Approve
            </Button>
            <Button
              disabled={params.row.status === "Returned"}
              variant="contained"
              color="error"
              onClick={() => handleReject()}
            >
              Return
            </Button>
          </>
        );
      },
    },
    {
      field: "status",
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      minWidth: 110,
      flex: 1,
    },
  ];

  const [rows, setRows] = useState([
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, status: "" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, status: "" },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: "" },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: 18,
      status: "",
    },
  ]);

  const handleSave = () => {
    setRows(rows.filter((item: any) => item.status === ""));
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="Bill Approval">
        <Box
          sx={{
            width: "100%",
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
      </DashboardCard>
      <Button
        onClick={() => handleSave()}
        variant="contained"
        sx={{ marginX: 70, marginTop: 2 }}
      >
        Save
      </Button>
    </PageContainer>
  );
}

export default BillApproval;
