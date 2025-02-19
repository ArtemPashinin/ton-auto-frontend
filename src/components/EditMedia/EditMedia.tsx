import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advertisement } from "../../interfaces/advertisement.interface";
import PageSpinner from "../placeholders/PageSpinner";
import { fetchAdvertisement } from "../../utils/fetch-advertisement";
import UploadForm from "./UploadForm";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import DraggableImage from "./DraggableImage";
import { Media } from "../../interfaces/vehicle-info.interface";
import { removeFile } from "../../utils/remove-media";
import { updateMain } from "../../utils/update-main-media";
import WebApp from "@twa-dev/sdk";
import { updateMediaOrder } from "../../utils/update-media-order";
import { uploadOneMedia } from "../../utils/upload-one-media";

const EditMedia = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [leftImages, setLeftImages] = useState<Media[]>([]);
  const [rightImages, setRightImages] = useState<Media[]>([]);
  const [mainImageId, setMainImageId] = useState<string | null>(null);

  const [advertisement, setAdvertisement] = useState<
    Advertisement | undefined
  >();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Берём только первый файл
    if (!file) return;

    // Проверка на максимальное количество изображений
    const totalImages = leftImages.length + rightImages.length;
    if (totalImages >= 10) {
      WebApp.showAlert("A maximum of 10 images can be uploaded.");
      return;
    }

    // Проверка на размер файла
    if (file.size > 10 * 1024 * 1024) {
      WebApp.showAlert("The size of the media should not exceed 5 MB.");
      return;
    }

    if (advertisement) {
      const newMedia = await uploadOneMedia(
        file,
        totalImages,
        advertisement.id
      );

      // Чередуем добавление в колонки
      if (totalImages % 2 === 0) {
        setLeftImages((prevImages) => [...prevImages, newMedia]);
      } else {
        setRightImages((prevImages) => [...prevImages, newMedia]);
      }
    }
  };

  const handleDeleteImage = async (id: string, column: "left" | "right") => {
    if (leftImages.length + rightImages.length > 1) {
      const media = [...leftImages, ...rightImages].find(
        (img) => img.image_url === id
      );
      await removeFile(advertisement?.id, media?.id);

      if (column === "left") {
        setLeftImages((prevImages) =>
          prevImages.filter((image) => image.image_url !== id)
        );
      } else {
        setRightImages((prevImages) =>
          prevImages.filter((image) => image.image_url !== id)
        );
      }

      if (id === mainImageId) {
        const allImages = [...leftImages, ...rightImages].filter(
          (image) =>
            image.image_url !== id && !image.image_url.startsWith("video/")
        );
        if (allImages.length > 0) {
          setMainImageId(allImages[0].image_url);
        } else {
          setMainImageId(null);
        }
      }
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === "left" ? leftImages : rightImages;
    const destList =
      destination.droppableId === "left" ? leftImages : rightImages;
    const [removed] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, removed);
      if (source.droppableId === "left") {
        setLeftImages([...sourceList]);
      } else {
        setRightImages([...sourceList]);
      }
    } else {
      destList.splice(destination.index, 0, removed);
      if (source.droppableId === "left") {
        setLeftImages([...sourceList]);
        setRightImages([...destList]);
      } else {
        setRightImages([...sourceList]);
        setLeftImages([...destList]);
      }
    }

    const orderedImages: Media[] = [];

    const maxLength = Math.max(leftImages.length, rightImages.length);
    for (let i = 0; i < maxLength; i++) {
      if (leftImages[i]) orderedImages.push(leftImages[i]);
      if (rightImages[i]) orderedImages.push(rightImages[i]);
    }

    const updatedImagesOrder = orderedImages.map((image, index) => ({
      mediaId: image.id,
      order: index,
    }));
    await updateMediaOrder(updatedImagesOrder);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const ad = await fetchAdvertisement(id);
        if (!ad) return;
        setAdvertisement(ad);

        const right: Media[] = [];
        const left: Media[] = [];
        const sortedMedia = ad.media.sort((a, b) => a.order - b.order);

        sortedMedia.forEach((media, index) => {
          (index % 2 === 0 ? left : right).push(media);
        });

        const mainImage = ad.media.find((media) => media.main);
        setMainImageId(mainImage ? mainImage.image_url : "");

        setRightImages(right);
        setLeftImages(left);
      } catch {
        WebApp.showAlert("Error loading the ad", () => {
          navigate("/", { replace: true });
        });
      }
    })();
  }, [id, navigate]);

  const handleSetMainImage = async (id: string) => {
    const media = [...leftImages, ...rightImages].find(
      (img) => img.image_url === id
    );
    await updateMain(advertisement?.id, media?.id);
    setMainImageId(id);
  };

  if (!advertisement) return <PageSpinner fullscreen />;

  return (
    <div>
      <UploadForm handleFileChange={handleFileUpload} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          <Droppable droppableId="left">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: "50%", marginRight: "0.5rem" }}
              >
                {leftImages.map((image, index) => (
                  <DraggableImage
                    key={image.id}
                    imageUrl={image.image_url}
                    index={index}
                    mainImageId={mainImageId}
                    column="left"
                    handleSetMainImage={handleSetMainImage}
                    handleDeleteImage={handleDeleteImage}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="right">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: "50%" }}
              >
                {rightImages.map((image, index) => (
                  <DraggableImage
                    key={image.id}
                    imageUrl={image.image_url}
                    index={index}
                    mainImageId={mainImageId}
                    column="right"
                    handleSetMainImage={handleSetMainImage}
                    handleDeleteImage={handleDeleteImage}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default EditMedia;
