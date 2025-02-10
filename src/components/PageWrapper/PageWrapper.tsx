import React, { useCallback, useEffect } from "react";
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

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (backButton && WebApp) {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleGoBack);

      return () => {
        WebApp.BackButton.hide();
        WebApp.BackButton.offClick(handleGoBack);
      };
    }
  }, [backButton, handleGoBack]);

  return (
    <div className="p-2">
      <div>{children}</div>
      {!hideTabBar && <TabBar key="tab-bar" />}
    </div>
  );
};

export default PageWrapper;
