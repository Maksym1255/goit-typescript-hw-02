import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <li onClick={() => openModal(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
      />
    </li>
  );
};

export default ImageCard;
