import { Button, Stack } from "react-bootstrap";
import { useMenuContext } from "../Menu/MenuContext";
import { Tab } from "../../enums/Tab.enum";

export const Success = () => {
  const { setTabState, setMenuVisibility } = useMenuContext();

  return (
    <Stack className="p-2 gap-2 vh-75 justify-content-center">
      <div className="mb-5">
        <p className="defaultText fs-17 fw-300">
          Your ad is successfully published.
        </p>
      </div>
      <div>
        <Button
          className="fade-outline-button w-100"
          onClick={() => {
            setTabState(Tab.SEARCH);
            setMenuVisibility(true);
          }}
        >
          Home
        </Button>
      </div>
      <div>
        <Button
          className="fade-outline-button w-100"
          onClick={() => {
            setTabState(Tab.MY_ADS);
            setMenuVisibility(true);
          }}
        >
          Manage my ads
        </Button>
      </div>
    </Stack>
  );
};
