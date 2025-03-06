import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { faLock } from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import { faStar } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PurchaseProps {
  advertisementId: string;
}

const Purchase = ({ advertisementId }: PurchaseProps) => {
  const navigate = useNavigate();

  return (
    <Col xs={12} className="p-1 mt-2 mb-3 d-flex justify-content-between">
      <FontAwesomeIcon icon={faLock} size="xl" color="#F8A917" />
      <a
        className="fs-17 link-underline-primary link-underline-opacity-0 mainText"
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/purchase/${advertisementId}`);
        }}
      >
        Purchase 500
        <FontAwesomeIcon icon={faStar} color="#F8A917" />
      </a>
    </Col>
  );
};

export default Purchase;