"use client";
import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import DEForm1 from "../forms/DEForm1";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Preview from "../forms/PreviewPage/Preview";
import MyDropzone from "../forms/DropZone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import ReactToPrint from "react-to-print";
import PrintData from "@/utils/AmoutReimbPrint";

const steps = ["Data Entry", "Documents Upload"];

function AssistantEntryList() {
  const auth: any = useAuth();

  const [activeStep, setActiveStep] = useState<any>(0);

  const [value, setValue] = useState(0);

  const [allData, setAllData] = useState<any>({
    CGHS_Type: null,
  });

  const [isForm, setIsForm] = useState<any>(false);

  const [nextBtn, setNextBtn] = useState(false);

  const [billFiles, setBillFiles] = useState<any>([]);

  const [reportFiles, setReportFiles] = useState([]);

  const [info, setInfo] = useState<any>({});

  const handleData = (data: any) => {
    setAllData({ ...allData, ...data });
  };

  const enableNext = () => {
    setNextBtn(true);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setNextBtn(false);
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep <= 0) setIsForm(false);
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    for (let i = 0; i < billFiles.length; i++) {
      formData.append("files", billFiles[i]);
    }

    if (reportFiles.length !== 0) {
      for (let i = 0; i < reportFiles.length; i++) {
        formData.append("files", reportFiles[i]);
      }
    }

    const all = JSON.stringify(allData);

    formData.append("form", all);

    formData.append("noOfBills", billFiles.length);
    if (value === 0) {
      let res = await axios.put(
        "http://localhost:4400/api/medical/CreateDataEntry",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    } else {
      let res = await axios.put(
        "http://localhost:4400/api/medical/updateDataEntry",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    }
    getData();
    setIsForm(false);
  };

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
      field: "entry",
      headerName: "Assistant Entry",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => {
          setActiveStep(0);
          setIsForm(true);
          setInfo(params.row);
        };

        return (
          <>
            <Button
              variant="contained"
              color="primary"
              endIcon={<EditNoteIcon />}
              onClick={handleClick}
            >
              {value === 0 ? "Entry" : "Edit"}
            </Button>
          </>
        );
      },
    },
  ];

  const [rows, setRows] = useState<any>([]);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4400/api/medical/getAllDakEntry"
    );
    const reqRes =
      value === 0
        ? res.data.data.filter(
            (item: any) =>
              !item.forward_By_Assistant_Diary_Entry &&
              !item.returnFromReimbursement
          )
        : res.data.data.filter(
            (item: any) => item.returnFromReimbursement === true
          );

    const rowData = reqRes.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));
    setRows(rowData.sort((b: any, a: any) => a.id - b.id));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <DashboardCard title={"Assistant Diary Entry"}>
      <>
        {!isForm && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Files from DakEntry" {...a11yProps(0)} />
                <Tab label="Returned Files" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
        )}
        {isForm ? (
          <>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Preview formData={allData} />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button color="inherit" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button variant="outlined" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DashboardCard title={`Step ${activeStep + 1}`}>
                  <>
                    {activeStep === 0 && (
                      <DEForm1
                        handleData={handleData}
                        enableNext={enableNext}
                        info={info}
                      />
                    )}
                    {activeStep === 1 && (
                      <MyDropzone
                        bills={info.medical_Bill ? info.medical_Bill : []}
                        reports={info.test_Report ? info.test_Report : []}
                        enableNext={enableNext}
                        handleBillFiles={setBillFiles}
                        handleReportFiles={setReportFiles}
                      />
                    )}
                  </>
                </DashboardCard>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mr: 1, borderRadius: 30 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    variant="contained"
                    disabled={!nextBtn}
                    onClick={handleNext}
                    sx={{ borderRadius: 30 }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </>
        ) : (
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
      </>
    </DashboardCard>
  );
}

export default AssistantEntryList;
