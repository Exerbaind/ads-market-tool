import { MainPage, NotFoundPage } from "@pages";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => (
  <Routes>
    <Route element={<MainPage />} path="/" />
    <Route element={<NotFoundPage />} path="*" />
  </Routes>
);
