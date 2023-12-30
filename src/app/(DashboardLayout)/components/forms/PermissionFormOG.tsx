import React, { useState } from "react";
import {
  Checkbox,
  Button,
  Grid,
  OutlinedInput,
  FormControlLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import DeleteIcon from "@mui/icons-material/Delete";

import { Heading1, Heading2, Bodytxt, DelButton, AddButton } from "./Styles";

const tableDataLable = [
  "Name of Employe:",
  "Section/Branch/Posted at:",
  "Basic Pay:",
  "CGHS Card No/AMA:",
  "Name of the dispensary:",
];

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

function PermissionForm(permissionData: any) {
  
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
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 3, sm: 2, md: 3 }}
      sx={{
        width: "100%",
        height: "auto",
        background: "#F7F7F7",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          height: "56px",
          fontSize: "20px",
          background: "#3E7D60",
          alignItem: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Heading1>Permission Form</Heading1>
      </Grid>

      <Grid
        container
        spacing={1.5}
        columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
        sx={{
          width: "auto",
          height: "auto",
          color: "#000000",
          backgroundColor: "white",
          border: "1px solid #8B8B8B",
          padding: "10px",
          boxShadow: "0px 4px 250px 0px #00000000",
          margin: "20px",
        }}
      >
        <Grid container>
          <Grid xs={6}>
            {tableDataLable.map((elem: string, id: number) => {
              return (
                <Grid key={id}>
                  <Bodytxt>{elem}</Bodytxt>
                </Grid>
              );
            })}
          </Grid>

          <Grid xs={6}>
            {permissionData?.permissionData?.data?.map((elem: any) => {
              return (
                <Grid key={elem?._id}>
                  <Bodytxt>{elem.name}</Bodytxt>
                  <Bodytxt>{elem.posted_at}</Bodytxt>
                  <Bodytxt>{elem.basic_pay}</Bodytxt>
                  <Bodytxt>{elem.cghs_card_num}</Bodytxt>
                  <Bodytxt>{elem.dispensary_attached}</Bodytxt>
                </Grid>
              );
            })}
          </Grid>

          <Grid xs={12}>
            <Bodytxt>
              Name of the procedure pathological/ radiological test for which
              permission is required and name of the hospital/diagonstic center
              where it is to be undertaken :-
            </Bodytxt>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1.5}
        columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >
        {Array.from(Array(noOfPathologicalTests)).map(
          (elem: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={3}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the pathological test
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the Hospital/Diagonstic
                  </Heading2>
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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed by
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed Date
                  </Heading2>
                  <OutlinedInput
                    value={
                      index == pathologicalTestsData.length
                        ? pathologicaltest.date
                        : pathologicalTestsData[index].date
                    }
                    size="small"
                    placeholder="Prescribed Date"
                    id="outlined-basic"
                    type="text"
                    sx={{ width: "100%" }}
                    onChange={(e) => {
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
                      <Heading2 sx={{ textAlign: { md: "left" } }}>
                        {" "}
                        Delete
                      </Heading2>
                      <DeleteIcon
                        onClick={() => handleDeletePathological(index)}
                        fontSize="large"
                        sx={{ color: "rgb(225, 90, 17)", cursor: "pointer" }}
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
            <AddButton
              variant="contained"
              size="small"
              onClick={() => handleAddRowPathological()}
            >
              Add row
            </AddButton>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Grid
        container
        spacing={1.5}
        columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >
        {Array.from(Array(noOfRadiologicalTests)).map(
          (elem: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={3}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the Radiological test
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the Hospital/Diagonstic
                  </Heading2>

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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed by
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
                      setRadiologicalTest({
                        ...radiologicaltest,
                        prescribedBy: e.target.value,
                      });
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={1.5}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed Date
                  </Heading2>
                  <OutlinedInput
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
                    type="text"
                    sx={{ width: "100%" }}
                    onChange={(e) => {
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
                      <Heading2 sx={{ textAlign: { md: "left" } }}>
                        {" "}
                        Delete
                      </Heading2>
                      <DeleteIcon
                        onClick={() => handleDeleteRadiological(index)}
                        fontSize="large"
                        sx={{ color: "rgb(225, 90, 17)", cursor: "pointer" }}
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
            <AddButton
              variant="contained"
              size="small"
              onClick={() => handleAddRowRadiological()}
            >
              Add row
            </AddButton>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Grid
        container
        spacing={1.5}
        columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >
        {Array.from(Array(noOfTreatmentTests)).map(
          (elem: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={3}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the Procedure/Treatment
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
                      setTreatmentTest({
                        ...treatmenttest,
                        name: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Name of the Hospital/Diagonstic
                  </Heading2>
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
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed by
                  </Heading2>
                  <OutlinedInput
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
                    onChange={(e) => {
                      setTreatmentTest({
                        ...treatmenttest,
                        prescribedBy: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={1.5}>
                  <Heading2 sx={{ textAlign: { md: "left" } }}>
                    {" "}
                    Prescribed Date
                  </Heading2>
                  <OutlinedInput
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
                    type="text"
                    sx={{ width: "100%" }}
                    onChange={(e) => {
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
                      <Heading2 sx={{ textAlign: { md: "left" } }}>
                        {" "}
                        Delete
                      </Heading2>
                      <DeleteIcon
                        onClick={() => handleDeleteTreatment(index)}
                        fontSize="large"
                        sx={{ color: "rgb(225, 90, 17)", cursor: "pointer" }}
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
            <AddButton
              variant="contained"
              size="small"
              onClick={() => handleAddRowTreatment()}
            >
              Add row
            </AddButton>
          </Grid>
        ) : (
          ""
        )}
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
        <Bodytxt>
          Upload scanned letter from CGHS/AMA (Pdf Size 5 MB MAXIMUM)
        </Bodytxt>
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
        <Heading2 sx={{ textAlign: { md: "left" } }}>
          {" "}
          Enter below any exrta information you would like to provide
        </Heading2>
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
          <DelButton disabled={!declaration} variant="contained" size="small">
            Submit
          </DelButton>
        </Grid>

        <Grid item>
          <AddButton variant="contained" size="small">
            reset
          </AddButton>
        </Grid>

        <Grid item>
          <Button size="small" variant="text">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PermissionForm;
