import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { shapesCont } from "../context/shapesContext";
import { useImage } from "react-konva-utils";

export const Upload = ({ children }) => {
  const { setShapes } = useContext(shapesCont);
  const [uploadedFiles, setUploadedFiles] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const [image] = useImage(
    uploadedFiles && "https://konvajs.org/assets/lion.png"
  );
  useEffect(() => {
    if (image) {
      console.log();
      setShapes((prev) => [
        ...prev,
        { type: "img", src: uploadedFiles[0].path },
      ]);
    }
  }, [image]);
  return (
    <div {...getRootProps()} onClick={() => {}}>
      {children}
    </div>
  );
};
