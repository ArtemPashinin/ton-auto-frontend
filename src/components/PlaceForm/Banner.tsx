import { faStar } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stars from "../../assets/images/stars.png";

const Banner = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center sectionBgColor py-3 px-2 defaultText gap-4"
      style={{ borderRadius: "0.5rem" }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <img src={stars} style={{ height: "70px", width: "105px" }} />
        <p className="fs-17 ">Placing extra ad:</p>
        <p className="fs-17">
          <FontAwesomeIcon icon={faStar} color="#F8A917" /> 500
        </p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <p className="fs-12">Announcement</p>
        <p className="fs-12 text-center">
          We are pleased to offer one free advertisement per customer! Any
          additional advertisements will be subject to our standard charges of
          500 stars! Thank you for your understanding and cooperation!
        </p>
      </div>
    </div>
  );
};

export default Banner;
