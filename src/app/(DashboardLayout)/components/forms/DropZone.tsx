import {
  Box,
  Button,
  Grid,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Link from "next/link";

export default function MyDropzone(props: any) {
  const toUpload = ["medical_Bill", "test_Report"];

  const [paths, setPaths] = useState<any>({});

  const [billFiles, setBillFiles] = useState<any>(
    props.bills.map((item: any) => ({ name: item }))
  );

  const [reportFiles, setReportFiles] = useState<any>(
    props.reports.map((item: any) => ({ name: item }))
  );

  const [docType, setDocType] = useState("medical_Bill");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          if (
            file.name.endsWith(".pdf") ||
            file.name.endsWith(".png") ||
            file.name.endsWith(".jpg")
          ) {
            if (docType === "medical_Bill" && billFiles.length < 5)
              setBillFiles([...billFiles, file]);
            if (docType === "test_Report" && reportFiles.length < 5)
              setReportFiles([...reportFiles, file]);
            setPaths({ ...paths, [file.name]: URL.createObjectURL(file) });
          } else {
            alert("only images and pdfs are allowed");
          }
          const binaryStr = reader.result;
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [docType, billFiles, reportFiles, paths]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (event: SelectChangeEvent) => {
    setDocType(event.target.value);
  };

  const handleDelete = (file: any) => {
    if (billFiles.includes(file))
      setBillFiles(billFiles.filter((item: any) => item?.name !== file.name));
    setReportFiles(reportFiles.filter((item: any) => item?.name !== file.name));
  };

  const handleSave = () => {
    props.enableNext();
    props.handleBillFiles(billFiles);
    props.handleReportFiles(reportFiles);
  };

  const [previewFile, setPreviewFile] = useState<any>(null);

  const handlePreview = (file: any) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: "98%" }} size="small">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          mb="5px"
        >
          Select the type of document to upload
        </Typography>
        <Select
          value={docType === "" ? "placeholder" : docType}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {toUpload.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item?.replace(/_/g, " ")}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Box
        sx={{
          border: "2px dotted black",
          paddingY: 20,
          paddingX: 45,
          background: "#e5e5e5",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Typography
          variant="body1"
          sx={docType === "" ? { color: "red" } : { color: "#385dc7" }}
        >
          {docType === ""
            ? "Select the type of document to upload first"
            : "Drag 'n' drop some files here, or click to select files"}
        </Typography>
      </Box>
      <Grid container>
        {billFiles.length !== 0 && (
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Medical Bills
            </Typography>
          </Grid>
        )}

        {billFiles.map((item: any) => {
          return (
            <Grid
              item
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              key={item?.name}
              xs={2.5}
            >
              <Link
                target="_blank"
                href={
                  paths[item?.name]
                    ? paths[item?.name]
                    : `http://localhost:4400/medicalBill/${item?.name}`
                }
              >
                {item?.name?.endsWith("pdf") ? (
                  <PictureAsPdfIcon fontSize="large" sx={{ color: "red" }} />
                ) : (
                  <ImageIcon fontSize="large" color="primary" />
                )}
              </Link>
              <Chip
                label={item?.name}
                onDelete={() => {
                  handleDelete(item);
                }}
              />
            </Grid>
          );
        })}

        {reportFiles.length !== 0 && (
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Test Reports
            </Typography>
          </Grid>
        )}

        {reportFiles.map((item: any) => {
          return (
            <Grid
              item
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              key={item?.name}
              xs={2.5}
            >
              <Link
                target="_blank"
                href={
                  paths[item?.name]
                    ? paths[item?.name]
                    : `http://localhost:4400/medicalBill/${item?.name}`
                }
              >
                {item?.name?.endsWith("pdf") ? (
                  <PictureAsPdfIcon fontSize="large" sx={{ color: "red" }} />
                ) : (
                  <ImageIcon fontSize="large" color="primary" />
                )}
              </Link>
              <Chip
                label={item?.name}
                onDelete={() => {
                  handleDelete(item);
                }}
              />
            </Grid>
          );
        })}

        <Grid item xs={12} mx={62} mt={2}>
          <Button
            disabled={billFiles.length === 0}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
        {billFiles.map((item: any) => {
          return (
            <Grid
              item
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              key={item?.name}
              xs={2.5}
            >
              <Button variant="outlined" onClick={() => handlePreview(item)}>
                Preview
              </Button>
            </Grid>
          );
        })}
        <Grid>
          <Dialog
            open={Boolean(previewFile)}
            // sx={{ width: "1000px" }}
            onClose={handleClosePreview}
          >
            <DialogTitle>Document Preview</DialogTitle>
            <DialogContent sx={{ width: "500px" }}>
              {previewFile?.name?.endsWith("pdf") ? (
                <embed
                  src={
                    paths[previewFile?.name]
                      ? paths[previewFile?.name]
                      : `http://localhost:4400/medicalBill/${previewFile.name}`
                  }
                  width="100%"
                  height="600px"
                  type="application/pdf"
                />
              ) : (
                <img
                  src={paths[previewFile?.name]}
                  alt={previewFile?.name}
                  style={{ maxWidth: "100%", maxHeight: "600px" }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePreview}>Close</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}
