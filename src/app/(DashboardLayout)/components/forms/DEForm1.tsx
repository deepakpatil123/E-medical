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
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./theme-elements/CustomTextField";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Asterisk } from "../StylesnS";

const HospitalList = [
  "All India Institute of Medical Sciences (AIIMS)",
  "Post Graduate Institute of Medical Education and Research (PGIMER)",
  "Safdarjung Hospital",
  "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER)",
  "King George's Medical University (KGMU)",
  "Madras Medical College (MMC)",
  "Lady Hardinge Medical College (LHMC)",
  "Grant Medical College and Sir J.J. Group of Hospitals",
  "All India Institute of Hygiene and Public Health (AIIH&PH)",
  "Lok Nayak Hospital",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function DEForm1(props: any) {
  const date = new Date();

  const [formData, setFormData] = useState<any>({
    diary_No: props.info.diary_No,
    diary_Date: `${date.getFullYear()}-${
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    patient_Name: props.info.patient_Name ? props.info.patient_Name : "",
    nature_Of_Treatment: props.info.nature_Of_Treatment
      ? props.info.nature_Of_Treatment
      : "",
    hospital_Name: props.info.hospital_Name ? props.info.hospital_Name : [],
    recomendation_Of: props.info.recomendation_Of
      ? props.info.recomendation_Of
      : "",
    from: props.info.from ? props.info.from : "",
    to: props.info.to ? props.info.to : "",
    CGHS_Type: props.info.CGHS_Type ? props.info.CGHS_Type : "",
    emergency: props.info.emergency ? props.info.emergency : "",
  });

  const handleSave = () => {
    props.enableNext();
    props.handleData(formData);
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFormData(
      // On autofill we get a stringified value.
      {
        ...formData,
        hospital_Name: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Diary Number
        </Typography>
        <Grid>
          <Typography
            fontSize={20}
            paddingX={2}
            variant="subtitle1"
            fontWeight={400}
            component="label"
          >
            {formData.diary_No}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Diary Date
        </Typography>
        <Asterisk />
        <CustomTextField
          value={formData.diary_Date}
          onChange={(e: any) =>
            setFormData({ ...formData, diary_Date: e.target.value })
          }
          type="date"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Name & Designation
        </Typography>
        <Grid>
          <Typography
            fontSize={20}
            paddingX={2}
            variant="subtitle1"
            fontWeight={400}
            component="label"
          >
            {props.info.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Patient&apos;s name
        </Typography>
        <Asterisk />
        <CustomTextField
          value={formData.patient_Name}
          onChange={(e: any) =>
            setFormData({ ...formData, patient_Name: e.target.value })
          }
          variant="outlined"
          fullWidth
        />
        {!/^[a-zA-Z, ]*$/.test(formData.patient_Name) && (
          <FormHelperText error> Enter Valid Input </FormHelperText>
        )}
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Nature of Treatment
        </Typography>
        <Asterisk />
        <CustomTextField
          value={formData.nature_Of_Treatment}
          onChange={(e: any) =>
            setFormData({ ...formData, nature_Of_Treatment: e.target.value })
          }
          variant="outlined"
          fullWidth
        />
        {!/^[a-zA-Z, ]*$/.test(formData.nature_Of_Treatment) && (
          <FormHelperText error> Enter Valid Input </FormHelperText>
        )}
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Hospital name
        </Typography>
        <Asterisk />
        <Select
          multiple
          displayEmpty
          value={formData.hospital_Name}
          onChange={handleChange}
          input={<OutlinedInput size="small" fullWidth />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {HospitalList.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Recomendation of
        </Typography>
        <CustomTextField
          value={formData.recomendation_Of}
          onChange={(e: any) =>
            setFormData({ ...formData, recomendation_Of: e.target.value })
          }
          variant="outlined"
          fullWidth
        />
        {!/^[a-zA-Z, ]*$/.test(formData.recomendation_Of) && (
          <FormHelperText error> Enter Valid Input </FormHelperText>
        )}
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          From
        </Typography>
        <Asterisk />
        <CustomTextField
          value={formData.from}
          onChange={(e: any) =>
            setFormData({ ...formData, from: e.target.value })
          }
          type="date"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          to
        </Typography>
        <Asterisk />
        <CustomTextField
          disabled={formData.from === ""}
          value={formData.to}
          onChange={(e: any) =>
            setFormData({ ...formData, to: e.target.value })
          }
          type="date"
          variant="outlined"
          fullWidth
        />
        {new Date(formData.to) < new Date(formData.from) && (
          <FormHelperText error>
            {" "}
            Date should be greater than from date{" "}
          </FormHelperText>
        )}
      </Grid>

      <Grid item xs={4}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            CGHS Type <Asterisk />
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={formData.CGHS_Type}
            onChange={(e: any) =>
              setFormData({ ...formData, CGHS_Type: e.target.value })
            }
          >
            <FormControlLabel value={"CGHS"} control={<Radio />} label="CGHS" />
            <FormControlLabel
              value={"Non-CGHS"}
              control={<Radio />}
              label="Non-CGHS"
            />
            <FormControlLabel value={"AMA"} control={<Radio />} label="AMA" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Emergency <Asterisk />
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={formData.emergency}
            onChange={(e: any) =>
              setFormData({ ...formData, emergency: e.target.value })
            }
          >
            <FormControlLabel value={"yes"} control={<Radio />} label="yes" />
            <FormControlLabel value={"no"} control={<Radio />} label="no" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={600} component="label">
          Amount Claimed(₹)
        </Typography>
        <Grid>
          <Typography
            fontSize={20}
            paddingX={2}
            variant="subtitle1"
            fontWeight={400}
            component="label"
          >
            {props.info.amount_Claimed}
          </Typography>
        </Grid>
      </Grid>
      {props.info.remark_Reimbursement ? (
        <Grid item xs={12}>
          {" "}
          <Typography variant="subtitle1" fontWeight={600} component="label">
            Remark : {props.info.remark_Reimbursement}
          </Typography>
        </Grid>
      ) : (
        ""
      )}
      <Grid item xs={12} mx={62}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            formData.CGHS_Type === "" ||
            formData.patient_Name === "" ||
            formData.nature_Of_Treatment === "" ||
            formData.hospital_Name.length === 0 ||
            formData.from === "" ||
            formData.to === "" ||
            formData.emergency === "" ||
            !/^[a-zA-Z, ]*$/.test(formData.patient_Name) ||
            !/^[a-zA-Z, ]*$/.test(formData.nature_Of_Treatment)
          }
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default DEForm1;
