import { PageLayout } from "@shared/components";
import { Button, Icon, Text } from "@telegram-tools/ui-kit";
import { useMainPage } from "./useMainPage";

export const MainPage = () => {
  const { items, handleAddChanel } = useMainPage();

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center w-full relative px-4">
        <Text type="title1" weight="semibold">
          Ad Marketplace
        </Text>
        <div className="mt-8 flex flex-col w-full items-center justify-center gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <Icon customIcon={item.icon} width="30px" height="30px" />
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
        <Button type="primary" onClick={handleAddChanel}>
          <Text type="body" color="white">
            Get channel on waitlist
          </Text>
        </Button>
      </div>
    </PageLayout>
  );
};
