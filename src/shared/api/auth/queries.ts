import { STORAGE_KEYS } from "@shared/config";
import { useTelegram } from "@shared/hooks";
import { parseUrlParams } from "@shared/lib";
import type { ApiClientError } from "@shared/services";
import type { AuthResponse } from "@shared/types";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import ls from "localstorage-slim";
import { authApi } from "./api";

export const authKeys = {
  all: ["auth"] as const,
  authorize: () => [...authKeys.all, "authorize"] as const,
};

export const useAuthMutation = (): UseMutationResult<
  AuthResponse,
  ApiClientError,
  void
> => {
  const { webApp, getStartappParam } = useTelegram();

  return useMutation<AuthResponse, ApiClientError, void>({
    mutationKey: authKeys.authorize(),
    mutationFn: () => {
      const initData = webApp?.initData;

      if (!initData) {
        throw new Error("Telegram initData is required");
      }

      const appParams = getStartappParam();
      const parsedAppParams = parseUrlParams(appParams);
      const refId = parsedAppParams.refId;

      return authApi.authorize({ initData, refId });
    },
    onSuccess: (data) => {
      if (data) {
        ls.set(STORAGE_KEYS.ADS_MARKET_JWT, data);
      }
    },
  });
};
