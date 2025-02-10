import { PropsWithChildren } from "react";
import { useClientOnce } from "../hooks/useClientOnce";
import { TelegramSDK } from "./telegram";

const TelegramProvider = ({ children }: PropsWithChildren) => {
  useClientOnce(() => {
    TelegramSDK();
  });

  return children;
};

export default TelegramProvider;
