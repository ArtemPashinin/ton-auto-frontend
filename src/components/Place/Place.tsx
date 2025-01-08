import { useEffect } from "react";
import { AdForm } from "./Form";
import WebApp from "@twa-dev/sdk";
import { useMenuContext } from "../Menu/MenuContext";
import { Step, usePlaceContext } from "./PlaceContext";
import { Media } from "./Media";

export const Place = () => {
  const { setMenuVisibility, previousTab, setTabState } = useMenuContext();
  const { step } = usePlaceContext();

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => {
      setMenuVisibility(true);
      setTabState(previousTab);
    });
    setMenuVisibility(false);

    return () => {
      WebApp.BackButton.hide();
    };
  }, [previousTab, setMenuVisibility, setTabState]);

  const Placeholder: React.FC = () => <div>No content available</div>;

  const components: Record<Step, JSX.Element> = {
    [Step.FORM]: <AdForm />,
    [Step.MEDIA]: <Media />,
    [Step.SUCCESS]: <Placeholder />,
  };

  return <>{components[step]}</>;
};
