import { Col } from "react-bootstrap";

import { faLock } from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Purchase = () => {
  return (
    <Col xs={12} className="p-1 mt-2 mb-3 d-flex justify-content-between">
      <FontAwesomeIcon icon={faLock} size="xl" color="#F8A917" />
    </Col>
  );
};

export default Purchase;