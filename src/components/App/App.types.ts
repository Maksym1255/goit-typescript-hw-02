export interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

export interface UnsplashResponse {
  results: Image[];
  total_pages: number;
}
