import { format } from 'date-fns';
import { Col, Row } from 'react-bootstrap';

import { CallButton } from './CallButton';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';
import { MediaSwiper } from './Swiper';
import { Advertisement } from '../../interfaces/advertisement.interface';

import { getNumberWithSpaces } from '../../utils/price';

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
    <div className="d-flex flex-column gap-3 p-2 defaultText">
      <div className="d-flex justify-content-between fs-20 flex-wrap">
        <p className="text-start">
          {model.make.make} {model.model} 
        </p>
        <p>
          💰{getNumberWithSpaces(price)} {user.city.country.currency}
        </p>
      </div>

      <div className="d-flex swiper-container">
        <MediaSwiper media={media} />
      </div>

      <Row className="text-start fw-normal fs-14 text-nowrap align-items-center gx-1">
        <Col xs="3">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>📆</span>
          {year}
        </Col>
        <Col xs="4">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>🔘</span>
          {getNumberWithSpaces(mileage)} km
        </Col>
        <Col xs="5">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>🌈</span>
          {color.color}
        </Col>
        
        <Col xs="3">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>🐎</span>
          {hp}
        </Col>
        <Col xs="4">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>⛽️</span>
          {engine.type}
        </Col>
        <Col xs="5" className="d-flex align-items-center">
          <span className="d-inline-block" style={{ minWidth: '1.5rem' }}>📍</span>
          <span className="d-inline-block lh-1">
            {user.city.country.title},<br />
            {user.city.title}
          </span>
        </Col>
      </Row>
      <div className="text-start">
        <p className="fw-light text-break mb-2">{description}</p>
        <p className={`${style.dateText} fw-normal fs-12`}>{format(new Date(createdAt), 'MMM dd, yyyy')}</p>
      </div>

      <div className="d-flex gap-2 flex-wrap">
        <div className="d-flex gap-2 w-100">
          <CallButton phoneNumber={displayPhone} />
          <CopyButton phoneNumber={displayPhone} />
        </div>
        <FavoriteButton advertisementId={id} favoritedBy={favoritedBy} />
      </div>
    </div>
  );
};
