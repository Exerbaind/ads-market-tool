import { AddBotToChannelPage, MainPage, NotFoundPage } from "@pages";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => (
  <Routes>
    <Route element={<MainPage />} path="/" />
    <Route element={<AddBotToChannelPage />} path="/add-bot-to-channel" />
    <Route element={<NotFoundPage />} path="*" />
  </Routes>
);
