import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper.min.css";
import { Media } from "../../interfaces/media.interface";
import style from "./CarCard.module.css";

interface MediaSwiperProps {
  medias: Media[];
}

export const MediaSwiper = ({ medias }: MediaSwiperProps) => {
  return (
    <Swiper
      spaceBetween={50}
      pagination={true}
      modules={[Pagination]}
      className={`${style.cardSwiper}`}
    >
      {medias.map(({ id, image_url }) => (
        <SwiperSlide>
          <img src={image_url} alt="" key={id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
