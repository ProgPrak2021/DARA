import * as React from "react";
import { Btn } from "./Button";
import { RequestInfo } from "./RequestInfo";
import { StatusInfo } from "./StatusInfo";
import { Grid } from "@material-ui/core";

export const Popup = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          DARA
        </Grid>
        <Grid style={{ textAlign: "left" }} item xs={6}>
          <Btn url={""} type={"request"} />
        </Grid>
        <Grid item xs={6}>
          <RequestInfo />
        </Grid>
      </Grid>
    </>
  );
};