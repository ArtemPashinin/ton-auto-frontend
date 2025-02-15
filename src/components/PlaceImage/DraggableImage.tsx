import { Draggable } from "@hello-pangea/dnd";
import style from "./MediaPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faTrash,
} from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import WebApp from "@twa-dev/sdk";

import VideoPreview from "../DetailCarCard/VideoPreview";

interface DraggableImageProps {
  image: { url: string; id: string; file: File };
  mainImageId: string | null;
  index: number;
  column: "right" | "left";
  handleSetMainImage: (id: string) => void;
  handleDeleteImage: (id: string, column: "right" | "left") => void;
}

const DraggableImage = ({
  image,
  mainImageId,
  index,
  column,
  handleSetMainImage,
  handleDeleteImage,
}: DraggableImageProps) => {
  const isVideo = image.file.type.split("/")[0] === "video";

  // Функция для обработки клика
  const handleClick = () => {
    if (!isVideo) {
      handleSetMainImage(image.id);
    }
  };

  return (
    <Draggable key={image.id} draggableId={image.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 p-1 ${style.previewCard} ${
            image.id === mainImageId ? style.mainCard : ""
          }`}
          style={{
            ...provided.draggableProps.style,
          }}
          onClick={handleClick} // Здесь вызываем handleClick
        >
          <div className="justify-content-between d-flex align-items-center pe-2 pb-1">
            {!isVideo &&
              (image.id === mainImageId ? (
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
              ))}

            <div
              className="ms-auto"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteImage(image.id, column);
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                color={WebApp.themeParams.text_color}
              />
            </div>
          </div>

          {isVideo ? (
            <VideoPreview size="3x" height="8rem" style="dark" />
          ) : (
            <img
              src={image.url}
              alt={`preview-${image.id}`}
              className={`${style.previewImage}`}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableImage;
