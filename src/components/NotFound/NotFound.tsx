import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center defaultText text-center vh-100 gap-3">
      <h1>
        404
        <br />
        Not Found
      </h1>
      <Button
        className="fade-outline-button w-100"
        onClick={() => navigate("/")}
      >
        Search another ads
      </Button>
    </div>
  );
};

export default NotFound;
