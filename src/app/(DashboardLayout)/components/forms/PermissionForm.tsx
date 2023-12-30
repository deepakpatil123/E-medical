import React, { useState } from "react";
import DashboardCard from "../shared/DashboardCard";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTextField from "./theme-elements/CustomTextField";
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

function PermissionForm() {
  const [declaration, setDeclaration] = useState(false);

  const [noOfPathologicalTests, setNoOfPathologicalTests] = useState(1);
  const [noOfRadiologicalTests, setNoOfRadiologicalTests] = useState(1);
  const [noOfTreatmentTests, setNoOfTreatmentTests] = useState(1);

  const [pathologicalTestsData, setPathologicalTestsData] = useState<any>([]);
  const [radiologicalTestsData, setRadiologicalTestsData] = useState<any>([]);
  const [treatmentTestsData, setTreatmentTestsData] = useState<any>([]);

  const [pathologicaltest, setPathologicalTest] = useState({
    name: "",
    hospital: "",
    prescribedBy: "",
    date: "",
  });

  const [radiologicaltest, setRadiologicalTest] = useState({
    name: "",
    hospital: "",
    prescribedBy: "",
    date: "",
  });

  const [treatmenttest, setTreatmentTest] = useState({
    name: "",
    hospital: "",
    prescribedBy: "",
    date: "",
  });

  const [file, setFile] = useState<any>();

  const handleAddRowPathological = () => {
    setNoOfPathologicalTests(noOfPathologicalTests + 1);
    setPathologicalTestsData([...pathologicalTestsData, pathologicaltest]);
    setPathologicalTest({
      ...pathologicaltest,
      name: "",
      hospital: "",
      prescribedBy: "",
      date: "",
    });
  };

  const handleAddRowRadiological = () => {
    setNoOfRadiologicalTests(noOfRadiologicalTests + 1);
    setRadiologicalTestsData([...radiologicalTestsData, radiologicaltest]);
    setRadiologicalTest({
      ...radiologicaltest,
      name: "",
      hospital: "",
      prescribedBy: "",
      date: "",
    });
  };

  const handleAddRowTreatment = () => {
    setNoOfTreatmentTests(noOfTreatmentTests + 1);
    setTreatmentTestsData([...treatmentTestsData, treatmenttest]);
    setTreatmentTest({
      ...treatmenttest,
      name: "",
      hospital: "",
      prescribedBy: "",
      date: "",
    });
  };

  const handleDeclaration = () => {
    setDeclaration(!declaration);

    if (!declaration) {
      if (pathologicaltest.name !== "") {
        setPathologicalTestsData([...pathologicalTestsData, pathologicaltest]);
        setPathologicalTest({
          ...pathologicaltest,
          name: "",
          hospital: "",
          prescribedBy: "",
          date: "",
        });
      }
      if (radiologicaltest.name !== "") {
        setRadiologicalTestsData([...radiologicalTestsData, radiologicaltest]);
        setRadiologicalTest({
          ...radiologicaltest,
          name: "",
          hospital: "",
          prescribedBy: "",
          date: "",
        });
      }
      if (treatmenttest.name !== "") {
        setTreatmentTestsData([...treatmentTestsData, treatmenttest]);
        setTreatmentTest({
          ...treatmenttest,
          name: "",
          hospital: "",
          prescribedBy: "",
          date: "",
        });
      }
    }
  };

  const handleDeletePathological = (index: number) => {
    setNoOfPathologicalTests(noOfPathologicalTests - 1);
    pathologicalTestsData.splice(index, 1);
    setPathologicalTest(pathologicalTestsData);
  };

  const handleDeleteRadiological = (index: number) => {
    setNoOfRadiologicalTests(noOfRadiologicalTests - 1);
    radiologicalTestsData.splice(index, 1);
    setRadiologicalTestsData(radiologicalTestsData);
  };

  const handleDeleteTreatment = (index: number) => {
    setNoOfTreatmentTests(noOfTreatmentTests - 1);
    treatmentTestsData.splice(index, 1);
    setTreatmentTest(treatmentTestsData);
  };

  return (
    <>
      <DashboardCard title={"Permission Form"}>
        <>
          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mb={4}
          >
            {Array.from(Array(noOfPathologicalTests)).map(
              (elem: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the pathological test
                      </Typography>
                      <Asterisk/>
                      <CustomTextField
                        value={
                          index == pathologicalTestsData.length
                            ? pathologicaltest.name
                            : pathologicalTestsData[index].name
                        }
                        size="small"
                        placeholder="pathological test"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setPathologicalTest({
                            ...pathologicaltest,
                            name: e.target.value,
                          });
                        }}
                        disabled={
                          index == pathologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the Hospital/Diagonstic
                      </Typography><Asterisk/>
                      <Autocomplete
                        value={
                          index == pathologicalTestsData.length
                            ? pathologicaltest.hospital
                            : pathologicalTestsData[index].hospital
                        }
                        size="small"
                        placeholder="Hospital/Diagonstic"
                        id="outlined-basic"
                        sx={{ width: "100%" }}
                        onChange={(event: any, newValue: any) => {
                          setPathologicalTest({
                            ...pathologicaltest,
                            hospital: newValue,
                          });
                        }}
                        options={HospitalList}
                        renderInput={(params) => <TextField {...params} />}
                        disabled={
                          index == pathologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed by
                      </Typography>
                      <CustomTextField
                        value={
                          index == pathologicalTestsData.length
                            ? pathologicaltest.prescribedBy
                            : pathologicalTestsData[index].prescribedBy
                        }
                        size="small"
                        placeholder="Prescribed by"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setPathologicalTest({
                            ...pathologicaltest,
                            prescribedBy: e.target.value,
                          });
                        }}
                        disabled={
                          index == pathologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                      />
                    </Grid>

                    <Grid item xs={1.5}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed Date
                      </Typography><Asterisk/>
                      <CustomTextField
                        value={
                          index == pathologicalTestsData.length
                            ? pathologicaltest.date
                            : pathologicalTestsData[index].date
                        }
                        size="small"
                        id="outlined-basic"
                        type="date"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setPathologicalTest({
                            ...pathologicaltest,
                            date: e.target.value,
                          });
                        }}
                        disabled={
                          index == pathologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                      />
                    </Grid>

                    {noOfPathologicalTests > 1 &&
                      index < pathologicalTestsData.length &&
                      !declaration && (
                        <Grid item xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                          >
                            {" "}
                            Delete
                          </Typography>
                          <DeleteIcon
                            onClick={() => handleDeletePathological(index)}
                            fontSize="large"
                            sx={{
                              color: "rgb(225, 90, 17)",
                              cursor: "pointer",
                            }}
                          />
                        </Grid>
                      )}
                  </React.Fragment>
                );
              }
            )}

            {pathologicaltest.name &&
            pathologicaltest.hospital &&
            pathologicaltest.prescribedBy &&
            pathologicaltest.date &&
            !declaration ? (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddRowPathological()}
                >
                  Add row
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mb={4}
          >
            {Array.from(Array(noOfRadiologicalTests)).map(
              (elem: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the Radiological test
                      </Typography><Asterisk/>
                      <CustomTextField
                        value={
                          index == radiologicalTestsData.length
                            ? radiologicaltest.name
                            : radiologicalTestsData[index].name
                        }
                        size="small"
                        placeholder="Radiological test"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setRadiologicalTest({
                            ...radiologicaltest,
                            name: e.target.value,
                          });
                        }}
                        disabled={
                          index == radiologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the Hospital/Diagonstic
                      </Typography>
                      <Asterisk/>
                      <Autocomplete
                        value={
                          index == radiologicalTestsData.length
                            ? radiologicaltest.hospital
                            : radiologicalTestsData[index].hospital
                        }
                        disabled={
                          index == radiologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Hospital/Diagonstic"
                        id="outlined-basic"
                        sx={{ width: "100%" }}
                        onChange={(event: any, newValue: any) => {
                          setRadiologicalTest({
                            ...radiologicaltest,
                            hospital: newValue,
                          });
                        }}
                        options={HospitalList}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed by
                      </Typography>
                      <CustomTextField
                        value={
                          index == radiologicalTestsData.length
                            ? radiologicaltest.prescribedBy
                            : radiologicalTestsData[index].prescribedBy
                        }
                        disabled={
                          index == radiologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Prescribed by"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setRadiologicalTest({
                            ...radiologicaltest,
                            prescribedBy: e.target.value,
                          });
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={1.5}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed Date
                      </Typography><Asterisk/>
                      <CustomTextField
                        value={
                          index == radiologicalTestsData.length
                            ? radiologicaltest.date
                            : radiologicalTestsData[index].date
                        }
                        disabled={
                          index == radiologicalTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Prescribed Date"
                        id="outlined-basic"
                        type="date"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setRadiologicalTest({
                            ...radiologicaltest,
                            date: e.target.value,
                          });
                        }}
                        required
                      />
                    </Grid>

                    {noOfRadiologicalTests > 1 &&
                      index < radiologicalTestsData.length &&
                      !declaration && (
                        <Grid item xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                          >
                            {" "}
                            Delete
                          </Typography>
                          <DeleteIcon
                            onClick={() => handleDeleteRadiological(index)}
                            fontSize="large"
                            sx={{
                              color: "rgb(225, 90, 17)",
                              cursor: "pointer",
                            }}
                          />
                        </Grid>
                      )}
                  </React.Fragment>
                );
              }
            )}

            {radiologicaltest.name &&
            radiologicaltest.hospital &&
            radiologicaltest.prescribedBy &&
            radiologicaltest.date &&
            !declaration ? (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddRowRadiological()}
                >
                  Add row
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
          >
            {Array.from(Array(noOfTreatmentTests)).map(
              (elem: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the Procedure/Treatment
                      </Typography><Asterisk/>
                      <CustomTextField
                        value={
                          index == treatmentTestsData.length
                            ? treatmenttest.name
                            : treatmentTestsData[index].name
                        }
                        disabled={
                          index == treatmentTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Procedure/Treatment"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setTreatmentTest({
                            ...treatmenttest,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Name of the Hospital/Diagonstic
                      </Typography><Asterisk/>
                      <Autocomplete
                        value={
                          index == treatmentTestsData.length
                            ? treatmenttest.hospital
                            : treatmentTestsData[index].hospital
                        }
                        disabled={
                          index == treatmentTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Hospital/Diagonstic"
                        id="outlined-basic"
                        sx={{ width: "100%" }}
                        onChange={(event: any, newValue: any) => {
                          setTreatmentTest({
                            ...treatmenttest,
                            hospital: newValue,
                          });
                        }}
                        options={HospitalList}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed by
                      </Typography>
                      <CustomTextField
                        value={
                          index == treatmentTestsData.length
                            ? treatmenttest.prescribedBy
                            : treatmentTestsData[index].prescribedBy
                        }
                        disabled={
                          index == treatmentTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Prescribed by"
                        id="outlined-basic"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setTreatmentTest({
                            ...treatmenttest,
                            prescribedBy: e.target.value,
                          });
                        }}
                      />
                    </Grid>

                    <Grid item xs={1.5}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        mb="5px"
                      >
                        {" "}
                        Prescribed Date
                      </Typography><Asterisk/>
                      <CustomTextField
                        value={
                          index == treatmentTestsData.length
                            ? treatmenttest.date
                            : treatmentTestsData[index].date
                        }
                        disabled={
                          index == treatmentTestsData.length && !declaration
                            ? false
                            : true
                        }
                        size="small"
                        placeholder="Prescribed Date"
                        id="outlined-basic"
                        type="date"
                        sx={{ width: "100%" }}
                        onChange={(e: any) => {
                          setTreatmentTest({
                            ...treatmenttest,
                            date: e.target.value,
                          });
                        }}
                      />
                    </Grid>

                    {noOfTreatmentTests > 1 &&
                      index < treatmentTestsData.length &&
                      !declaration && (
                        <Grid item xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            mb="5px"
                          >
                            {" "}
                            Delete
                          </Typography>
                          <DeleteIcon
                            onClick={() => handleDeleteTreatment(index)}
                            fontSize="large"
                            sx={{
                              color: "rgb(225, 90, 17)",
                              cursor: "pointer",
                            }}
                          />
                        </Grid>
                      )}
                  </React.Fragment>
                );
              }
            )}

            {treatmenttest.name &&
            treatmenttest.hospital &&
            treatmenttest.prescribedBy &&
            treatmenttest.date &&
            !declaration ? (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddRowTreatment()}
                >
                  Add row
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          <Grid
          container
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mt={5}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
              Upload scanned letter from CGHS/AMA (Pdf Size 5 MB MAXIMUM)
            </Typography><Asterisk/>
            <Grid item xs={12}>
            <label htmlFor="file-upload">
              <Button
                size="small"
                variant="contained"
                sx={{
                  background: "rgb(225, 90, 17)",
                  "&:hover": { background: "rgb(255, 120, 50)" },
                }}
                component="span"
              >
                Choose File
              </Button>
              <input
                id="file-upload"
                type="file"
                hidden
                accept=".png,.jpeg,.pdf"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </label>{" "}
            {file ? file.name : "No file chosen"}
            </Grid>

            <Grid
        columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >
        <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              mb="5px"
            >
          {" "}
          Enter below any exrta information you would like to provide
        </Typography>
        <TextareaAutosize
          minRows={5}
          style={{ width: "100%" }}
          disabled={declaration}
        />
      </Grid>

      <FormControlLabel
        sx={{
          padding: "10px",
          margin: "20px",
        }}
        control={
          <Checkbox
            checked={declaration}
            size="small"
          />
        }
        onChange={() => handleDeclaration()}
        label="I hereby declare that the details furnished above are true and correct to the best of my knowledge."
      />

      <Grid
        container
        spacing={1.5}
        sx={{ paddingX: "30px", marginBottom: "20px" }}
      >
        <Grid item>
          <Button disabled={!declaration} variant="contained" size="small">
            Submit
          </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" size="small">
            reset
          </Button>
        </Grid>

        <Grid item>
          <Button size="small" variant="text">
            Cancel
          </Button>
        </Grid>
      </Grid>
          </Grid>
        </>
      </DashboardCard>
    </>
  );
}

export default PermissionForm;
