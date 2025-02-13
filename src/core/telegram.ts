import WebApp from "@twa-dev/sdk";

export const TelegramSDK = () => {
  WebApp.ready();

  WebApp.disableVerticalSwipes();
  WebApp.expand();
  WebApp.setHeaderColor(WebApp.themeParams.secondary_bg_color);
  WebApp.setBackgroundColor(WebApp.themeParams.secondary_bg_color);
  WebApp.setBottomBarColor(WebApp.themeParams.secondary_bg_color);
};
