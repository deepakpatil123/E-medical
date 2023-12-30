import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Grid, styled, Paper } from "@mui/material";

function Preview(props: any) {
  const obj = props.formData;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2} my={3}>
      {Object.entries(obj).map((item: any, index: number) => {
        if (
          !item[0].startsWith("_") &&
          !item[0].endsWith("At") &&
          typeof item[1] !== "boolean"
        ) {
          return (
            <Grid item xs={6} key={index}>
              <strong>
                {item[0].charAt(0).toUpperCase() +
                  item[0].replace(/_/g, " ").slice(1)}{" "}
              </strong>
              :-{" "}
              {item[0] === "medical_Bill" || item[0] === "test_Report" || item[0] === "hospital_Name"
                ? item[1].join(", ")
                : item[1]}
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default Preview;
