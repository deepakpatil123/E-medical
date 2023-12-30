import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardCard from "../shared/DashboardCard";
import BillEntryForm from "../forms/BillEntryForm/BillEntryForm";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Preview from "../forms/PreviewPage/Preview";
import DocsPreview from "../forms/PreviewPage/DocsPreview";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BillEntryList() {
  const [open, setOpen] = useState(false);

  const [dataPrev, setDataPrev] = useState({});

  const [modalPrev, setModalPrev] = useState("");

  const [isBillEntry, setIsBillentry] = useState(false);

  const [rows, setRows] = useState([]);

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
      minWidth: 100,
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
      field: "patient_Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Patient's Name",
      minWidth: 130,
    },
    {
      field: "amount_Claimed",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Amount Claimed",
      minWidth: 130,
    },
    {
      field: "docs",
      headerName: "Documents",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const handleClick = () => {
          setModalPrev("docs");
          setDataPrev({
            test_Reports: [...params.row.test_Report],
            medical_Bills: [...params.row.medical_Bill],
          });
          handleOpen();
        };

        return (
          <Button variant="contained" onClick={() => handleClick()}>
            <FileCopyIcon />
          </Button>
        );
      },
    },
    {
      field: "preview",
      headerName: "Preview",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const handlePrev = () => {
          setModalPrev("prev");
          setDataPrev(params.row);
          handleOpen();
        };

        return (
          <Button
            disabled={params.row.status === "Approved"}
            variant="contained"
            color="primary"
            onClick={handlePrev}
          >
            <VisibilityIcon />
          </Button>
        );
      },
    },
    {
      field: "billEntry",
      headerName: "Bill Entry",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const handlePrev = () => {
          setDataPrev(params.row);
          setIsBillentry(true);
        };

        return (
          <>
            {params.row.bill_No ? (
              <DoneOutlineIcon />
            ) : (
              <Button variant="contained" color="primary" onClick={handlePrev}>
                <AccountBalanceIcon />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );
    const reqRes = res.data.data.filter(
      (item: any) => item.approve_By_Secretary === true
    );
    const rowData = reqRes.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));

    setRows(rowData.sort((b: any, a: any) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [isBillEntry]);

  return (
    <DashboardCard title="Bill And Budget Entry">
      <>
        {isBillEntry ? (
          <BillEntryForm info={dataPrev} back={setIsBillentry} />
        ) : (
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
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalPrev === "prev" && <Preview formData={dataPrev} />}
            {modalPrev === "docs" && <DocsPreview documents={dataPrev} />}
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
}

export default BillEntryList;
