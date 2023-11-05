import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ show }) => {
  return (
    show && (
      <div>
        {/* <Container className ="text-center p-5 mt-5"> */}
        {/* <Vortex
          visible={true}
          height="200"
          width="200"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'grey', 'cyan', 'black', 'yellow', 'blue']}
        /> */}
        <Backdrop
          sx={{ color: "#66fcf1", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={show}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* </Container> */}
      </div>
    )
  );
};

export default Loader;
