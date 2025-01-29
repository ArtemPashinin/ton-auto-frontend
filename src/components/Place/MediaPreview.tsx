import { Draggable } from "@hello-pangea/dnd";
import { Col, Image } from "react-bootstrap";
import style from "./MediaPreview.module.css";
import { MediaDto } from "../../interfaces/dto/media.dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faTrash,
} from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import WebApp from "@twa-dev/sdk";

export interface MediaPreviewProps {
  index: number;
  image: File;
  imageOrder: MediaDto;
  handleRemoveImage: (index: number) => void;
  updateMainMedia: (index: number) => void;
}

export const MediaPreview = ({
  index,
  image,
  imageOrder,
  updateMainMedia,
  handleRemoveImage,
}: MediaPreviewProps) => {
  return (
    <Draggable key={index} draggableId={String(index)} index={index}>
      {(provided) => (
        <Col
          onClick={() => {
            updateMainMedia(index);
          }}
          xs={5}
          className={`mb-3 p-1
            rounded-4 ${style.previewCard} ${
            imageOrder.main ? style.mainCard : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="justify-content-between d-flex align-items-center pe-2 pb-1">
            {imageOrder.main ? (
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

            <div onClick={() => handleRemoveImage(index)}>
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </div>
          </div>
          <div className="position-relative text-center">
            {/* Превью изображения */}
            <Image
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              className={`${style.previewImage} rounded-3 p-0`}
              fluid
            />
            {/* Кнопка удаления */}
          </div>
        </Col>
      )}
    </Draggable>
  );
};
