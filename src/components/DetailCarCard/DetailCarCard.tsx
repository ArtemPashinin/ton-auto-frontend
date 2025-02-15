import { format } from "date-fns";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { MediaSwiper } from "./Swiper";
import style from "./CarCard.module.css";
import { CallButton } from "./CallButton";
import { CopyButton } from "./CopyButton";
import { FavoriteButton } from "./FavoriteButton";

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
}: DetailCardCardProps) => {
  const displayPhone = fict_phone || user!.phone!;

  return (
    <div className="p-2 defaultText">
      <div className="d-flex justify-content-between fs-20 mb-3">
        <p className="text-start">
          {model.model} {model.make.make}
        </p>
        <p>
          💰{price} {user.city.country.currency}
        </p>
      </div>

      <div className="d-flex swiper-container mb-3">
        <MediaSwiper media={media} />
      </div>

      <div className="d-flex mb-4">
        <div className="text-start lh-18 fw-400 fs-14 pe-3 pt-1 text-nowrap">
          <p>📆 {year}</p>
          <p>🔘 {mileage} km</p>
          <p>⛽️ {engine.type}</p>
          <p>🐎 {hp}</p>
          <p>🌈 {color.color}</p>
          <p>
            📍 {user.city.country.title}, {user.city.title}
          </p>
        </div>
        <div className="text-start">
          <p className="fw-300 fs-17 lh-17 text-break">{description}</p>
          <p className={`${style.dateText} fw-400 fs-12`}>
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="d-flex gap-2 mb-2">
        <CallButton phoneNumber={displayPhone} />
        <CopyButton phoneNumber={displayPhone} />
      </div>

      <FavoriteButton advertisementId={id} favoritedBy={favoritedBy} />
    </div>
  );
};
