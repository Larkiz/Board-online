import { useContext } from "react";
import { fontFamilyChange } from "../functions/fontChange";
import { shapesCont } from "../../../context/shapesContext";

const fonts = ["Arial", "Times New Roman", "Verdana", "Helvetica"];

export const FontSelect = () => {
  const { selectedShape, setShapes, changingElement } = useContext(shapesCont);
  return (
    <select
      onChange={(e) => {
        fontFamilyChange(e, { selectedShape, setShapes, changingElement });
      }}
    >
      {fonts.map((font, i) => {
        return (
          <option key={i} value={font}>
            {font}
          </option>
        );
      })}
    </select>
  );
};
