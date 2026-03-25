import { Spinner } from "@telegram-tools/ui-kit";
import { PageLayout } from "../PageLayout";

export const LoadingScreen = () => {
  return (
    <PageLayout>
      <div className="h-full flex justify-center items-center w-full">
        <Spinner size="32px" color="accent" />
      </div>
    </PageLayout>
  );
};
