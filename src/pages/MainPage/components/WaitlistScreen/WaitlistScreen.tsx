import crossCircleIcon from "@assets/icons/cross-circle.svg";
import plusCircleIcon from "@assets/icons/plus-circle.svg";
import { PageLayout } from "@shared/components";
import { pluralize } from "@shared/lib";
import {
  Button,
  Group,
  GroupItem,
  Icon,
  Image,
  Text,
} from "@telegram-tools/ui-kit";
import { useWaitlistScreen } from "./useWaitlistScreen";

export const WaitlistScreen = () => {
  const {
    handleReferralClick,
    handleRemoveChannel,
    handleAddChannel,
    items,
    waitlistData,
    waitlistIsLoading,
  } = useWaitlistScreen();

  return (
    <PageLayout>
      <div className="w-full relative px-4">
        <Text type="title1" weight="semibold" align="center">
          Ad Marketplace
        </Text>
        <div className="mt-8 flex flex-col w-full gap-6 bg-bg-secondary rounded-[26px] p-4">
          {items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <Icon customIcon={item.icon} width="22px" height="22px" />
              <div className="flex flex-col gap-0.5">
                <Text type="body" weight="medium">
                  {item.title}
                </Text>
                <Text type="subheadline1" color="secondary">
                  {item.text}
                </Text>
              </div>
            </div>
          ))}
        </div>
        {(waitlistIsLoading || !!waitlistData?.channels_connected?.length) && (
          <div className="mt-4">
            <Group
              header="Your channels"
              skeleton={{
                show: waitlistIsLoading,
                styles: { height: "200px" },
              }}
            >
              <GroupItem
                key="add-channel"
                onClick={handleAddChannel}
                before={
                  <Icon
                    customIcon={plusCircleIcon}
                    width="22px"
                    height="22px"
                  />
                }
                text={
                  <Text type="body" color="accent">
                    Add channel
                  </Text>
                }
              />
              {waitlistData?.channels_connected?.map((channel) => (
                <GroupItem
                  key={channel.id}
                  before={
                    <Image
                      width="40px"
                      aspectRatio="1/1"
                      borderRadius="50%"
                      fallback={channel.title}
                      src={channel.photo}
                    />
                  }
                  text={
                    <Text type="body" weight="medium" truncate>
                      {channel.title}
                    </Text>
                  }
                  description={
                    <Text type="subheadline2" color="secondary">
                      {pluralize(
                        ["subscriber", "subscribers", "subscribers"],
                        Math.ceil(Math.random() * 1000),
                      )}
                    </Text>
                  }
                  after={
                    <button
                      aria-label={`Remove ${channel.title}`}
                      className="inline-flex cursor-pointer border-none bg-transparent p-0"
                      onClick={() => handleRemoveChannel(channel.id)}
                      type="button"
                    >
                      <Icon
                        customIcon={crossCircleIcon}
                        width="16px"
                        height="16px"
                      />
                    </button>
                  }
                />
              ))}
            </Group>
          </div>
        )}
        {(waitlistIsLoading || !!waitlistData?.referrals?.length) && (
          <div className="mt-4">
            <Group
              header="Your referrals"
              skeleton={{
                show: waitlistIsLoading,
                styles: { height: "100px" },
              }}
            >
              {waitlistData?.referrals.map((referral) => (
                <GroupItem
                  key={referral.id}
                  before={
                    <Image
                      width="40px"
                      aspectRatio="1/1"
                      borderRadius="50%"
                      fallback={referral.first_name}
                      src={referral.photo}
                    />
                  }
                  text={
                    <Text type="body" weight="medium" truncate>
                      {referral.username ||
                        `${referral.first_name} ${referral.last_name}`}
                    </Text>
                  }
                />
              ))}
            </Group>
          </div>
        )}
      </div>
      <div className="fixed bottom-7 w-full left-0 px-4">
        <Button type="primary" onClick={handleReferralClick}>
          Invite referral
        </Button>
      </div>
    </PageLayout>
  );
};
