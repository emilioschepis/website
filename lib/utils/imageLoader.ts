import type { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src, width }) => {
  const relativeSrc = src.split("/").pop();
  return `https://media.graphcms.com/resize=width:${width}/${relativeSrc}`;
};

export default imageLoader;
