import { Fragment } from "react";
import { Routes as Routers, Route } from "react-router";
import {
  Login,
  Home,
  News,
  Profile,
  Maps,
  DashboardLogin,
  Dashboard,
  DashboardCars,
  DashboardModel,
  DashboardRegion,
  DashboardAddress,
  DashboardDriver,
  AddModelDashboard,
  AddRegionDashboard,
  AddAddressDashboard,
  AddCarDashboard,
  AddDriverDashboard,
  Order,
  DriverOrder,
  NotFound,
  DashboarOrder,
  AddOrderDashboard,
  DashboardDriverOrders,
  AddBalanse,
  Others,
  Payments,
  Admins,
  FormAdminDashboard,
  Chats,
} from "../../pages";
// import Cookies from "js-cookie";
import { ProtectRouteAdmin, ProtectRouteDriver } from "../../auth";
import { Info } from "../../private";
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
          path="/chats"
          element={
            <ProtectRouteDriver>
              <Chats />
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
        <Route
          path="/dashboard/region"
          element={
            <ProtectRouteAdmin>
              <DashboardRegion />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/address"
          element={
            <ProtectRouteAdmin>
              <DashboardAddress />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/driver"
          element={
            <ProtectRouteAdmin>
              <DashboardDriver />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/model/add"
          element={
            <ProtectRouteAdmin>
              <AddModelDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/model/edit/:id"
          element={
            <ProtectRouteAdmin>
              <AddModelDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/region/add"
          element={
            <ProtectRouteAdmin>
              <AddRegionDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/region/edit/:id"
          element={
            <ProtectRouteAdmin>
              <AddRegionDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/driver/pay/:id"
          element={
            <ProtectRouteAdmin>
              <AddBalanse />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/address/add"
          element={
            <ProtectRouteAdmin>
              <AddAddressDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/address/edit/:id"
          element={
            <ProtectRouteAdmin>
              <AddAddressDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/car/add"
          element={
            <ProtectRouteAdmin>
              <AddCarDashboard />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/car/edit/:id"
          element={
            <ProtectRouteAdmin>
              <AddCarDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/driver/add"
          element={
            <ProtectRouteAdmin>
              <AddDriverDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/order/add"
          element={
            <ProtectRouteAdmin>
              <AddOrderDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/driver/edit/:id"
          element={
            <ProtectRouteAdmin>
              <AddDriverDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/blocked/driver"
          element={
            <ProtectRouteAdmin>
              <DashboardDriver />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/order"
          element={
            <ProtectRouteAdmin>
              <DashboarOrder />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/driver-orders"
          element={
            <ProtectRouteAdmin>
              <DashboardDriverOrders />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/others"
          element={
            <ProtectRouteAdmin>
              <Others />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/others/payments"
          element={
            <ProtectRouteAdmin>
              <Payments />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/dashboard/others/admins"
          element={
            <ProtectRouteAdmin>
              <Admins />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/others/admins/add"
          element={
            <ProtectRouteAdmin>
              <FormAdminDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/others/admins/blocked"
          element={
            <ProtectRouteAdmin>
              <Admins />
            </ProtectRouteAdmin>
          }
        />

        <Route
          path="/dashboard/others/admins/edit/:id"
          element={
            <ProtectRouteAdmin>
              <FormAdminDashboard />
            </ProtectRouteAdmin>
          }
        />

        <Route path="info" element={<Info />} />

        <Route path="*" element={<NotFound />} />
      </Routers>
    </Fragment>
  );
};
