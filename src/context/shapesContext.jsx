import { createContext, useState, useRef } from "react";
import { socket } from "../connection/connectServer";

export const shapesCont = createContext();

export const ShapesContext = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [isDragging, setDragging] = useState(false);
  const [selectedShape, setSelected] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const changingElement = useRef(false);

  socket.on("initShapes", (res) => {
    setShapes(res.shapes);
  });

  function posUpdate(id, e) {
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id === id) {
          return { ...shape, x: e.target.x(), y: e.target.y() };
        }
        return shape;
      })
    );
  }

  function sizeUpdate(id, width, height, rotation, x, y) {
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id === id) {
          return {
            ...shape,
            width: width,
            height: height,
            rotation: rotation,
            x: x,
            y: y,
          };
        }
        return shape;
      })
    );
  }

  function scaleUpdate(id, scaleY, scaleX, x, y, rotation) {
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id === id) {
          return {
            ...shape,
            scaleY: scaleY,
            scaleX: scaleX,
            x: x,
            y: y,
            rotation: rotation,
          };
        }
        return shape;
      })
    );
  }

  const funcs = {
    setShapes,
    shapes,
    isDragging,
    setDragging,
    posUpdate,
    setSelected,
    selectedShape,
    changingElement,
    sizeUpdate,
    scaleUpdate,
    isEditing,
    setEditing,
  };
  return <shapesCont.Provider value={funcs}>{children}</shapesCont.Provider>;
};
