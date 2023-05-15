import React from "react";

const ImageCard = ({ image }) => {
  return (
    <div
      className="
        bg-white
        p-2
        max-w-sm
        rounded
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition
        duration-500
        transform
        hover:scale-105
        cursor-pointer
    "
    >
      <img
        src={image.url}
        alt="uploaded pic"
        className="
        w-full
        h-48
        object-cover
      "
      />
    </div>
  );
};

export default ImageCard;
