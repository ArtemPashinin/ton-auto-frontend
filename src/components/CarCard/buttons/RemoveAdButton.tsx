import { Button, Col } from "react-bootstrap";
import { faTrash } from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { removeAdretisement } from "../../../redux/slices/my-ads-slice/thunks/remove-advertisement";
import { useCallback } from "react";
import WebApp from "@twa-dev/sdk";

interface RemoveAdButtonProps {
  asdvertisementAd: string;
}

const RemoveAdButton = ({ asdvertisementAd }: RemoveAdButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const removeAd = useCallback(() => {
    WebApp.showConfirm("Are you sure?", (confirm: boolean) => {
      if (confirm) dispatch(removeAdretisement(asdvertisementAd));
    });
  }, [asdvertisementAd, dispatch]);

  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 danger-button py-2 d-flex align-items-center justify-content-center gap-2"
        onClick={(event) => {
          event.stopPropagation();
          removeAd();
        }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          style={{ fontSize: "1.125rem", marginBottom: "1px" }}
        />
        <p>Remove ad</p>
      </Button>
    </Col>
  );
};

export default RemoveAdButton;
