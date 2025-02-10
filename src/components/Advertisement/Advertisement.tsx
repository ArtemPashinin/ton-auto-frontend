import { useState, useEffect } from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdvertisement } from "../../utils/fetch-advertisement";
import PageSpinner from "../placeholders/PageSpinner";
import { DetailCardCard } from "../DetailCarCard/DetailCarCard";

const DetailAdvertisement = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (id) setAdvertisement(await fetchAdvertisement(id));

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!advertisement && !loading) {
      navigate("/404");
    }
  }, [advertisement, loading, navigate]);

  if (loading) return <PageSpinner fullscreen />;

  return advertisement ? <DetailCardCard {...advertisement} /> : null;
};

export default DetailAdvertisement;
