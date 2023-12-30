import {
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import DashboardCard from "../shared/DashboardCard";

function Permission() {
  const data = [
    {
      adhaar: "/adhaar.png",
      relation: "SELF",
      name: "Poonam Mishra",
      cghsNo: "77769",
      bloodGroup: "B+",
      validity: "30-06-2020",
      dob: "10-07-1969",
    },
    {
      adhaar: "/adhaar.png",
      relation: "HUSBAND",
      name: "Avichal Mishra",
      cghsNo: "77770",
      bloodGroup: "B+",
      validity: "30-06-2020",
      dob: "",
    },
    {
      adhaar: "/adhaar.png",
      relation: "SON",
      name: "Manas Mishra",
      cghsNo: "77772",
      bloodGroup: "",
      validity: "30-06-2020",
      dob: "20-10-2001",
    },
    {
      adhaar: "/adhaar.png",
      relation: "DAUGHTER",
      name: "Mudita Mishra",
      cghsNo: "77771",
      bloodGroup: "",
      validity: "30-06-2020",
      dob: "16-05-1999",
    },
  ];

  return (
    <DashboardCard title="Permission">
    <Grid
      container
      sx={{
        width: "auto",
        height: "auto",
        color: "#000000",
        backgroundColor: "white",
        padding: "auto",
        boxShadow: "0px 4px 250px 0px #00000000",
        margin: "20px",
      }}
    >
      {data.map((item: any) => {
        return (
          <>
            {" "}
            <Grid item xs={6}>
              <Image src={item.adhaar} height={200} alt="" width={400} />
            </Grid>
            <Grid p={5} container xs={6}>
              <Grid item xs={6}>
                <Typography>
                  <strong>Relation: </strong>
                  {item.relation}
                </Typography>
                <Typography>
                  <strong>CGHS No: </strong>
                  {item.cghsNo}
                </Typography>
                <Typography>
                  <strong>Validity: </strong>
                  {item.validity}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>Name: </strong>
                  {item.name}
                </Typography>
                <Typography>
                  <strong>Blood Group: </strong>
                  {item.bloodGroup}
                </Typography>
                <Typography>
                  <strong>Date of Birth: </strong>
                  {item.dob}
                </Typography>
              </Grid>
            </Grid>{" "}
          </>
        );
      })}
    </Grid>
    </DashboardCard>
  );
}

export default Permission;
