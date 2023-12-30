/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Modal,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ReimbursementForm from "../forms/ReimbursementForm";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DocsPreview from "../forms/PreviewPage/DocsPreview";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Preview from "../forms/PreviewPage/Preview";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import PrintData from "@/utils/AmoutReimbPrint";
import ReactToPrint from "react-to-print";

function AmountReimbursement() {
  const auth: any = useAuth();

  const [page, setPage] = useState("list");

  const [info, setInfo] = useState({});

  const [open, setOpen] = useState(false);

  const [docs, setDocs] = useState({});

  const [value, setValue] = useState(0);

  const [modalDisp, setModalDisp] = useState("");

  const [returnInfo, setReturnInfo] = useState({
    diary_No: "",
    remark_Reimbursement: "",
  });

  const [rows, setRows] = useState<any>([]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalDisp === "return" ? 500 : modalDisp === "info" ? 900 : "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReturnInfo({ diary_No: "", remark_Reimbursement: "" });
    setOpen(false);
  };

  const handleReturn = async () => {
    const res = axios.put(
      "http://localhost:4400/api/medical/returnFromReimbursement",
      returnInfo,
      {
        headers: {
          authorization: `Bearer ${auth?.user?.token}`,
        },
      }
    );
    getData();
    handleClose();
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
      field: "emergency",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: "Emergency",
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
          setModalDisp("docs");
          setDocs({
            test_Reports: [...params.row.test_Report],
            medical_Bills: [...params.row.medical_Bill],
          });
          handleOpen();
        };

        return (
          <Button variant="contained" onClick={handleClick}>
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
          setModalDisp("info");
          setInfo(params.row);
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
          setPage("entry");
        };

        const returnModal = () => {
          // setInfo(params.row);
          setModalDisp("return");
          setReturnInfo({ ...returnInfo, diary_No: params.row.diary_No });
          handleOpen();
        };

        return (
          <>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => handleClick()}
            >
              <AccountBalanceIcon />
            </Button>
            <Button variant="contained" color="error" onClick={returnModal}>
              Return
            </Button>
          </>
        );
      },
    },
  ];

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );

    const reqRes = res.data.data.filter(
      (item: any) =>
        (item.forward_By_Assistant_Diary_Entry ||
          item.ractify_By_Assistant_Diary_Entry) &&
        !item.forwardedByReimbursement &&
        !item.returnFromReimbursement &&
        !item.approve_By_Secretary &&
        !item.rectify_By_Amount_Reimbursement
    );

    const reqRows =
      value === 1
        ? reqRes.filter((item: any) => item.return_By_Secretary)
        : reqRes.filter((item: any) => !item.return_By_Secretary);

    const rowData = reqRows.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));
    setRows(rowData.sort((b: any, a: any) => a.id - b.id));
  };

  useEffect(() => {
    getData();
  }, [open, value]);

  return (
    <DashboardCard title={"Reimbursement"}>
      <>
        {page === "list" && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Files from Assistant Entry" {...a11yProps(0)} />
                <Tab label="Returned Files" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
        )}
        {page === "entry" && (
          <ReimbursementForm info={info} back={setPage} refreshList={getData} />
        )}{" "}
        {page === "list" && (
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
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalDisp === "info" ? (
              <Preview formData={info} />
            ) : modalDisp === "docs" ? (
              <DocsPreview documents={docs} />
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Remark
                </Typography>
                <TextareaAutosize
                  value={returnInfo.remark_Reimbursement}
                  onChange={(e) => {
                    setReturnInfo({
                      ...returnInfo,
                      remark_Reimbursement: e.target.value,
                    });
                  }}
                  minRows={5}
                  style={{ width: "100%" }}
                />
                <Button
                  disabled={returnInfo.remark_Reimbursement === ""}
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleReturn}
                >
                  Send
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
}

export default AmountReimbursement;
