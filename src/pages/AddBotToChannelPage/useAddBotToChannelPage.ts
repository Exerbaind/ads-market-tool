import megaphoneIcon from "@assets/icons/megaphone.svg";
import confettiLottie from "@assets/lotties/confetti.json";
import sandwatchLottie from "@assets/lotties/sandwatch.json";
import type { Data as DotLottieData } from "@lottiefiles/dotlottie-web";
import {
  useGetWaitlistQuery,
  usePollingWaitlistChannelQuery,
  waitlistKeys,
} from "@shared/api";
import { APP_CONFIG, FEATURE_FLAGS } from "@shared/config";
import { useTelegram } from "@shared/hooks";
import type { Channel } from "@shared/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Step = "add" | "permissions" | "check" | "success";

type PageDataMedia =
  | {
      type: "icon";
      src: string;
    }
  | {
      type: "lottie";
      src: DotLottieData;
    };
type PageDataButton = {
  text: string;
  action: () => void;
  type: "primary" | "secondary" | "outline";
};

type PageData = {
  key: Step;
  media: PageDataMedia;
  title: string;
  text: string;
  button: PageDataButton;
};

export const useAddBotToChannelPage = () => {
  const navigate = useNavigate();
  const { webApp, handleHaptic } = useTelegram();

  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>("add");
  const [isPolling, setIsPolling] = useState(false);

  const { data: waitlistData } = useGetWaitlistQuery({
    enabled: FEATURE_FLAGS.WAITLIST_ENABLED,
  });
  const { data: waitlistPollingData } = usePollingWaitlistChannelQuery({
    baselineChannels: waitlistData?.channels_connected,
    enabled: isPolling && FEATURE_FLAGS.WAITLIST_ENABLED,
  });

  const handleChangeStep = useCallback((value: Step) => {
    setStep(value);
  }, []);

  const handleAddChannel = () => {
    handleHaptic("soft");

    const link = `${APP_CONFIG.tgBotLink}?startchannel&admin=post_messages+edit_messages+delete_messages+invite_users+manage_chat+promote_members+post_stories+edit_stories+delete_stories`;
    webApp?.openTelegramLink?.(link);
    setIsPolling(true);
    handleChangeStep("check");
  };

  const handleStopChecking = () => {
    handleHaptic("soft");
    handleChangeStep("add");
    setIsPolling(false);
  };

  const handleSuccessClick = () => {
    navigate("/");
  };

  const checkPermissions = useCallback((channel: Channel) => {
    if (!channel.bot_admin_rights) return false;
    return Object.values(channel.bot_admin_rights).every((flag) => !!flag);
  }, []);

  useEffect(() => {
    if (!waitlistPollingData) return;

    if (!checkPermissions(waitlistPollingData)) {
      handleChangeStep("permissions");
      setIsPolling(false);
      return;
    }

    handleChangeStep("success");
    setIsPolling(false);
    queryClient.invalidateQueries({ queryKey: waitlistKeys.all });
  }, [handleChangeStep, waitlistPollingData, queryClient, checkPermissions]);

  const pageData: PageData[] = [
    {
      key: "add",
      media: {
        type: "icon",
        src: megaphoneIcon,
      },
      title: "Add Ads Bot\nto your channel",
      text: "Ads bot require admin access\nto control who can join the channel.\nTelegram bots can’t read messages inside the group chat.",
      button: {
        text: "Add Ads Bot",
        action: handleAddChannel,
        type: "primary",
      },
    },
    {
      key: "permissions",
      media: {
        type: "icon",
        src: megaphoneIcon,
      },
      title: "Needs permissions",
      text: "The Ad bot was added but doesn't have\npermissions yet. Please grant permissions.",
      button: {
        text: "Grant Access",
        action: handleAddChannel,
        type: "primary",
      },
    },
    {
      key: "check",
      media: {
        type: "lottie",
        src: sandwatchLottie,
      },
      title: "Checking If the Ad Bot\nwas added to the channel",
      text: "This may take a moment — the check\nusually doesn't take long",
      button: {
        text: "Cancel",
        action: handleStopChecking,
        type: "outline",
      },
    },
    {
      key: "success",
      media: {
        type: "lottie",
        src: confettiLottie,
      },
      title: "Channel added.\nNow, create an offer!",
      text: "Great! Your channel is now connected\nto Ads bot and added in waitlist. ",
      button: {
        text: "Great",
        action: handleSuccessClick,
        type: "primary",
      },
    },
  ];

  const data = pageData.find((d) => d.key === step);

  return {
    handleAddChannel,
    handleChangeStep,
    handleStopChecking,
    handleSuccessClick,
    data,
  };
};
