import { Draggable } from "@hello-pangea/dnd";
import style from "./MediaPreview.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faTrash,
} from "@awesome.me/kit-7090d2ba88/icons/classic/regular";
import WebApp from "@twa-dev/sdk";

interface DraggableImageProps {
  image: { url: string; id: string };
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
          onClick={() => handleSetMainImage(image.id)}
        >
          <div className="justify-content-between d-flex align-items-center pe-2 pb-1">
            {image.id === mainImageId ? (
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
            <div
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

          <img
            src={image.url}
            alt={`preview-${image.id}`}
            className={`${style.previewImage}`}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableImage;
