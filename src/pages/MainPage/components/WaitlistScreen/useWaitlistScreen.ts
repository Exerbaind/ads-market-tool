import clockIcon from "@assets/icons/clock.svg";
import percentCircleIcon from "@assets/icons/percent-circle-fill.svg";
import { useGetWaitlistQuery } from "@shared/api";
import { FEATURE_FLAGS } from "@shared/config";
import { useTelegram } from "@shared/hooks";
import { useToast } from "@telegram-tools/ui-kit";
import { useNavigate } from "react-router-dom";

export const useWaitlistScreen = () => {
  const { handleHaptic } = useTelegram();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: waitlistData, isLoading: waitlistIsLoading } =
    useGetWaitlistQuery({
      enabled: FEATURE_FLAGS.WAITLIST_ENABLED,
    });

  const items = [
    {
      title: "You are in waitlist",
      text: "You'll get a notification as soon as the app launches.",
      icon: clockIcon,
    },
    {
      title: "Referral system",
      text: "Invite other channels and earn a share of our fee from every deal they close.",
      icon: percentCircleIcon,
    },
  ];

  const handleReferralClick = () => {
    handleHaptic("soft");
    showToast(`Feature not implemented yet`);
  };

  const handleAddChannel = () => {
    handleHaptic("soft");
    navigate("/add-bot-to-channel");
  };

  return {
    items,
    waitlistData,
    waitlistIsLoading,
    handleReferralClick,
    handleAddChannel,
  };
};
