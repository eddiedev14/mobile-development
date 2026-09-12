import { Navigate, Route, Routes } from "react-router-dom";
import { GuestOnlyRoute } from "./GuestOnlyRoute";
import { Login, MediClinic } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Pages */}
      <Route element={<GuestOnlyRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Private Pages */}
      <Route element={<PrivateRoute />}>
        <Route path="/mediclinic" element={<MediClinic />} />
      </Route>
    </Routes>
  );
};
