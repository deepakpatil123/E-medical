"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function ReturnedFiles() {

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", minWidth: 90,headerClassName: 'super-app-theme--header', flex:1 },
        {
          field: "firstName",
          headerClassName: 'super-app-theme--header',
          headerName: "First name",
          minWidth: 150,
          editable: true,
          flex:1
        },
        {
          field: "lastName",
          headerClassName: 'super-app-theme--header',
          headerName: "Last name",
          minWidth: 150,
          editable: true,
          flex:1
        },
        {
          field: "age",
          headerName: "Age",
          headerClassName: 'super-app-theme--header',
          type: "number",
          minWidth: 110,
          editable: true,
          flex:1
        },
        {
          field: "status",
          headerClassName: 'super-app-theme--header',
          headerName: "Status",
          minWidth: 110,
          flex:1
        },        
        {
            field: "approval",
            headerName: "Approval",
            headerClassName: 'super-app-theme--header',
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            minWidth: 160,
            flex:1,
            renderCell: (params) => {
              // const handleSave = () => {
              //  setRows(rows.filter((item: any) => item.id !== params.row.id));
              // };
      
              return (
             
                  <Button
                    disabled={params.row.status === "Approved"}
                    variant="contained"
                    endIcon={<BorderColorIcon />}
                    // onClick={() => handleSave()}
                  >
                    Edit
                  </Button>
              
              );
            },
          },
      ];
    
      const [rows, setRows] = useState([
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "Returned" },
        {
          id: 2,
          lastName: "Lannister",
          firstName: "Cersei",
          age: 42,
          status: "Returned",
        },
        {
          id: 3,
          lastName: "Lannister",
          firstName: "Jaime",
          age: 45,
          status: "Returned",
        },
        {
          id: 4,
          lastName: "Stark",
          firstName: "Arya",
          age: 16,
          status: "Returned",
        },
        {
          id: 5,
          lastName: "Targaryen",
          firstName: "Daenerys",
          age: 18,
          status: "Returned",
        },
      ]);

      const handleCellChange = (params: any, event: any) => {
    
        if (event.target.value !== undefined) {
          const newValue = event.target.value;
    
          const updatedRows = rows.map((row) =>
            row.id === params.id ? { ...row, [params.field]: newValue } : row
          );
          setRows(updatedRows);
        }
      };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="Returned Files">
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
            onCellEditStop={handleCellChange}
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
    </PageContainer>
  )
}

export default ReturnedFiles