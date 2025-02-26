import { format } from 'date-fns';

import { CallButton } from './CallButton';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';
import { MediaSwiper } from './Swiper';
import { Advertisement } from '../../interfaces/advertisement.interface';

import style from './CarCard.module.css';

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
        <div className="text-start fw-normal fs-14 pe-3 text-nowrap">
          <p>
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>📆</span>
            {year}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>🔘</span>
            {mileage} km
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>⛽️</span>
            {engine.type}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>🐎</span>
            {hp}
          </p>
          <p>
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>🌈</span>
            {color.color}
          </p>
          <p className="d-flex align-items-center">
            <span className="d-inline-block" style={{ minWidth: '2rem' }}>📍</span>
            <span className="d-inline-block lh-1">
              {user.city.country.title},<br />
              {user.city.title}
            </span>
          </p>
        </div>
        <div className="text-start">
          <p className="fw-light text-break">{description}</p>
          <p className={`${style.dateText} fw-normal fs-12`}>{format(new Date(createdAt), 'MMM dd, yyyy')}</p>
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
