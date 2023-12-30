"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import axios from "axios";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DocsPreview from "./PreviewPage/DocsPreview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import Preview from "./PreviewPage/Preview";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

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

function Approval() {

  const auth:any = useAuth()

  const [docs, setDocs] = useState({});

  const [dataPrev, setDataPrev] = useState({});

  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState([]);

  const [modalView, setModalView] = useState("");

  const [remark, setRemark] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setModalView("");
    setOpen(false);
  };

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
          setDocs({
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
          setModalView("prev");
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
  ];

  const handleApprove = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4400/api/medical/adminJSApprove",
        dataPrev,
        {
          headers: {
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    } catch (err: any) {
      alert(err.messege);
    }
    getData();
    setOpen(false);
  };

  const handleReturn = async () => {
    const returnData = { ...dataPrev, remark_Admin: remark }
    try {
      const res = await axios.put(
        "http://localhost:4400/api/medical/returnByadminJS",
        returnData,
        {
          headers: {
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
    getData();
    setRemark("");
    handleClose();
  };

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );
    const reqRes = res.data.data.filter(
      (item: any) =>
        item.forwardedByReimbursement &&
        !item.approve_By_Secretary &&
        (!item.return_By_Secretary || item.rectify_By_Amount_Reimbursement)
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
    <DashboardCard title="Files for Approval">
      <>
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalView === "prev" ? (
              <>
                <Typography variant="h6">
                  INFORMATION
                </Typography>
                <Preview formData={dataPrev}/>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Button
                    color="error"
                      variant="contained"
                      sx={{ mr: 1, borderRadius: 30 }}
                      onClick={() => setModalView("return")}
                    >
                      return
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      variant="contained"
                      sx={{ borderRadius: 30 }}
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  </Box>
              </>
            ) : modalView === "return" ? (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Remark
                </Typography>
                <TextareaAutosize
                  value={remark}
                  onChange={(e) => {
                    setRemark(e.target.value);
                  }}
                  minRows={5}
                  style={{ width: "100%" }}
                />
                <Button
                  disabled={remark === ""}
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleReturn}
                >
                  send
                </Button>
              </>
            ) : (
              <DocsPreview documents={docs} />
            )}
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
}

export default Approval;
