import { useContext, useEffect } from "react";
import { shapesCont } from "../context/shapesContext";

const deleteShape = (selectedShape, setShapes) => {
  setShapes((prev) => prev.filter((shape) => shape.id !== selectedShape.id));
};

export const useKeyboardControl = () => {
  const { setShapes, setSelected, selectedShape, changingElement } =
    useContext(shapesCont);

  function handle(e) {
    changingElement.current = true;
    setSelected(false);
    if (e.key === "Delete") return deleteShape(selectedShape, setShapes);
  }

  useEffect(() => {
    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
    };
  });
};
