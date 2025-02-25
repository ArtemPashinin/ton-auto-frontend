import { useMemo, CSSProperties } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useZoomControl } from "../../hooks/useZoomcontrol";

const MediaPage = () => {
  const { url } = useParams<{ url: string }>();

  useZoomControl(true);

  const extensionList = useMemo(
    () => [
      "mov",
      "webm",
      "avi",
      "mp4",
      "mkv",
      "flv",
      "wmv",
      "mpeg",
      "mpg",
      "m4v",
      "3gp",
      "f4v",
      "ts",
      "vob",
    ],
    []
  );

  // Получение расширения из URL
  const extension = url?.split(".").pop()?.toLowerCase();

  // Стили для видео и изображений
  const mediaStyles: CSSProperties = {
    maxWidth: "100vw",
    maxHeight: "90vh",
    objectFit: "contain",
    display: "block",
    margin: "auto",
  };

  
  if (!url) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageWrapper backButton hideTabBar>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "95vh" }}
      >
        {extension && extensionList.includes(extension) ? (
          <video autoPlay src={url} controls style={mediaStyles} />
        ) : (
          <img src={url} alt="Media" style={mediaStyles} />
        )}
      </div>
    </PageWrapper>
  );
};

export default MediaPage;
