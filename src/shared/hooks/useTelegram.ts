import { useCallback } from "react";

type ImpactOccurredStyle = "light" | "medium" | "heavy" | "rigid" | "soft";
type NotificationOccurredStyle = "error" | "success" | "warning";

export const useTelegram = () => {
  const webApp = window.Telegram?.WebApp;

  const telegramId =
    webApp?.initDataUnsafe?.user?.id ?? import.meta.env.VITE_TELEGRAM_ID;

  const haptic = webApp?.HapticFeedback;
  const impactStyles = ["light", "medium", "heavy", "rigid", "soft"] as const;

  const handleHaptic = (
    style: ImpactOccurredStyle | NotificationOccurredStyle,
  ) => {
    if (!haptic) return;

    if (impactStyles.includes(style as ImpactOccurredStyle)) {
      haptic.impactOccurred(style as ImpactOccurredStyle);
      return;
    }

    haptic.notificationOccurred(style as NotificationOccurredStyle);
  };

  const handleHapticSelection = () => {
    if (!haptic) return;
    haptic.selectionChanged();
  };

  const checkDevice = () => {
    const webApp = window?.Telegram?.WebApp;

    return {
      isMobile: webApp
        ? webApp?.platform === "ios" ||
          webApp?.platform === "android" ||
          webApp?.platform === "android_x"
        : false,
      isIos: webApp ? webApp?.platform === "ios" : false,
      isAndroid: webApp
        ? webApp?.platform === "android" || webApp?.platform === "android_x"
        : false,
    };
  };

  const initTelegramApp = () => {
    if (!webApp) return;
    webApp?.MainButton?.hide();

    const { isMobile } = checkDevice();
    if (!isMobile) return;

    webApp?.requestFullscreen?.();
    webApp?.lockOrientation?.();
    webApp?.disableVerticalSwipes?.();
  };

  const applyTelegramTheme = useCallback(() => {
    const scheme = webApp?.colorScheme === "dark" ? "dark" : "light";
    const backgroundColor =
      scheme === "dark" ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)";

    document.documentElement.dataset.theme = scheme;
    document.documentElement.style.colorScheme = scheme;
    webApp?.setBackgroundColor?.(backgroundColor);
    webApp?.setHeaderColor?.(backgroundColor);
  }, [webApp]);

  const subscribeTelegramTheme = useCallback(() => {
    if (!webApp?.onEvent || !webApp?.offEvent) {
      return () => undefined;
    }

    const handleThemeChanged = () => {
      applyTelegramTheme();
    };

    webApp.onEvent("themeChanged", handleThemeChanged);

    return () => {
      webApp.offEvent("themeChanged", handleThemeChanged);
    };
  }, [applyTelegramTheme, webApp]);

  return {
    webApp,
    telegramId,
    handleHaptic,
    handleHapticSelection,
    checkDevice,
    initTelegramApp,
    applyTelegramTheme,
    subscribeTelegramTheme,
  };
};
