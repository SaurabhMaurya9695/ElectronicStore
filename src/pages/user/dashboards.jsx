import { Outlet } from "react-router-dom";

const Dashboards = () => {
    return (
        <div>
          <h1>this is Dashboard</h1>
          <Outlet />
        </div>
    )
};

export default Dashboards;
