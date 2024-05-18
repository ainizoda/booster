import { TelegramWebApps } from "telegram-webapps-types";

export function paramsToObject(params: string): TelegramWebApps.WebAppUser {
  const p = new URLSearchParams(params);
  const result: any = {};
  for (const [key, value] of p) {
    if (value.startsWith("{")) {
      result[key] = JSON.parse(value);
      continue;
    }
    result[key] = value;
  }
  return result;
}
