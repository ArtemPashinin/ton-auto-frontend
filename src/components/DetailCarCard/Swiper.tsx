import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Общий стиль

import style from "./CarCard.module.css";
import { Media } from "../../interfaces/vehicle-info.interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoPreview from "./VideoPreview";

interface MediaSwiperProps {
  media: Media[];
}

export const MediaSwiper = ({ media }: MediaSwiperProps) => {
  const navigate = useNavigate();

  const [mediaData] = useState<Media[]>(
    [...media].sort((a, b) => a.order - b.order)
  );

  const handleMediaClick = (url: string) => {
    navigate(`../media/${encodeURIComponent(url)}`);
  };

  return (
    <Swiper
      spaceBetween={50}
      pagination={true}
      modules={[Pagination]}
      className="rounded-4"
    >
      {mediaData.map(({ id, image_url }) => {
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
          image_url.split(".").slice(-1)[0].toLowerCase()
        );

        return (
          <SwiperSlide key={id}>
            {isVideo ? (
              <VideoPreview onClick={() => handleMediaClick(image_url)} />
            ) : (
              // Для других типов медиа просто изображение
              <img
                className={`${style.swiperImg} rounded-4`}
                src={image_url}
                alt=""
                onClick={() => handleMediaClick(image_url)} // Переход на страницу с изображением
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
