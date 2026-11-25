export {};

declare global {
  interface Window {
    ConferbotWidget?: (
      botId: string,
      embedType: "live_chat" | "popup_chat" | "fullpage_chat",
      options?: {
        customData?: Record<string, string>;
        user?: { id?: string; name?: string; email?: string };
      },
    ) => void;
  }
}
