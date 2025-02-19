import { Image } from "react-bootstrap";
import startLogo from "../../assets/images/start.png";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { myAdsSelector } from "../../redux/slices/my-ads-slice/my-ads-slice";
import { useEffect, useState } from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { makeSelector } from "../../redux/slices/data-slice/data-slice";
import WebApp from "@twa-dev/sdk";
import style from "./Purchase.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { makePaymentLink } from "../../utils/make-payment-link";

const Purchase = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const myAds = useSelector(myAdsSelector);
  const makes = useSelector(makeSelector);

  const [ad] = useState<Advertisement | undefined>(
    myAds.find((myAd) => myAd.id == id)
  );

  const makeAndModel = makes.find((make) => make.id === ad?.model.make.id);
  const fullMakeModel = makeAndModel
    ? `${makeAndModel.make} ${ad?.model.model}`
    : "";

  useEffect(() => {
    const openInvoice = async () => {
      if (ad) {
        const invoiceLink = await makePaymentLink(ad.id);
        WebApp.openInvoice(invoiceLink, (status) => {
          if (status === "paid")
            navigate("/purachse/success", { replace: true });
        });
      }
    };
    WebApp.MainButton.onClick(openInvoice);
    WebApp.MainButton.setParams({
      text: "Purchase",
      has_shine_effect: true,
      is_visible: true,
    });

    return () => {
      WebApp.MainButton.offClick(openInvoice);
      WebApp.MainButton.setParams({
        text: undefined,
        has_shine_effect: false,
        is_visible: false,
      });
    };
  }, [ad, navigate]);

  useEffect(() => {
    if (!ad) navigate("/", { replace: true });
  }, [ad, navigate]);

  return (
    <div className="d-flex flex-column">
      <Image
        style={{ width: "100%" }}
        className="mb-5 rounded shadow"
        src={startLogo}
        alt="Starts payment"
      />
      <p className="defaultText fw-300 mb-1">Placing extra ad</p>
      <div
        className={`d-flex justify-content-between align-items-center mb-4 border-top border-bottom defaultText fs-20 fw-300 py-2 ${style.paymentInfo}`}
      >
        <span>{fullMakeModel}</span>
        <span>
          <FontAwesomeIcon icon={faStar} color="#F8A917" /> 500
        </span>
      </div>
      <p className="defaultText fw-300 mb-1 text-center px-5 lh-17 fs-17 text-nowrap">
        One more ad will cost 500 Telegram
        <br />
        stars, you can top up your balance
        <br />
        here.
      </p>
    </div>
  );
};

export default Purchase;
