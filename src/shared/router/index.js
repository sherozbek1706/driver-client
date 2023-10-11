import { Fragment } from "react";
import { Routes as Routers, Route } from "react-router";
import { Login } from "../../pages";

export const Router = () => {
  return (
    <Fragment>
      <Routers>
        <Route exact path="/login" element={<Login />} />
      </Routers>
    </Fragment>
  );
};
