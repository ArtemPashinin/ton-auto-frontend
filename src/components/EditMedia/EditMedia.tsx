import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import WebApp from "@twa-dev/sdk";
import DraggableImage from "./DraggableImage";
import UploadForm from "./UploadForm";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { Media } from "../../interfaces/vehicle-info.interface";
import PageSpinner from "../placeholders/PageSpinner";

import { extensionList } from "../../utils/constants";
import { fetchAdvertisement } from "../../utils/fetch-advertisement";
import { removeFile } from "../../utils/remove-media";
import { updateMain } from "../../utils/update-main-media";
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
    // Объединяем все изображения
    const allMedia = [...leftImages, ...rightImages];

    // Находим удаляемое изображение
    const deletingImage = allMedia.find((media) => media.image_url === id);

    // Проверяем, является ли удаляемое изображение видео
    const isDeletingImageVideo = deletingImage
      ? extensionList.includes(
          deletingImage.image_url.split(".").pop()!.toLowerCase()
        )
      : false;

    // Считаем количество оставшихся изображений (не видео)
    const remainingImagesCount = allMedia.filter(
      (media) =>
        !extensionList.includes(media.image_url.split(".").pop()!.toLowerCase())
    ).length;

    // Проверяем условия для удаления
    const canDeleteImage =
      remainingImagesCount < 2 && // Остается хотя бы одно изображение
      !isDeletingImageVideo; // Удаляемое медиа не является видео

    if (canDeleteImage) {
      WebApp.showAlert("The ad must contain at least one image.");
      return;
    }

    // Удаляем файл с сервера
    const mediaToDelete = allMedia.find((img) => img.image_url === id);
    if (mediaToDelete) {
      await removeFile(advertisement?.id, mediaToDelete.id);
    }

    // Обновляем состояние изображений
    if (column === "left") {
      setLeftImages((prevImages) =>
        prevImages.filter((image) => image.image_url !== id)
      );
    } else {
      setRightImages((prevImages) =>
        prevImages.filter((image) => image.image_url !== id)
      );
    }

    // Если удаляемое изображение было главным, обновляем главное изображение
    if (id === mainImageId) {
      const remainingImages = allMedia.filter(
        (image) =>
          image.image_url !== id && !image.image_url.startsWith("video/")
      );
      if (remainingImages.length > 0)
        await updateMain(advertisement?.id, remainingImages[0].id);
      setMainImageId(
        remainingImages.length > 0 ? remainingImages[0].image_url : null
      );
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

  useEffect(() => {
    const back = () => {
      navigate(-1);
    };

    WebApp.MainButton.setText("Save");
    WebApp.MainButton.show();

    WebApp.MainButton.onClick(back);

    return () => {
      WebApp.MainButton.offClick(back);
      WebApp.MainButton.hide();
    };
  }, [navigate]);

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
