import React, { useEffect } from "react";
import TabBar from "../TabBar/TabBar";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";

interface PageWrapperProps {
  children: React.ReactNode;
  hideTabBar?: boolean;
  backButton?: boolean;
}

const PageWrapper = ({
  hideTabBar = false,
  children,
  backButton = false,
}: PageWrapperProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (backButton && WebApp) {
      const goBack = () => navigate(-1); // Определяем функцию локально
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(goBack);

      return () => {
        WebApp.BackButton.hide();
        WebApp.BackButton.offClick(goBack);
      };
    }
  }, [backButton, navigate]);

  return (
    <div className="p-2">
      <div>{children}</div>
      {!hideTabBar && <TabBar key="tab-bar" />}
    </div>
  );
};

export default PageWrapper;
