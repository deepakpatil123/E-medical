import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardCard from "../shared/DashboardCard";

function CompletedFiles() {
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no.",
      minWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "diary_No",
      headerName: "Diary No.",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "diary_Date",
      headerName: "Diary Date",
      minWidth: 130,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Name & Designation",
      minWidth: 150,
    },
    {
      field: "patient_Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Patient's Name",
      minWidth: 130,
    },
    {
      field: "CGHS_Type",
      headerName: "CGHS type",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "nature_Of_Treatment",
      headerName: "Nature Of Treatment",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "emergency",
      headerName: "Emergency",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "hospital_Name",
      headerName: "Hospital name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "recomendation_Of",
      headerName: "Recomendation",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "from",
      headerName: "Admited from",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "to",
      headerName: "Admited to",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "amount_Claimed",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Amount Claimed",
      minWidth: 130,
    },
    {
      field: "inadmissible_Amount",
      headerName: "Inadmissible Amount",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "amount_Reimbursed",
      headerName: "Amount Reimbursed",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "amount_In_Words",
      headerName: "Amount in Words",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "authority",
      headerName: "Authority/rule",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "no_Of_Emergency_Claimed_During_Current_Year",
      headerName: "No Of Emergency Claimed During Current Year",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "date_Of_Submission",
      headerName: "Date of Submition",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "submitted_To",
      headerName: "Submitted to",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "file_Number",
      headerName: "File No.",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "bill_No",
      headerName: "Bill No.",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "bill_Date",
      headerName: "Bill Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "budget",
      headerName: "Budget",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "expenditure",
      headerName: "Expenditure",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "remaining_Budget",
      headerName: "Remaining budget",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
  ];

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );
    const reqRes = res.data.data.filter(
      (item: any) => item.bill_No ? true : false
    );
    const rowData = reqRes.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));

    setRows(rowData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardCard title="Completed Files">
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
  );
}

export default CompletedFiles;
