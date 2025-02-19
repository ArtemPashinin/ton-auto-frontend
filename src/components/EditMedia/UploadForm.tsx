import { Form } from "react-bootstrap";
import style from "./Media.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@awesome.me/kit-7090d2ba88/icons/classic/thin";
import WebApp from "@twa-dev/sdk";

interface UploadFormProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadForm = ({ handleFileChange }: UploadFormProps) => {
  return (
    <Form.Group>
      <Form.Control
        type="file"
        accept="image/*, video/*"
        className={`${style.uploadForm} d-none`}
        id="fileInput"
        onChange={handleFileChange}
      />
      <div
        className={`mb-3 ${style.uploadForm} d-flex align-items-center justify-content-center flex-column gap-3`}
        onClick={() => document.getElementById("fileInput")!.click()}
      >
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="4x"
          color={WebApp.themeParams.hint_color}
        />
        <p className="defaultText">Add</p>
      </div>
      <p className="text-start subtitleText mb-3 fs-14">
        Drag photo to set an order. To choose the main photo click on anyone.
      </p>
    </Form.Group>
  );
};

export default UploadForm;
