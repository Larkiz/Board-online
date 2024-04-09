import { findById } from "../../../functions/findById";
import { changeFontSize } from "../functions/changeFontSize";
import { FontSelect } from "./FontSelect";

export const FontControls = ({ actions }) => {
  const {
    selectedShape,
    setShapes,
    changingElement,
    shapes,
    currShape,
    setShape,
  } = actions;

  return (
    <>
      <input
        type="number"
        value={
          selectedShape !== false
            ? findById(shapes, selectedShape.id)[0].fontSize
            : currShape.fontSize
        }
        onChange={(e) => {
          e.stopPropagation();
          changingElement.current = e.target.value;

          if (selectedShape) {
            changeFontSize(e, { selectedShape, setShapes, changingElement });
          } else {
            setShape({
              ...currShape,
              width: Number(e.target.value),
            });
          }
        }}
      />
      <FontSelect />
    </>
  );
};
