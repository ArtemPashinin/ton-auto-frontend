import { createContext, useContext, useState, ReactNode } from "react";
import { Tab } from "../../enums/Tab.enum";
import WebApp from "@twa-dev/sdk";

interface MenuContextState {
  isVisible: boolean;
  tab: Tab;
  previousTab: Tab;
  setPreviousTab: (tab: Tab) => void;
  setMenuVisibility: (isVisible: boolean) => void;
  setTabState: (newTab: Tab) => void;
}

const MenuContext = createContext<MenuContextState | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [tab, setTab] = useState<Tab>(Tab.SEARCH);
  const [previousTab, setPreviousTab] = useState<Tab>(Tab.SEARCH);

  const setMenuVisibility = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  const setTabState = (newTab: Tab) => {
    if (newTab !== tab) {
      WebApp.BackButton.hide();
      setPreviousTab(tab);
      setTab(newTab);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        isVisible,
        setMenuVisibility,
        tab,
        setTabState,
        previousTab,
        setPreviousTab,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextState => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
