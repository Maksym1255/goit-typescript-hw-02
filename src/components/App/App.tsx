import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "../ImageModal/ImageModal";
import { Image, UnsplashResponse } from "./App.types";

const ACCESS_KEY = "yCbWoMxT9qaxA7SRlBjmOSBD63FGeyoBkzsg7_XIaSg";



function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get<UnsplashResponse>(
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery: string) => {
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

  const openModal = (image: Image) => {
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
      {!images.length && !isEmpty && <ErrorMessage message="No images found." />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageModal
        isOpen={!!modalImage}
        image={modalImage}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
