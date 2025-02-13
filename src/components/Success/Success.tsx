import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <Stack className="gap-2 vh-75 justify-content-center text-center">
      <div className="mb-5">
        <p className="defaultText fs-17 fw-300">
          Your ad is successfully published.
        </p>
      </div>
      <div>
        <Button
          className="fade-outline-button w-100"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </div>
      <div>
        <Button
          className="fade-outline-button w-100"
          onClick={() => {
            navigate("/myAds");
          }}
        >
          Manage my ads
        </Button>
      </div>
    </Stack>
  );
};

export default Success;
