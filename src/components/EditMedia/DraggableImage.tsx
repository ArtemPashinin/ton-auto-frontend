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
  imageUrl: string;
  mainImageId: string | null;
  index: number;
  column: "right" | "left";
  handleSetMainImage: (id: string) => void;
  handleDeleteImage: (id: string, column: "right" | "left") => void;
}

const DraggableImage = ({
  imageUrl,
  mainImageId,
  index,
  column,
  handleSetMainImage,
  handleDeleteImage,
}: DraggableImageProps) => {
  const extensionList = [
    "mov", // QuickTime Movie
    "webm", // WebM формат
    "avi", // Audio Video Interleave
    "mp4", // MPEG-4
    "mkv", // Matroska Video
    "flv", // Flash Video
    "wmv", // Windows Media Video
    "mpeg", // MPEG Video
    "mpg", // MPEG Video (вариант расширения)
    "m4v", // MPEG-4 Video (вариант MP4)
    "3gp", // 3GPP Video
    "f4v", // Flash MP4 Video
    "ts", // Transport Stream
    "vob", // Video Object (используется на DVD)
  ];

  const isVideo = extensionList.includes(
    imageUrl.split(".").slice(-1)[0].toLowerCase()
  );
  // Функция для обработки клика
  const handleClick = () => {
    if (!isVideo) {
      handleSetMainImage(imageUrl);
    }
  };

  return (
    <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 p-1 ${style.previewCard} ${
            imageUrl === mainImageId ? style.mainCard : ""
          }`}
          style={{
            ...provided.draggableProps.style,
          }}
          onClick={handleClick} // Здесь вызываем handleClick
        >
          <div className="justify-content-between d-flex align-items-center pe-2 pb-1">
            {!isVideo &&
              (imageUrl === mainImageId ? (
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
                handleDeleteImage(imageUrl, column);
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
              src={imageUrl}
              alt={`preview-${imageUrl}`}
              className={`${style.previewImage}`}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableImage;
