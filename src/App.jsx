import { useContext, useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { renderShape } from "./components/addShape";
import { useCreateShape } from "./hooks/useCreateShape";
import { checkEmpty } from "./functions/checkEmpty";
import { shapesCont } from "./context/shapesContext";

import { useKeyboardControl } from "./hooks/useKeyboardControl";
import { Controls } from "./components/cotrols/Controls";
import { useDraw } from "./hooks/useDraw";
import { renderDraw } from "./components/shapes/renderDraw";
import { useSyncServer } from "./hooks/useSync";
import { Upload } from "./components/Upload";

function App() {
  const { setSelected, selectedShape, setEditing, isEditing } =
    useContext(shapesCont);
  const [currShape, setShape] = useState({
    type: "square",
    color: "black",
    width: 100,
    height: 100,
    radius: 50,
    scaleY: 1,
    scaleX: 1,
    rotation: 0,
    fontSize: 15,
    fontFamily: "Arial",
    text: "",
  });

  const [shapes, add] = useCreateShape(currShape);

  const { actions, lines } = useDraw(currShape.width, currShape.color);

  useSyncServer();
  useKeyboardControl();
  return (
    <Upload>
      <Controls currShape={currShape} setShape={setShape} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseUp={(e) => currShape.type === "draw" && actions.handleMouseUp(e)}
        onMouseMove={(e) =>
          currShape.type === "draw" && actions.handleMouseMove(e)
        }
        onMouseDown={(e) => {
          currShape.type === "draw" && actions.handleMouseDown(e);
          if (
            currShape.type !== "draw" &&
            checkEmpty(e) &&
            selectedShape === false &&
            !isEditing
          ) {
            add(e);
          }
        }}
        onClick={(e) => {
          if (currShape.type !== "draw" && checkEmpty(e)) {
            setSelected(false);
          }
          setEditing(false);
        }}
      >
        <Layer>
          {shapes.map((i) => {
            if (i.type !== "text") {
              return renderShape(i);
            }
          })}
          {lines.map((line) => {
            return renderDraw(line);
          })}
          {shapes.map((i) => {
            if (i.type === "text") {
              return renderShape(i);
            }
          })}
        </Layer>
      </Stage>
    </Upload>
  );
}

export default App;
