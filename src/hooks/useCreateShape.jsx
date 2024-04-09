import { useContext } from "react";
import { shapesCont } from "../context/shapesContext";

export function useCreateShape(currS) {
  const {
    shapes,
    setShapes,
    isDragging,
    setEditing,
    setSelected,
    changingElement,
  } = useContext(shapesCont);

  const id = shapes.length ? shapes[shapes.length - 1].id + 1 : 1;
  const type = currS.type;

  function add(e) {
    if (!isDragging) {
      changingElement.current = true;

      const x = e.evt.layerX;
      const y = e.evt.layerY;

      const shape = {
        ...currS,
        x: type === "square" ? x - currS.width / 2 : x,
        y: type === "square" ? y - currS.height / 2 : y,
        id: id,
      };

      setShapes((prev) => [...prev, shape]);

      setSelected(shape);
      if (shape.type === "text") {
        setTimeout(() => setEditing(shape));
      }
    }
  }

  return [shapes, add];
}
