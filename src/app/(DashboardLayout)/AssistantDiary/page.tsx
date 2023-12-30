"use client";
import {
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextareaAutosize,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import DashboardCard from "../components/shared/DashboardCard";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function AssistantDiary() {
  const date = new Date();

  const [formData, setFormData] = useState<any>({
    diaryNo:"",
    name:"",
    date: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate()<10? `0${date.getDate()}`: date.getDate()}`,
    amount:0,
    holdStatus:null,
  });


  return ( 
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="Assistant Diary">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="number"
              mb="5px"
            >
              Diary Number
            </Typography>
            <CustomTextField
              onChange={(e: any) => {
                setFormData({ ...formData, diaryNo: e.target.value });
              }}
              variant="outlined"
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
              {"Employee Name(Designation)/Hospital Name"}
            </Typography>
            <CustomTextField
              onChange={(e: any) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              id="name"
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
              Receiving Date
            </Typography>
            <CustomTextField
              value={formData.date}
              onChange={(e: any) => {
                setFormData({ ...formData, date: e.target.value });
              }}
              type="date"
              id="date"
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
              Amount Claimed
            </Typography>
            <CustomTextField
            value={formData.amount}
              onChange={(e: any) => {
                setFormData({ ...formData, amount: e.target.value });
              }}
              type="number"
              id="amount"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e: any) => {
                  setFormData({ ...formData, holdStatus: e.target.value });
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Hold"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Returned"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Remarks
            </Typography>
            <TextareaAutosize
              onChange={(e: any) => {
                setFormData({ ...formData, remarks: e.target.value });
              }}
              minRows={5}
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} mx={62}>
            <Button variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Grid>

          
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
}

export default AssistantDiary;
