import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";

const ACCESS_KEY = "yCbWoMxT9qaxA7SRlBjmOSBD63FGeyoBkzsg7_XIaSg";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              orientation: "landscape",
              per_page: 12,
              client_id: ACCESS_KEY,
            },
          }
        );

        const { data } = response;

        if (!data.results.length)
          return (
            toast.error(
              "Sorry, we have not found the photos for your request. Try to write it differently."
            ),
            setIsEmpty(true)
          );
        setImages((prevImages) => [...prevImages, ...data.results]);

        setIsVisible(page < data.total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isVisible && !loading && (
        <LoadMoreBtn onClick={onLoadMore} disabled={loading} />
      )}
      {!images.length && !isEmpty && <ErrorMessage />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageModal
        isOpen={!!modalImage}
        image={modalImage}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
