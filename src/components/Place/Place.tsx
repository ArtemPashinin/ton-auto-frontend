import { useCallback, useEffect } from "react";
import { AdForm } from "./Form";
import WebApp from "@twa-dev/sdk";
import { useMenuContext } from "../Menu/MenuContext";
import { Step, usePlaceContext } from "./PlaceContext";
import { Media } from "./Media";
import { Success } from "./Success";

export const Place = () => {
  const { setMenuVisibility, previousTab, setTabState } = useMenuContext();
  const { step } = usePlaceContext();

  const back = useCallback(() => {
    setMenuVisibility(true);
    setTabState(previousTab);
    WebApp.BackButton.hide();
    WebApp.BackButton.offClick(back);
  }, [previousTab, setMenuVisibility, setTabState]);

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(back);
    setMenuVisibility(false);
  }, [back, previousTab, setMenuVisibility, setTabState]);

  const components: Record<Step, JSX.Element> = {
    [Step.FORM]: <AdForm />,
    [Step.MEDIA]: <Media />,
    [Step.SUCCESS]: <Success />,
  };

  return <>{components[step]}</>;
};
