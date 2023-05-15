import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const ImagesGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // const collectionRef = collection(db, "images");
    // const q = query(collectionRef, orderBy("createdAt", "desc"));
    // getDocs(q).then((querySnapshot) => {
    //   const docs = [];
    //   querySnapshot.forEach((doc) => {
    //     docs.push({ ...doc.data(), id: doc.id });
    //   });
    //   setImages(docs);
    // });
    const collectionRef = collection(db, "images");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setImages(docs);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        mt-4
    "
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImagesGrid;
