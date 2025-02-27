import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import WebApp from "@twa-dev/sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  clearPlace,
  clearPlaceError,
  placeSelector,
  publishLoadingSelector,
  setImages,
  setMainImage,
} from "../../redux/slices/place-sclice/place-slice";
import { AppDispatch } from "../../redux/store";

import { useNavigate } from "react-router-dom";
import UploadForm from "./UploadForm";
import DraggableImage from "./DraggableImage";
import { placeAd } from "../../redux/slices/place-sclice/thunks/place-ad";

export interface Image {
  id: string;
  url: string;
  file: File;
}

interface ImageUploaderProps {
  left: Image[];
  right: Image[];
  mainId: string | null;
}

const ImageUploader = ({ mainId, left, right }: ImageUploaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const publishLoading = useSelector(publishLoadingSelector);
  const placeData = useSelector(placeSelector);
  const [leftImages, setLeftImages] = useState<Image[]>(left);
  const [rightImages, setRightImages] = useState<Image[]>(right);
  const [mainImageId, setMainImageId] = useState<string | null>(mainId);

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
        WebApp.showAlert("A maximum of 10 images can be uploaded.");
        return;
      }

      // Проверка на общий размер
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
      const currentSize =
        leftImages.reduce((acc, img) => acc + img.url.length, 0) +
        rightImages.reduce((acc, img) => acc + img.url.length, 0);
      const newSize = currentSize + totalSize;

      if (newSize > 40 * 1024 * 1024) {
        WebApp.showAlert("The total size of images should not exceed 40 MB.");
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
                dispatch(addImage({ side: "left", image: image }));
              } else {
                setRightImages((prevImages) => [...prevImages, image]);
                dispatch(addImage({ side: "right", image: image }));
              }
            });

            if (
              !mainImageId &&
              newImages.length > 0 &&
              !newImages[0].file.type.startsWith("video/")
            ) {
              setMainImageId(newImages[0].id);
              dispatch(setMainImage(newImages[0].id));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUpload = useCallback(async () => {
    if (leftImages.length + rightImages.length < 1) {
      WebApp.showAlert("No images");
      return;
    }
    const mediaList = [...leftImages, ...rightImages];
    if (!mediaList.some((media) => media.file.type.startsWith("image/"))) {
      WebApp.showAlert("You must upload at least one image.");
      return;
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
    try {
      const response = await dispatch(placeAd(formData)).unwrap();
      if (response) {
        dispatch(clearPlace());
        navigate("../place/success");
      }
    } catch {
      WebApp.showAlert("Something wrog.\nTry again later", () => {
        dispatch(clearPlaceError());
        navigate("/", { replace: true });
      });
    }
    WebApp.MainButton.hideProgress();
  }, [dispatch, leftImages, mainImageId, navigate, placeData, rightImages]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === "left" ? leftImages : rightImages;
    const destList =
      destination.droppableId === "left" ? leftImages : rightImages;
    const updatedSourceList = [
      ...sourceList.slice(0, source.index),
      ...sourceList.slice(source.index + 1),
    ];
    const removed = sourceList[source.index];

    if (source.droppableId === destination.droppableId) {
      const updatedList = [
        ...updatedSourceList.slice(0, destination.index),
        removed,
        ...updatedSourceList.slice(destination.index),
      ];
      if (source.droppableId === "left") {
        setLeftImages(updatedList);
        dispatch(setImages({ side: "left", images: updatedList }));
      } else {
        setRightImages(updatedList);
        dispatch(setImages({ side: "right", images: updatedList }));
      }
    } else {
      const updatedDestList = [
        ...destList.slice(0, destination.index),
        removed,
        ...destList.slice(destination.index),
      ];
      if (source.droppableId === "left") {
        setLeftImages(updatedSourceList);
        setRightImages(updatedDestList);
        dispatch(setImages({ side: "left", images: updatedSourceList }));
        dispatch(setImages({ side: "right", images: updatedDestList }));
      } else {
        setRightImages(updatedSourceList);
        setLeftImages(updatedDestList);
        dispatch(setImages({ side: "right", images: updatedSourceList }));
        dispatch(setImages({ side: "left", images: updatedDestList }));
      }
    }
  };

  const handleDeleteImage = (id: string, column: "left" | "right") => {
    if (column === "left") {
      const prevImages = leftImages.filter((image) => image.id !== id);
      setLeftImages(prevImages);
      dispatch(setImages({ side: "left", images: prevImages }));
    } else {
      const prevImages = rightImages.filter((image) => image.id !== id);
      setRightImages(prevImages);
      dispatch(setImages({ side: "right", images: prevImages }));
    }

    if (id === mainImageId) {
      const allImages = [...leftImages, ...rightImages].filter(
        (image) => image.id !== id && !image.file.type.startsWith("video/")
      );
      if (allImages.length > 0) {
        setMainImageId(allImages[0].id);
        dispatch(setMainImage(allImages[0].id));
      } else {
        setMainImageId(null);
        dispatch(setMainImage(null));
      }
    }
  };

  const handleSetMainImage = (id: string) => {
    setMainImageId(id);
    dispatch(setMainImage(id));
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
