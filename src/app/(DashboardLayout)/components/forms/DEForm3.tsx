/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./theme-elements/CustomTextField";

function DEForm3(props: any) {
  const date = new Date();
  const [formData, setFormData] = useState({
    bill_No: 0,
    bill_Date: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate()<10? `0${date.getDate()}`: date.getDate()}`,
    budget: 0,
    expenditure: 0,
    remaining_Budget: 0,
  });

  const handleSave = () => {
    props.enableNext();
    props.handleData(formData);
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      remaining_Budget: formData.budget - formData.expenditure,
    }));
  }, [formData.budget, formData.expenditure]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="number"
          mb="5px"
        >
          Bill Number
        </Typography>
        <CustomTextField
          onChange={(e: any) =>
            setFormData({ ...formData, bill_No: e.target.value })
          }
          type="number"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="number"
          mb="5px"
        >
          Bill Date
        </Typography>
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

      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="number"
          mb="5px"
        >
          Budget(₹)
        </Typography>
        <CustomTextField
          onChange={(e: any) =>
            setFormData({ ...formData, budget: e.target.value })
          }
          type="number"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="number"
          mb="5px"
        >
          Expenditure(₹)
        </Typography>
        <CustomTextField
          onChange={(e: any) =>
            setFormData({ ...formData, expenditure: e.target.value })
          }
          type="number"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={9}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="number"
          mb="5px"
        >
          Remaining budget(₹)
        </Typography>
        <CustomTextField
          value={formData.remaining_Budget}
          disabled
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} mx={62}>
        <Button
          disabled={formData.bill_No === 0 || formData.budget === 0 || formData.expenditure === 0}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default DEForm3;
