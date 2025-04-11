import { Button } from "react-bootstrap";

import { faPaperPlane } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";

interface SendButtonProps {
  username: string;
}

export const SendButton = ({ username }: SendButtonProps) => {
  return (
    <Button
      className="w-100 main-outline-button fw-400 py-2 d-flex justify-content-center align-items-center gap-3"
      onClick={() => {
        WebApp.openTelegramLink(`https://t.me/${username}`);
      }}
    >
      <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "20px" }} /> Send
      message
    </Button>
  );
};
