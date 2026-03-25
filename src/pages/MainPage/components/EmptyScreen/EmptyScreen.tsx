import { PageLayout } from "@shared/components";
import { Button, Icon, Text } from "@telegram-tools/ui-kit";
import { useEmptyScreen } from "./useEmptyScreen";

export const EmptyScreen = () => {
  const { items, handleButtonClick } = useEmptyScreen();

  return (
    <PageLayout key="empty">
      <div className="h-full flex flex-col items-center justify-center w-full relative px-4 pb-20">
        <Text type="title1" weight="semibold">
          Ad Marketplace
        </Text>
        <div className="mt-8 flex flex-col justify-center gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <Icon
                customIcon={item.icon}
                width="30px"
                height="30px"
                color="accent"
              />
              <div className="flex flex-col gap-0.5 pt-1">
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
      </div>
      <div className="fixed bottom-7 w-full left-0 px-4">
        <Button type="primary" onClick={handleButtonClick}>
          Get channel on waitlist
        </Button>
      </div>
    </PageLayout>
  );
};
