import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import styles from "./Media.module.css";
import { Row, Stack, Form } from "react-bootstrap";
import { MediaPreview } from "./MediaPreview";
import { Media } from "../../interfaces/vehicle-info.interface";
import { removeFile } from "../../utils/remove-media";
import WebApp from "@twa-dev/sdk";
import { updateMain } from "../../utils/update-main-media";
import axios from "axios";
import { updateMediaOrder } from "../../utils/update-media-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@awesome.me/kit-7090d2ba88/icons/classic/thin";

interface MediaProps {
  media: Media[];
  toggleIsOnMediaEdit: () => void;
}

export const EditMedia = ({ media, toggleIsOnMediaEdit }: MediaProps) => {
  const [mediaData, setMediaData] = useState<Media[]>(
    [...media].sort((a, b) => a.order - b.order)
  );
  useEffect(() => {
    const cancel = () => {
      WebApp.SecondaryButton.hide();
      toggleIsOnMediaEdit();
    };
    WebApp.SecondaryButton.setText("Cancel");
    WebApp.SecondaryButton.show();
    WebApp.SecondaryButton.onClick(cancel);
    return () => {
      WebApp.SecondaryButton.offClick(cancel);
    };
  });

  // Обработка добавления нового файла
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        WebApp.showAlert("The size of image must not exceed 5 MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        WebApp.showAlert("Please select a valid image file");
        return;
      }

      if (mediaData.length >= 10) {
        WebApp.showAlert("You can upload up to 10 images");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify({ order: media.length }));

      const url = `${import.meta.env.VITE_APP_API_URL}/advertisements/${
        media[0].advertisement_id
      }/files`;

      try {
        const response = await axios.post<Media>(url, formData);
        setMediaData((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Error uploading image:", error);
        WebApp.showAlert("Error uploading image. Please try again.");
      }
    }
  };

  // Обработка удаления изображения
  const handleRemoveImage = useCallback(
    async (index: number) => {
      if (mediaData.length <= 1) return;

      const removedMedia = mediaData[index];

      // Удаление файла
      await removeFile(removedMedia.advertisement_id, removedMedia.id);

      // Формирование нового массива данных
      let updatedMediaData = mediaData.filter((_, i) => i !== index);

      // Обновление главного изображения, если удаленное было главным
      if (removedMedia.main && updatedMediaData.length > 0) {
        await updateMain(
          updatedMediaData[0].advertisement_id,
          updatedMediaData[0].id
        );
        updatedMediaData[0].main = true;
      }

      // Обновление порядка
      updatedMediaData = updatedMediaData.map((item, i) => ({
        ...item,
        order: i,
      }));

      setMediaData(updatedMediaData);
    },
    [media, mediaData]
  );

  const onDragEnd = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (result: any) => {
      if (!result.destination) return;

      const reorderedMediaData = [...mediaData];
      const [movedImage] = reorderedMediaData.splice(result.source.index, 1);
      reorderedMediaData.splice(result.destination.index, 0, movedImage);

      const reorderData = reorderedMediaData.map(({ id }, index) => ({
        mediaId: id,
        order: index,
      }));
      await updateMediaOrder(reorderData);
      setMediaData(
        reorderedMediaData.map((item, index) => ({ ...item, order: index }))
      );
      console.log(
        reorderedMediaData.map((item, index) => ({ ...item, order: index }))
      );
    },
    [mediaData]
  );

  // Обновление главного изображения
  const updateMainMedia = useCallback(
    async (index: number) => {
      await updateMain(mediaData[index].advertisement_id, mediaData[index].id);
      setMediaData((prevMediaData) =>
        prevMediaData.map((item, i) => ({
          ...item,
          main: i === index,
        }))
      );
    },
    [mediaData]
  );

  // useEffect(() => {
  //   console.log(media);
  // });

  return (
    <Stack className="p-2">
      <span className="text-start defaultText mb-3">Media</span>
      <Form.Group>
        <Form.Control
          type="file"
          max={1}
          accept="image/*"
          className={`${styles.uploadForm} d-none`}
          id="fileInput"
          onChange={handleFileChange}
        />
        <div
          className={`mb-3 ${styles.uploadForm} d-flex align-items-center justify-content-center flex-column gap-3`}
          onClick={() => document.getElementById("fileInput")!.click()}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            size="4x"
            color={WebApp.themeParams.hint_color}
          />
          <p className="defaultText">Add</p>
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
              {mediaData.map(({ image_url, main }, index) => (
                <MediaPreview
                  image={image_url}
                  {...{ index, handleRemoveImage, updateMainMedia, main }}
                  key={index}
                />
              ))}
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};
