import { findById } from "../../../functions/findById";
import { changeHeight, changeWidth } from "../functions/changeSize";

export const ShapesControls = ({ actions }) => {
  const {
    selectedShape,
    setShapes,
    changingElement,
    currShape,
    setShape,
    shapes,
  } = actions;

  return (
    <>
      <input
        type="number"
        value={
          selectedShape !== false
            ? findById(shapes, selectedShape.id)[0].width
            : currShape.width
        }
        onChange={(e) => {
          e.stopPropagation();
          changingElement.current = e.target.value;

          changeWidth(e, { selectedShape, setShapes, changingElement });
          if (!selectedShape) {
            setShape({
              ...currShape,
              width: Number(e.target.value),
            });
          }
        }}
      />
      <input
        type="number"
        value={
          selectedShape !== false
            ? findById(shapes, selectedShape.id)[0].height
            : currShape.height
        }
        onChange={(e) => {
          e.stopPropagation();
          changingElement.current = e.target.value;

          changeHeight(e, { selectedShape, setShapes, changingElement });
          if (!selectedShape) {
            setShape({
              ...currShape,
              height: Number(e.target.value),
            });
          }
        }}
      />
    </>
  );
};
