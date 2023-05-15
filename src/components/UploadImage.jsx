import React, { useState } from "react";
import { storage, db } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [erroeMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleImage = (e) => {
    if (e.target.files[0] && types.includes(e.target.files[0].type)) {
      setImage(e.target.files[0]);
      setErrorMsg(null);
    } else {
      setImage(null);
      setErrorMsg("Please select a valid image file (png or jpg)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const storageRef = ref(storage, `images/${image.name + Date.now()}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db, "images"), {
          url,
          createdAt: Timestamp.fromDate(new Date()),
        })
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            setErrorMsg(err.message);
            setLoading(false);
          });
      });
    });
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-center"
    >
      <input
        type="file"
        onChange={handleImage}
        accept="image/*"
        className="hidden"
        id="upload"
      />
      <label
        htmlFor="upload"
        className="bg-blue-500 hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        focus:outline-none
        focus:shadow-outline
        my-4
        cursor-pointer
      "
      >
        Select Image
      </label>
      {erroeMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {erroeMsg}
        </div>
      )}
      {image && (
        <div
          className="
        bg-green-100
        border border-green-400
        text-green-700
        px-4
        py-3
        rounded
        my-4
      "
        >
          {image.name}
        </div>
      )}
      <button
        className="
        bg-blue-500 hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        focus:outline-none
        focus:shadow-outline
        my-4
        cursor-pointer
      "
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadImage;
