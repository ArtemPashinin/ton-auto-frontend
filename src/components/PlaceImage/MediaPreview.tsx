import { Draggable } from "@hello-pangea/dnd";
import { Image } from "react-bootstrap";
import style from "./MediaPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faTrash,
} from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import WebApp from "@twa-dev/sdk";

interface Image {
  id: string;
  url: string;
}

export interface MediaPreviewProps {
  index: number;
  image: Image;
  mainImageId: boolean;
  column: "left" | "right";
  handleRemoveImage: (id: string, column: "left" | "right") => void;
  updateMainMedia: (index: string) => void;
}

const MediaPreview = ({
  index,
  image,
  column,
  mainImageId,
  updateMainMedia,
  handleRemoveImage,
}: MediaPreviewProps) => {
  return (
    <Draggable key={index} draggableId={String(index)} index={index}>
      {(provided) => (
        <div
          onClick={() => {
            updateMainMedia(image.id);
          }}
          className={`mb-3 p-1 rounded-4 ${style.previewCard} ${
            mainImageId ? style.mainCard : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            width: "100%",
          }}
        >
          <div className="justify-content-between d-flex align-items-center pe-2 pb-1">
            {mainImageId ? (
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCircleDot}
                  color={WebApp.themeParams.button_color}
                />
                <span className="ms-1 defaultText fs-14">Main</span>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCircle}
                  color={WebApp.themeParams.hint_color}
                />
              </div>
            )}

            <div onClick={() => handleRemoveImage(image.id, column)}>
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                color={WebApp.themeParams.text_color}
              />
            </div>
          </div>
          <div className="position-relative text-center">
            <Image
              src={image.url}
              alt={`preview-${index}`}
              className={`${style.previewImage} rounded-3 p-0`}
              fluid
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default MediaPreview;
