import { AppRoutes } from "@Routes";
import { useAuthMutation } from "@shared/api";
import { useTelegram } from "@shared/hooks";
import { checkJwtExpired } from "@shared/lib";
import { useEffect } from "react";

export default function App() {
  const { mutate: authMutate } = useAuthMutation();
  const { applyTelegramTheme, initTelegramApp, subscribeTelegramTheme } =
    useTelegram();

  useEffect(() => {
    const isExipred = checkJwtExpired();
    if (!isExipred) return;
    authMutate();
  }, [authMutate]);

  useEffect(() => {
    initTelegramApp();
  }, [initTelegramApp]);

  useEffect(() => {
    applyTelegramTheme();
    return subscribeTelegramTheme();
  }, [applyTelegramTheme, subscribeTelegramTheme]);

  return <AppRoutes />;
}
