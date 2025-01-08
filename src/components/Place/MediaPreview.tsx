import { Draggable } from "@hello-pangea/dnd";
import { Col, Image } from "react-bootstrap";
import style from "./MediaPreview.module.css";
import { MediaDto } from "../../interfaces/dto/media.dto";

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
          <div className="justify-content-between d-flex align-items-center ps-1 pe-2">
            {imageOrder.main ? (
              <div className="d-flex align-items-center">
                <i
                  className={`fa-regular fa-circle defaultText fs-17 me-2 ${style.mainCardIcon}`}
                ></i>
                <span className="defaultText fs-14">Main</span>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <i className="fa-regular fa-circle defaultText fs-17"></i>
              </div>
            )}

            <div onClick={() => handleRemoveImage(index)}>
              <i className="fa-solid fa-trash defaultText fs-17"></i>
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
