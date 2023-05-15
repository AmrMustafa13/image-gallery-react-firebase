import React from "react";
import UploadImage from "./components/UploadImage";
import ImagesGrid from "./components/ImagesGrid";

const App = () => {
  return (
    <>
      <nav className="py-4 bg-blue-500 px-4">
        <p className="text-2xl font-bold text-white">Image Gallery</p>
      </nav>
      <div className="px-4">
        <UploadImage />
        <ImagesGrid />
      </div>
    </>
  );
};

export default App;
