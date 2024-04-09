import { useContext, useEffect, useState } from "react";
import { shapesCont } from "../../context/shapesContext";
import { ColorPicker } from "primereact/colorpicker";
import { findById } from "../../functions/findById";
import { colorPick } from "./functions/colorPick";

import { FontControls } from "./controlComponents/FontControls";
import { ShapesControls } from "./controlComponents/ShapesControls";

export const Controls = ({ currShape, setShape }) => {
  const { selectedShape, setShapes, shapes, changingElement } =
    useContext(shapesCont);

  useEffect(() => {});

  const actions = {
    selectedShape,
    setShapes,
    setShape,
    changingElement,
    shapes,
    currShape,
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShape({ ...currShape, type: "draw" });
        }}
      >
        draw
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShape({ ...currShape, type: "circle", radius: 50 });
        }}
      >
        circle
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShape({ ...currShape, type: "square" });
        }}
      >
        square
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShape({ ...currShape, type: "text" });
        }}
      >
        text
      </button>
      <ColorPicker
        format="hex"
        value={
          selectedShape !== false
            ? findById(shapes, selectedShape.id)[0].color
            : currShape.color
        }
        onChange={(e) => {
          e.stopPropagation();
          changingElement.current = e.target.value;
          colorPick(e, { selectedShape, setShapes });
          if (!selectedShape) {
            setShape({ ...currShape, color: "#" + e.target.value });
          }
        }}
      />

      {currShape.type !== "text" ? (
        <ShapesControls actions={actions} />
      ) : (
        <FontControls actions={actions} />
      )}
    </>
  );
};
