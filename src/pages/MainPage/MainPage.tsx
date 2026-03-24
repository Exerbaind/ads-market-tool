import { EmptyScreen, WaitlistScreen } from "./components";
import { useMainPage } from "./useMainPage";

export const MainPage = () => {
  const { waitlistData, waitlistIsLoading } = useMainPage();

  if (waitlistIsLoading) return null;

  if (
    !waitlistData?.channels_connected?.length &&
    !waitlistData?.referrals?.length
  ) {
    return <EmptyScreen />;
  }

  return <WaitlistScreen />;
};
