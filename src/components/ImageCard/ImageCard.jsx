import css from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
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
