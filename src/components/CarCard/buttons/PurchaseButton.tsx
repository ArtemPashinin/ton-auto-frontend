import { Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { faStar } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";
import { setPaid } from "../../../redux/slices/my-ads-slice/my-ads-slice";
import { AppDispatch } from "../../../redux/store";

import { makePaymentLink } from "../../../utils/make-payment-link";

interface PurchaseButtonProps {
  asdvertisementId: string;
}
const PurchaseButton = ({ asdvertisementId }: PurchaseButtonProps) => {
  const dispath = useDispatch<AppDispatch>();
  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 main-button py-2 d-flex align-items-center justify-content-center gap-2 gradient-background border-0"
        onClick={(e) => {
          e.stopPropagation();
          (async () => {
            if (asdvertisementId) {
              const invoiceLink = await makePaymentLink(asdvertisementId);
              WebApp.openInvoice(invoiceLink, (status) => {
                if (status === "paid") {
                  dispath(setPaid(asdvertisementId));
                  WebApp.showAlert(
                    "The transaction was successfully completed, the announcement has been published."
                  );
                }
              });
            }
          })();
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
