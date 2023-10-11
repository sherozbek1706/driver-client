import { Fragment } from "react";
import { Routes as Routers, Route } from "react-router";
import { Login, Home } from "../../pages";
import { ProtectRouteDriver } from "../../auth";
export const Router = () => {
  return (
    <Fragment>
      <Routers>
        <Route path="/login" element={<Login />} />
      </Routers>
    </Fragment>
  );
};
