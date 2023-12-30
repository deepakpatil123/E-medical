import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function DocsPreview(props: any) {
  return (
    <Grid container>
      {props.documents.medical_Bills.length !== 0 && (
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

      {props.documents.medical_Bills.map((item: any) => {
        return (
          <Grid
            item
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            key={item}
            xs={2.5}
            pl={4}
          >
            {item.endsWith("pdf") ? (
              <Link
                target="_blank"
                href={`http://localhost:4400/medicalBill/${item}`}
              >
                <PictureAsPdfIcon fontSize="large" sx={{ color: "red" }} />
              </Link>
            ) : (
              <Link
                target="_blank"
                href={`http://localhost:4400/medicalBill/${item}`}
              >
                <ImageIcon fontSize="large" color="primary" />
              </Link>
            )}
            {item}
          </Grid>
        );
      })}

      {props.documents.test_Reports.length !== 0 && (
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

      {props.documents.test_Reports.map((item: any) => {
        return (
          <Grid
            item
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            key={item}
            xs={2.5}
          >
            {item.endsWith("pdf") ? (
              <Link
                target="_blank"
                href={`http://localhost:4400/medicalBill/${item}`}
              >
                <PictureAsPdfIcon fontSize="large" sx={{ color: "red" }} />
              </Link>
            ) : (
              <Link
                target="_blank"
                href={`http://localhost:4400/medicalBill/${item}`}
              >
                <ImageIcon fontSize="large" color="primary" />
              </Link>
            )}
            {item}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default DocsPreview;
