import { faCirclePlay } from "@awesome.me/kit-7090d2ba88/icons/classic/solid";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebApp from "@twa-dev/sdk";

interface MediaPreviewProps {
  onClick?: () => void;
  size?: SizeProp;
  height?: string;
  style?: "light" | "dark";
}

const VideoPreview = ({
  onClick,
  size = "4x",
  height = "100%",
  style = "light",
}: MediaPreviewProps) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 rounded-4"
      style={{
        backgroundColor:
          style === "light"
            ? WebApp.themeParams.bg_color
            : WebApp.themeParams.secondary_bg_color,
        height,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faCirclePlay}
        size={size}
        color={WebApp.themeParams.button_color}
      />
    </div>
  );
};

export default VideoPreview;
