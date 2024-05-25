import { TelegramWebApps } from "telegram-webapps-types";

export function paramsToObject(params: string): TelegramWebApps.WebAppInitData {
  const parsedParams = new URLSearchParams(params);
  const result: any = {};
  for (const [key, value] of parsedParams) {
    if (value.startsWith("{")) {
      result[key] = JSON.parse(value);
      continue;
    }
    result[key] = value;
  }
  return result;
}
