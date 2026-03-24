import { PageLayout } from "@shared/components";
import { Button, Icon, LottieRenderer, Text } from "@telegram-tools/ui-kit";
import { useAddBotToChannelPage } from "./useAddBotToChannelPage";

export const AddBotToChannelPage = () => {
  const { data } = useAddBotToChannelPage();

  return (
    <PageLayout key={data?.key}>
      <div className="h-full flex flex-col items-center justify-center w-full relative px-4">
        {data?.media && data.media.type === "lottie" && (
          <LottieRenderer data={data.media.src} width={112} height={112} />
        )}
        {data?.media && data.media.type === "icon" && (
          <Icon customIcon={data.media.src} width="112px" />
        )}
        <div className="mt-4">
          <Text
            type="title1"
            weight="bold"
            align="center"
            className="whitespace-pre-line"
          >
            {data?.title}
          </Text>
        </div>
        <div className="mt-3">
          <Text type="body" align="center" className="whitespace-pre-line">
            {data?.text}
          </Text>
        </div>
      </div>
      <div className="fixed bottom-7 w-full left-0 px-4">
        <Button type={data?.button.type} onClick={data?.button.action}>
          {data?.button.text}
        </Button>
      </div>
    </PageLayout>
  );
};
