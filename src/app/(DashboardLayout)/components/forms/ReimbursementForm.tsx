/*
 eslint-disable react-hooks/exhaustive-deps 
*/
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomTextField from "./theme-elements/CustomTextField";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { numStyle, Asterisk, onKeyDown } from "../StylesnS";
import Preview from "./PreviewPage/Preview";
import PrintData from "@/utils/AmoutReimbPrint";
import ReactToPrint from "react-to-print";

function ReimbursementForm(props: any) {
  const auth: any = useAuth();

  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const componentRef: any = useRef();

  const handlePrintDialogOpen = () => {
    setPrintDialogOpen(true);
  };

  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
  };

  const date = new Date();

  const [formData, setFormData] = useState<any>({
    diary_No: props.info.diary_No,
    inadmissible_Amount: props.info.inadmissible_Amount
      ? props.info.inadmissible_Amount
      : "",
    amount_Reimbursed: props.info.amount_Reimbursed
      ? props.info.amount_Reimbursed
      : "",
    amount_In_Words: props.info.amount_In_Words
      ? props.info.amount_In_Words
      : "",
    authority:
      props.info.CGHS_Type == "CGHS" ? "CGHS authority" : "CS(MA) authority",
    no_Of_Emergency_Claimed_During_Current_Year: 0,
    date_Of_Submission: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    submitted_To: props.info.submitted_To ? props.info.submitted_To : "JS",
    file_Number: props.info.file_Number ? props.info.file_Number : "",
  });

  function test(n: any) {
    if (n < 0) return false;
    const single_digit = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const double_digit = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const below_hundred = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    if (n === 0) return "Zero";

    function translate(n: any) {
      let word = "";
      if (n < 10) {
        word = single_digit[n] + " ";
      } else if (n < 20) {
        word = double_digit[n - 10] + " ";
      } else if (n < 100) {
        const tens = below_hundred[Math.floor(n / 10)];
        const ones = single_digit[n % 10];
        word = tens + " " + ones + " ";
      } else if (n < 1000) {
        word =
          single_digit[Math.floor(n / 100)] + " Hundred " + translate(n % 100);
      } else if (n < 1000000) {
        word =
          translate(Math.floor(n / 1000)).trim() +
          " Thousand " +
          translate(n % 1000);
      } else if (n < 1000000000) {
        word =
          translate(Math.floor(n / 1000000)).trim() +
          " Million " +
          translate(n % 1000000);
      } else {
        word =
          translate(Math.floor(n / 1000000000)).trim() +
          " Billion " +
          translate(n % 1000000000);
      }
      return word;
    }

    let result = translate(n);
    return result.trim() + " Rupees";
  }
  const AmountInWord: any = test(formData.amount_Reimbursed);
  const handleSend = async () => {
    try {
      if (props.info.return_By_Secretary) {
        const reqData = { ...formData, diary_No: props.info.diary_No };
        console.log(reqData, "REQ  DATA REQ");

        const res = await axios.put(
          "http://localhost:4400/api/medical/updateAmountReimbursement",
          reqData,
          {
            headers: {
              authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );
      } else {
        console.log(formData, "FORM DATA REQ");

        const res = await axios.put(
          "http://localhost:4400/api/medical/reimbursement",
          formData,
          {
            headers: {
              authorization: `Bearer ${auth?.user?.token}`,
            },
          }
        );
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
    props.refreshList();
    props.back("list");
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      amount_Reimbursed:
        props.info.amount_Claimed - formData.inadmissible_Amount,
      amount_In_Words: test(formData.amount_Reimbursed),
    }));
  }, [
    formData.amount_Reimbursed,
    formData.inadmissible_Amount,
    props.info.amount_Claimed,
  ]);

  const [fileNumber, setFileNum] = useState("");
  const [inadmiAmount, setInadmiAmount] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount Claimed
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {`₹${props.info.amount_Claimed}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Inadmissible Amount
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.inadmissible_Amount}
            sx={numStyle}
            onChange={(e: any) => {
              setFormData({ ...formData, inadmissible_Amount: e.target.value });
              setInadmiAmount(e.target.value);
            }}
            type="number"
            onKeyDown={onKeyDown}
            variant="outlined"
            fullWidth
          />
          {props.info.amount_Claimed < formData.inadmissible_Amount && (
            <FormHelperText error> Enter Valid Input </FormHelperText>
          )}
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount reimbursed
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {`₹${props.info.amount_Claimed - formData.inadmissible_Amount}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Authority/Rule
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {formData.authority}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Amount in words
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {test(props.info.amount_Claimed - formData.inadmissible_Amount)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Emergency claim (2023/2024)
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.no_Of_Emergency_Claimed_During_Current_Year}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                no_Of_Emergency_Claimed_During_Current_Year: e.target.value,
              })
            }
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Date of Submission
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.date_Of_Submission}
            onChange={(e: any) =>
              setFormData({ ...formData, date_Of_Submission: e.target.value })
            }
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            Submitted to
          </Typography>
          <Asterisk />
          <Select
            size="small"
            fullWidth
            value={formData.submitted_To}
            onChange={(e: any) =>
              setFormData({ ...formData, submitted_To: e.target.value })
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"US"}>US</MenuItem>
            <MenuItem value={"JS"}>JS</MenuItem>
            <MenuItem value={"AS"}>AS</MenuItem>
            <MenuItem value={"Secretary"}>Secretary</MenuItem>
            <MenuItem value={"Chairman"}>Chairman</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            mb="5px"
          >
            File number
          </Typography>
          {!props.info.return_By_Secretary && <Asterisk />}
          <CustomTextField
            disabled={props.info.return_By_Secretary}
            value={
              props.info.return_By_Secretary
                ? props.info.file_Number
                : formData.file_Number
            }
            onChange={(e: any) => {
              setFormData({ ...formData, file_Number: e.target.value });
              setFileNum(e.target.value);
            }}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Preview formData={props.info} />

      <Grid display={"flex"} justifyContent={"space-between"}>
        <Button variant="contained" onClick={() => props.back("list")}>
          Back
        </Button>
        <Box>
          <Button
            sx={{ margin: "0 10px" }}
            disabled={formData.file_Number === "" || !formData.amount_In_Words}
            variant="outlined"
            onClick={handlePrintDialogOpen}
          >
            Preview
          </Button>
          <Button
            disabled={formData.file_Number === "" || !formData.amount_In_Words}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Grid>

      <Grid>
        {printDialogOpen && (
          <Dialog
            open={printDialogOpen}
            onClose={handlePrintDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <Box height="100vh">
              <DialogContent>
                <PrintData
                  InadmiAmo={inadmiAmount}
                  fileNumber={fileNumber}
                  ref={componentRef}
                  data={props.info}
                  AmountInWord={AmountInWord}
                />
                <Button
                  sx={{ margin: "0 10px" }}
                  variant="outlined"
                  onClick={handlePrintDialogClose}
                >
                  Close
                </Button>
                <ReactToPrint
                  trigger={() => <Button variant="contained">Print</Button>}
                  content={() => componentRef.current}
                />
              </DialogContent>
            </Box>
          </Dialog>
        )}
      </Grid>
    </>
  );
}

export default ReimbursementForm;
