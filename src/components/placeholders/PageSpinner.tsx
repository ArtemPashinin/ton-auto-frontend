import { Spinner } from "react-bootstrap";

interface PageSpinnerProps{
  fullscreen?: boolean
}

const PageSpinner = ({fullscreen = false}: PageSpinnerProps) => {
  return (
    <div className={`mainText d-flex align-items-center justify-content-center ${fullscreen ? "vh-100" : "vh-55"}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default PageSpinner;
