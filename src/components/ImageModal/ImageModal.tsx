import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  image: {
    id: string;
    urls: {
      regular?: string;
      small?: string;
    }
   alt_description: string;
  } | null;

}


export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, closeModal, image }) => {
  if (!image || !image.urls?.regular) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <img src={image.urls.regular} alt={image.alt_description} />
    </Modal>
  );
};
