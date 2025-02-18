import { Button, Image } from "react-bootstrap";
import startLogo from "../../assets/images/start.png";
import { useNavigate } from "react-router-dom";

const SuccessPaymnet = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column text-center justify-content-between"
      style={{ height: "90vh" }}
    >
      <Image
        style={{ width: "100%" }}
        className="rounded shadow"
        src={startLogo}
        alt="Starts payment"
      />
      <div>
        <p className="defaultText fw-300 fs-20 mb-3">Thank you!</p>
        <p className="defaultText fw-300 text-center px-5 lh-17 fs-17 text-nowrap">
          The transaction was successfully
          <br />
          completed, the announcement has
          <br />
          been published.
        </p>
      </div>
      <div className="">
        <Button
          className="fade-outline-button w-100 mb-1"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          className="fade-outline-button w-100"
          onClick={() => {
            navigate("/myAds");
          }}
        >
          Manage my ads
        </Button>
      </div>
    </div>
  );
};

export default SuccessPaymnet;
