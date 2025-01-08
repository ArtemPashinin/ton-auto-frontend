import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React from "react";
import styles from "./Media.module.css";
import { Row, Stack, Form, Image, Button } from "react-bootstrap";
import { MediaPreview } from "./MediaPreview";
import { usePlaceContext } from "./PlaceContext";
import axios from "axios";

export const Media = () => {
  const { images, setImages, imagesOrder, setImagesOrder, advertisementData } =
    usePlaceContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
      setImagesOrder((prevImagesOrder) => [
        ...prevImagesOrder,
        ...filesArray.map((file, index) => ({
          order: prevImagesOrder.length + index,
          main: prevImagesOrder.length === 0 && index === 0,
          fileName: file.name,
        })),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    setImagesOrder((prevImagesOrder) => {
      const updatedImagesOrder = prevImagesOrder.filter((_, i) => i !== index);

      if (prevImagesOrder[index]?.main && updatedImagesOrder.length > 0) {
        updatedImagesOrder[0].main = true;
      }

      return updatedImagesOrder.map((item, i) => ({
        ...item,
        order: i,
      }));
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setImages(reorderedImages);

    const reorderedImagesOrder = Array.from(imagesOrder);
    const [movedOrder] = reorderedImagesOrder.splice(result.source.index, 1);
    reorderedImagesOrder.splice(result.destination.index, 0, movedOrder);

    const updatedImagesOrder = reorderedImagesOrder.map((item, index) => ({
      ...item,
      order: index,
    }));
    setImagesOrder(updatedImagesOrder);
  };

  const updateMainMedia = (index: number) => {
    setImagesOrder((prevImagesOrder) => {
      if (prevImagesOrder[index]) {
        const updatedImagesOrder = prevImagesOrder.map((prevImageOrder, i) => {
          return {
            ...prevImageOrder,
            main: i === index,
          };
        });
        return updatedImagesOrder;
      }

      return prevImagesOrder;
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();

    Object.keys(advertisementData).forEach((key) => {
      formData.append(key, advertisementData[key]);
    });

    const metaData = imagesOrder.map((image) => ({
      order: image.order,
      main: image.main,
    }));

    images.forEach((image) => {
      formData.append("files", image);
    });

    formData.append("meta", JSON.stringify(metaData));

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/advertisements`,
        formData
      );
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <Stack className="p-2">
      <span className="text-start defaultText mb-3">Media</span>
      <Form.Group>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          className={`${styles.uploadForm} d-none`}
          id="fileInput"
          onChange={handleFileChange}
        />
        <div
          className="custom-upload-button mb-3"
          onClick={() => document.getElementById("fileInput")!.click()}
        >
          <Image
            src={require("../../assets/images/from-background.png")}
            alt="Выберите файл"
            className="upload-image"
            fluid
          />
        </div>
        <p className="text-start subtitleText mb-3 fs-14">
          Drag photo to set an order. To choose the main photo click on anyone.
        </p>
      </Form.Group>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="vertical">
          {(provided) => (
            <Row
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="overflow-y-hidden justify-content-between m-0"
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {images.map((image, index) => (
                <MediaPreview
                  {...{ index, image, handleRemoveImage, updateMainMedia }}
                  imageOrder={imagesOrder[index]}
                  key={index}
                />
              ))}
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        disabled={images.length === 0}
        className="defaultText"
        onClick={() => {
          handleUpload();
        }}
      >
        Place
      </Button>
    </Stack>
  );
};
