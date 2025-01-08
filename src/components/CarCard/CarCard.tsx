import { Col, Row, Image, Placeholder } from "react-bootstrap";
import { Media } from "../../interfaces/media.interface";
import { User } from "../../interfaces/user.interface";
import { format } from "date-fns";
import style from "./CarCard.module.css";
import { Model } from "../../interfaces/model.interface";
import { EngineType } from "../../interfaces/engine-type.interface";
import { Color } from "../../interfaces/color.interface";

interface CarCardProps {
  id: string;
  model: Model;
  year: number;
  hp: number;
  mileage: number;
  engine: EngineType;
  color: Color;
  price: number;
  description: string;
  createdAt: string;
  user: User;
  media: Media[];
  favoritesBy?: User[];
}

export const CarCard = ({
  model,
  year,
  mileage,
  engine,
  hp,
  color,
  price,
  createdAt,
  media,
  user,
}: CarCardProps) => {
  return (
    <Row className={`${style.carCard} rounded-4 p-2 mb-2`}>
      <Col className="h-100 p-0 me-2">
        <Image
          src={media.filter(({ main }) => main)[0].image_url}
          className={`${style.cardImage} rounded-3`}
        />
      </Col>
      <Col
        className={`text-start d-flex justify-content-between flex-column p-0`}
        xs={4}
      >
        <div>
          <p>
            {model.make.make} {model.model}
          </p>
        </div>
        <div>
          <p>🗓 {year}</p>
          <p>🛞{mileage} km</p>
          <p>⛽️ {engine.type}</p>
          <p>🐎 {hp}</p>
          <p>🌈 {color.color}</p>
          <p>📍 {user.city.country.title}</p>
          <p>
            💰 {price} {user.city.country.currency}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <p className={`${style.dateText}`}>
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </p>
          <i className={`fa-regular fa-heart ${style.favoriteIcon}`}> </i>
        </div>
      </Col>
    </Row>
  );
};
