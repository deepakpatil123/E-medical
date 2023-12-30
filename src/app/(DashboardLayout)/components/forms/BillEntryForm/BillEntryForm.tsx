import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { numStyle, Asterisk, onKeyDown } from "../../StylesnS";
import Preview from "../PreviewPage/Preview";
import BillEntryPrint from "@/utils/BillEntryPrint";
import ReactToPrint from "react-to-print";

function BillEntryForm(props: any) {
  const auth: any = useAuth();

  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  const BillEntryRef: any = useRef();

  console.log(BillEntryRef.current, "REFE");

  const handlePrintDialogOpen = () => {
    setPrintDialogOpen(true);
  };

  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
  };

  const date = new Date();
  const [formData, setFormData] = useState({
    diary_No: props.info.diary_No,
    bill_No: "",
    bill_Date: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    budget: 0,
    expenditure: 0,
    remaining_Budget: 0,
  });

  const [areMandatoryFieldsFilled, setAreMandatoryFieldsFilled] =
    useState(false);

  const handleSend = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4400/api/medical/createBillEntry",
        formData,
        {
          headers: {
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
    props.back(false);
  };

  useEffect(() => {
    const mandatoryFieldsFilled: any =
      (formData.bill_No && formData.budget && formData.expenditure !== 0) || "";

    setAreMandatoryFieldsFilled(mandatoryFieldsFilled);

    setFormData((prevState: any) => ({
      ...prevState,
      remaining_Budget: formData.budget - formData.expenditure,
    }));
  }, [formData.budget, formData.expenditure]);

  const [billNo, setBillNo] = useState(null);
  const [expenditure, setExpenditure] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Bill Number
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.bill_No}
            onChange={(e: any) => {
              setFormData({ ...formData, bill_No: e.target.value });
              setBillNo(e.target.value);
            }}
            variant="outlined"
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Bill Date
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.bill_Date}
            onChange={(e: any) =>
              setFormData({ ...formData, bill_Date: e.target.value })
            }
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Budget
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.budget}
            onChange={(e: any) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Expenditure
          </Typography>
          <Asterisk />
          <CustomTextField
            value={formData.expenditure}
            onChange={(e: any) => {
              setFormData({ ...formData, expenditure: e.target.value });
              setExpenditure(e.target.value);
            }}
            type="number"
            onKeyDown={onKeyDown}
            sx={numStyle}
            variant="outlined"
            fullWidth
          />
          {formData.remaining_Budget < 0 && (
            <FormHelperText error>
              {" "}
              Expenditure cannot be greater than budget{" "}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Remaining Budget
          </Typography>
          <Grid>
            <Typography
              fontSize={20}
              paddingX={2}
              variant="subtitle1"
              fontWeight={400}
              component="label"
            >
              {formData.remaining_Budget}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Preview formData={props.info} />

      <Grid display={"flex"} justifyContent={"space-between"} mt={5}>
        <Button
          variant="contained"
          onClick={() => {
            props.back(false);
          }}
        >
          Back
        </Button>
        <Box>
          <Button
            sx={{ margin: "0 10px" }}
            disabled={
              !formData.bill_No ||
              !formData.budget ||
              !formData.expenditure ||
              formData.remaining_Budget < 0
            }
            variant="outlined"
            onClick={handlePrintDialogOpen}
          >
            Preview
          </Button>
          <Button
            disabled={
              !formData.bill_No ||
              !formData.budget ||
              !formData.expenditure ||
              formData.remaining_Budget < 0
            }
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Grid>
      {printDialogOpen && (
        <Dialog
          open={printDialogOpen}
          onClose={handlePrintDialogClose}
          maxWidth="lg"
          fullWidth
        >
          <Box height="100vh">
            <DialogContent>
              <BillEntryPrint
                ref={BillEntryRef}
                data={props.info}
                billNumber={billNo}
                expenditure={expenditure}
                balance={formData.remaining_Budget}
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
                content={() => BillEntryRef.current}
              />
            </DialogContent>
          </Box>
        </Dialog>
      )}
    </>
  );
}

export default BillEntryForm;
