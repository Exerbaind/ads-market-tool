import { useTelegram } from "@shared/hooks";
import { cn } from "@shared/lib";
import {
  type CSSProperties,
  type HTMLAttributes,
  useEffect,
  useState,
} from "react";

type SafeAreaInsets = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type PageLayoutProps = HTMLAttributes<HTMLDivElement> & {
  horizontalPadding?: number;
  verticalPadding?: number;
  disableFadeIn?: boolean;
};

const ZERO_INSETS: SafeAreaInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const getSafeAreaInsets = (): SafeAreaInsets => {
  if (typeof window === "undefined") {
    return ZERO_INSETS;
  }

  const webApp = window.Telegram?.WebApp;
  const insets = webApp?.contentSafeAreaInset ?? webApp?.safeAreaInset;

  return {
    top: insets?.top ?? 0,
    right: insets?.right ?? 0,
    bottom: insets?.bottom ?? 0,
    left: insets?.left ?? 0,
  };
};

export const PageLayout = ({
  className,
  style,
  children,
  horizontalPadding = 16,
  verticalPadding = 16,
  disableFadeIn = false,
  ...rest
}: PageLayoutProps) => {
  const [safeInsets, setSafeInsets] =
    useState<SafeAreaInsets>(getSafeAreaInsets);
  const [isVisible, setIsVisible] = useState(disableFadeIn);
  const { webApp, checkDevice } = useTelegram();
  const { isMobile } = checkDevice();
  const fullscreenMobilePaddingTop = webApp?.isFullscreen && isMobile ? 80 : 0;

  useEffect(() => {
    if (disableFadeIn) return;

    const frameId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [disableFadeIn]);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp?.onEvent || !webApp?.offEvent) return;

    const handleSafeAreaChange = () => {
      setSafeInsets(getSafeAreaInsets());
    };

    webApp.onEvent("safeAreaChanged", handleSafeAreaChange);
    webApp.onEvent("contentSafeAreaChanged", handleSafeAreaChange);
    webApp.onEvent("viewportChanged", handleSafeAreaChange);

    return () => {
      webApp.offEvent("safeAreaChanged", handleSafeAreaChange);
      webApp.offEvent("contentSafeAreaChanged", handleSafeAreaChange);
      webApp.offEvent("viewportChanged", handleSafeAreaChange);
    };
  }, []);

  const computedStyle: CSSProperties = {
    boxSizing: "border-box",
    paddingTop: `calc(max(env(safe-area-inset-top, 0px), ${safeInsets.top}px) + ${verticalPadding}px + ${fullscreenMobilePaddingTop}px)`,
    paddingRight: `calc(max(env(safe-area-inset-right, 0px), ${safeInsets.right}px) + ${horizontalPadding}px)`,
    paddingBottom: `calc(max(env(safe-area-inset-bottom, 0px), ${safeInsets.bottom}px) + ${verticalPadding}px)`,
    paddingLeft: `calc(max(env(safe-area-inset-left, 0px), ${safeInsets.left}px) + ${horizontalPadding}px)`,
    ...style,
  };

  return (
    <div
      className={cn(
        "h-screen supports-[height:100svh]:h-[100svh] w-full overflow-hidden transition-opacity duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={computedStyle}
      {...rest}
    >
      {children}
    </div>
  );
};
