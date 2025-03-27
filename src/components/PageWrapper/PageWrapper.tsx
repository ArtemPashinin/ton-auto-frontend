import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebApp from "@twa-dev/sdk";
import TabBar from "../TabBar/TabBar";

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
      const goBack = () => {
        navigate(-1);
        navigate("/", { replace: true });
      };

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
