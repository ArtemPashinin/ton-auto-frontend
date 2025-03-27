import { useState } from "react";
import { format } from "date-fns";
import FsLightbox from "fslightbox-react";

import { CallButton } from "./CallButton";
import { CopyButton } from "./CopyButton";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";
import { MediaSwiper } from "./Swiper";
import { Advertisement } from "../../interfaces/advertisement.interface";

import { getNumberWithSpaces } from "../../utils/price";

import style from "./CarCard.module.css";

type DetailCardCardProps = Advertisement;

export const DetailCardCard = ({
  id,
  model,
  price,
  user,
  media,
  year,
  mileage,
  engine,
  hp,
  color,
  description,
  createdAt,
  favoritedBy,
  fict_phone,
  fict_city,
  fict_country,
}: DetailCardCardProps) => {
  const [toggler, setToggler] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const displayPhone = fict_phone || user!.phone!;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setToggler(!toggler);
  };

  return (
    <>
      <div className="d-flex flex-column gap-3 p-2 pb-5 defaultText">
        <div className="d-flex justify-content-between fs-20 flex-wrap">
          <p className="text-start">
            {model.make.make} {model.model}
          </p>
          <p>
            🤝 {getNumberWithSpaces(price)}
            {fict_country?.currency || user.city.country.currency}
          </p>
        </div>

        <div className="d-flex swiper-container">
          <MediaSwiper media={media} handleImageClick={handleImageClick} />
        </div>

        <div className="text-start fw-normal fs-14 text-nowrap d-flex flex-wrap">
          <p className="w-50 pe-2">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              📆
            </span>
            {year}
          </p>
          <p className="w-50 pe-2">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🐎
            </span>
            {hp}
          </p>
          <p className="w-50 pe-2">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🔘
            </span>
            {getNumberWithSpaces(mileage)} km
          </p>
          <p className="w-50 pe-2">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              🌈
            </span>
            {color.color}
          </p>
          <p className="w-50 pe-2">
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              ⛽️
            </span>
            {engine.type}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: "1.5rem" }}>
              📍
            </span>
            {fict_country?.title || user.city.country.title},
            {fict_city?.title || user.city.title}
          </p>
        </div>
        <div className="text-start">
          <p className="fw-light text-break mb-2">{description}</p>
          <p className={`${style.dateText} fw-normal fs-12`}>
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <div className="d-flex gap-2 w-100">
            <CallButton phoneNumber={displayPhone} />
            <CopyButton phoneNumber={displayPhone} />
          </div>
          <div className="w-100 d-flex gap-2">
            <FavoriteButton advertisementId={id} favoritedBy={favoritedBy} />
            <ShareButton advertisementId={id} model={model} />
          </div>
        </div>
      </div>
      <div>
        <FsLightbox
          toggler={toggler}
          sources={[...media]
            .sort((a, b) => a.order - b.order)
            .map((img) => img.image_url)}
          sourceIndex={selectedImageIndex}
          types={[...new Array(media.length).fill("image")]}
          key={media.length}
        />
      </div>
    </>
  );
};