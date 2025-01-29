import { useCallback, useEffect } from "react";
import { AdForm } from "./Form";
import WebApp from "@twa-dev/sdk";
import { useMenuContext } from "../Menu/MenuContext";
import { Step, usePlaceContext } from "./PlaceContext";
import { Media } from "./Media";
import { Success } from "./Success";

export const Place = () => {
  const { setMenuVisibility, previousTab, setTabState } = useMenuContext();
  const { step, setStep } = usePlaceContext();

  const back = useCallback(() => {
    if (step === Step.MEDIA) {
      setStep(Step.FORM);
    } else {
      setMenuVisibility(true);
      setTabState(previousTab);
      WebApp.BackButton.hide();
    }
  }, [previousTab, setMenuVisibility, setStep, setTabState, step]);

  useEffect(() => {
    WebApp.BackButton.onClick(back);
    WebApp.BackButton.show();
    setMenuVisibility(false);
    return () => {
      WebApp.BackButton.offClick(back);
    };
  });

  const components: Record<Step, JSX.Element> = {
    [Step.FORM]: <AdForm />,
    [Step.MEDIA]: <Media />,
    [Step.SUCCESS]: <Success />,
  };

  return <>{components[step]}</>;
};
