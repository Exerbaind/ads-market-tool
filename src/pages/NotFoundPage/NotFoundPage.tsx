import sneezeLottie from "@assets/lotties/sneeze.json";
import { PageLayout } from "@shared/components";
import { Button, LottieRenderer, Text } from "@telegram-tools/ui-kit";

import { useNotFoundPage } from "./useNotFoundPage";

export const NotFoundPage = () => {
  const { handleBack } = useNotFoundPage();
  return (
    <PageLayout>
      <div className="h-full flex flex-col items-center justify-center">
        <LottieRenderer data={sneezeLottie} width={112} height={112} />
        <div className="mt-4">
          <Text type="title1" weight="bold">
            Something Went Wrong
          </Text>
        </div>
        <div className="mt-3">
          <Text type="body" align="center">
            The page you’re looking for doesn’t exist <br />
            or the link is broken. But don’t worry —<br />
            you’re still in the right universe.
          </Text>
        </div>
      </div>
      <div className="fixed bottom-7 w-full left-0 px-4">
        <Button type="primary" onClick={handleBack}>
          <Text type="body" color="white">
            Back
          </Text>
        </Button>
      </div>
    </PageLayout>
  );
};
