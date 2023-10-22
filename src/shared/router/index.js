import { Fragment } from "react";
import { Routes as Routers, Route } from "react-router";
import { Login, Home, News, Profile, Maps, DashboardLogin } from "../../pages";
import { ProtectRouteDriver } from "../../auth";
export const Router = () => {
  return (
    <Fragment>
      <Routers>
        <Route path="/login" element={<Login />} />

        <Route
          exact
          path="/"
          element={
            <ProtectRouteDriver>
              <Home />
            </ProtectRouteDriver>
          }
        />
        <Route
          exact
          path="/news"
          element={
            <ProtectRouteDriver>
              <News />
            </ProtectRouteDriver>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectRouteDriver>
              <Profile />
            </ProtectRouteDriver>
          }
        />
        <Route
          exact
          path="/maps"
          element={
            <ProtectRouteDriver>
              <Maps />
            </ProtectRouteDriver>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <ProtectRouteDriver>
              <Order />
            </ProtectRouteDriver>
          }
        />

        <Route
          exact
          path="/orders/:id"
          element={
            <ProtectRouteDriver>
              <DriverOrder />
            </ProtectRouteDriver>
          }
        />

        <Route
          exact
          path="/dashboard/login"
          element={
            <ProtectRouteAdmin>
              <DashboardLogin />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectRouteAdmin>
              <Dashboard />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/model"
          element={
            <ProtectRouteAdmin>
              <DashboardModel />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/cars"
          element={
            <ProtectRouteAdmin>
              <DashboardCars />
            </ProtectRouteAdmin>
          }
        />
      </Routers>
    </Fragment>
  );
};
