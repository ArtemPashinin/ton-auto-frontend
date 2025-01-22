import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import style from "./CarCard.module.css";
import { Media } from "../../interfaces/vehicle-info.interface";
import { useState } from "react";

interface MediaSwiperProps {
  media: Media[];
}

export const MediaSwiper = ({ media }: MediaSwiperProps) => {
  const [mediaData] = useState<Media[]>(
    [...media].sort((a, b) => a.order - b.order)
  );

  return (
    <Swiper
      spaceBetween={50}
      pagination={true}
      modules={[Pagination]}
      className="rounded-4"
    >
      {mediaData.map(({ id, image_url }) => (
        <SwiperSlide>
          <img
            className={`${style.swiperImg} rounded-4`}
            src={image_url}
            alt=""
            key={id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
