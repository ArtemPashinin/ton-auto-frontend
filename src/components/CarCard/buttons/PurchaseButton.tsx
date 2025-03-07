import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { faStar } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PurchaseButtonProps {
  asdvertisementId: string;
}
const PurchaseButton = ({ asdvertisementId }: PurchaseButtonProps) => {
  const navigate = useNavigate();
  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 main-button py-2 d-flex align-items-center justify-content-center gap-2 gradient-background border-0"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/purchase/${asdvertisementId}`);
        }}
      >
        <p>
          Publish 500&nbsp;
          <FontAwesomeIcon icon={faStar} color="#F8A917" />
        </p>
      </Button>
    </Col>
  );
};
export default PurchaseButton;
