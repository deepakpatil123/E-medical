"use client";
import React, { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ReimbursementForm from "../components/forms/ReimbursementForm";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";

import { TextareaAutosize } from "@mui/base";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Reimbursement() {
  const [toBillEntry, setToBillEntry] = useState(false);

  const [info, setInfo] = useState({});

  const [open, setOpen] = React.useState(false);

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
      field: "amount_Claimed",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Claimed amount",
      type: "number",
      minWidth: 150,
    },
    {
      field: "Action",
      headerName: "Actions",
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

        const handleReturn = () => {
          setInfo(params.row);
          handleOpen();
        };

        return (
          <>
            <Button variant="contained" onClick={() => handleClick()}>
              <AccountBalanceIcon />
            </Button>
            <Button variant="contained" color="error" onClick={handleReturn}>
              Return
            </Button>
          </>
        );
      },
    },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      amount_Claimed: 1000,
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      amount_Claimed: 5000,
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      amount_Claimed: 2000,
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      amount_Claimed: 4000,
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: 18,
      amount_Claimed: 30000,
    },
  ]);

  const handleSend = (item: any) => {
    setToBillEntry(false);
    setRows(rows.filter((elem: any) => elem.id !== item.id));
    handleClose()
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title={toBillEntry ? "Reimbursement" : "Claim Files"}>
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
            <ReimbursementForm
              send={handleSend}
              info={info}
              back={setToBillEntry}
            />
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Remark
              </Typography>
              <TextareaAutosize
          minRows={5}
          style={{ width: "100%" }}
        />
              <Button variant="contained" endIcon={<SendIcon />} onClick={()=>handleSend(info)}>
                Send
              </Button>
            </Box>
          </Modal>
        </>
      </DashboardCard>
    </PageContainer>
  );
}

export default Reimbursement;
