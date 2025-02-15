import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import UploadForm from "./UploadForm";
import DraggableImage from "./DraggableImage";
import WebApp from "@twa-dev/sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPlaceError,
  placeSelector,
  publishError,
  publishLoadingSelector,
} from "../../redux/slices/place-sclice/place-slice";
import { AppDispatch } from "../../redux/store";
import { placeAd } from "../../redux/slices/place-sclice/thunks/place-ad";
import { useNavigate } from "react-router-dom";

interface Image {
  id: string;
  url: string;
  file: File;
}

const ImageUploader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(publishError);
  const publishLoading = useSelector(publishLoadingSelector);
  const placeData = useSelector(placeSelector);
  const [leftImages, setLeftImages] = useState<Image[]>([]);
  const [rightImages, setRightImages] = useState<Image[]>([]);
  const [mainImageId, setMainImageId] = useState<string | null>(null);

  useEffect(() => {
    WebApp.MainButton.setText("Publish");
    WebApp.MainButton.show();
    return () => {
      WebApp.MainButton.hideProgress();
      WebApp.MainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (publishLoading) WebApp.MainButton.showProgress();
  }, [publishLoading]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const totalImages = leftImages.length + rightImages.length;
      const newFiles = Array.from(files);

      // Проверка на количество изображений
      if (newFiles.length + totalImages > 10) {
        WebApp.showAlert("Максимум можно загрузить 10 изображений.");
        return;
      }

      // Проверка на общий размер
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
      const currentSize =
        leftImages.reduce((acc, img) => acc + img.url.length, 0) +
        rightImages.reduce((acc, img) => acc + img.url.length, 0);
      const newSize = currentSize + totalSize;

      if (newSize > 40 * 1024 * 1024) {
        WebApp.showAlert("Общий размер изображений не должен превышать 40 МБ.");
        return;
      }

      const newImages: Image[] = [];
      newFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          newImages.push({
            id: `image-${Date.now()}-${i}`,
            url: imageUrl,
            file: file,
          });

          if (newImages.length === newFiles.length) {
            newImages.forEach((image, index) => {
              if (index % 2 === 0) {
                setLeftImages((prevImages) => [...prevImages, image]);
              } else {
                setRightImages((prevImages) => [...prevImages, image]);
              }
            });

            if (
              !mainImageId &&
              newImages.length > 0 &&
              !newImages[0].file.type.startsWith("video/")
            ) {
              setMainImageId(newImages[0].id);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUpload = useCallback(async () => {
    if (leftImages.length + rightImages.length < 1) {
      WebApp.showAlert("Нет изображений");
      return;
    }
    if (leftImages.length + rightImages.length < 2) {
      const element =
        leftImages.length > 0
          ? leftImages[0]
          : rightImages.length > 0
          ? rightImages[0]
          : null;
      if (element?.file.type.startsWith("video/")) {
        WebApp.showAlert("You must upload at least one image.");
        return;
      }
    }
    const formData = new FormData();
    const orderedImages: Image[] = [];

    Object.keys(placeData).forEach((key) => {
      const value = placeData[key] as string | Blob;
      formData.append(key, value);
    });

    // Чередуем изображения: первый из правой, первый из левой и т.д.
    const maxLength = Math.max(leftImages.length, rightImages.length);
    for (let i = 0; i < maxLength; i++) {
      if (leftImages[i]) orderedImages.push(leftImages[i]);
      if (rightImages[i]) orderedImages.push(rightImages[i]);
    }

    // Создаем meta данные
    const metaData = orderedImages.map((image, index) => ({
      order: index + 1,
      main: image.id === mainImageId,
    }));

    // Добавляем файлы и meta в FormData
    orderedImages.forEach((image) => {
      formData.append("files", image.file);
    });
    formData.append("meta", JSON.stringify(metaData));
    await dispatch(placeAd(formData));
    WebApp.MainButton.hideProgress();
    if (!error) {
      navigate("../place/success");
    } else {
      console.log(Array.from(formData));
      WebApp.showAlert("Something wrog.\nTry again later", () => {
        dispatch(clearPlaceError());
      });
    }
  }, [
    dispatch,
    error,
    leftImages,
    mainImageId,
    navigate,
    placeData,
    rightImages,
  ]);

  const onDragEnd = (result: DropResult) => {
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
  };

  const handleDeleteImage = (id: string, column: "left" | "right") => {
    if (column === "left") {
      setLeftImages((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    } else {
      setRightImages((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    }

    if (id === mainImageId) {
      const allImages = [...leftImages, ...rightImages].filter(
        (image) => image.id !== id
      );
      if (allImages.length > 0) {
        setMainImageId(allImages[0].id);
      } else {
        setMainImageId(null);
      }
    }
  };

  const handleSetMainImage = (id: string) => {
    setMainImageId(id);
  };

  useEffect(() => {
    WebApp.MainButton.onClick(handleUpload);

    return () => {
      WebApp.MainButton.offClick(handleUpload);
    };
  }, [handleUpload]);

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
                    image={image}
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
                    image={image}
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

export default ImageUploader;
