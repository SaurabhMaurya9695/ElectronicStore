import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LinearIndeterminate = ({ show }) => {
  return  (
    <div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress hidden={!show}  />
      </Box>
    </div>
  );
};

export default LinearIndeterminate;
