import { useState } from "react";
import { Button } from "react-bootstrap";
import WebApp from "@twa-dev/sdk";

interface CopyButtonProps {
  phoneNumber: string;
}

export const CopyButton = ({ phoneNumber }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setIsCopied(true);
    } catch {
      WebApp.showAlert("Copying is not available, please try again later");
    }
  };

  return (
    <Button
      className="w-100 main-outline-button fw-400 py-2"
      onClick={copyToClipboard}
    >
      {isCopied ? "Copied" : "Copy number"}
    </Button>
  );
};
