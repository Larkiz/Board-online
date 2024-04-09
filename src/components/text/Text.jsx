import { Text, Transformer } from "react-konva";
import { shapesCont } from "../../context/shapesContext";
import { useContext, useEffect, useRef } from "react";
import { Html } from "react-konva-utils";
import { handleResize } from "../cotrols/functions/handleResize";

export const TextCont = ({ shape }) => {
  const {
    setDragging,
    posUpdate,
    setSelected,
    selectedShape,
    setShapes,

    changingElement,
    isEditing,
    setEditing,
  } = useContext(shapesCont);

  const id = shape.id;
  const x = shape.x;
  const y = shape.y;

  const editing = isEditing.id === id;

  const shapeRef = useRef(null);
  const trRef = useRef(null);
  const isSelected = id === selectedShape.id;

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
    }
  }, [isSelected]);

  const style = getStyle(shape.width, shape.height);

  return (
    <>
      {editing ? (
        <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
          <textarea
            value={shape.text}
            onChange={(e) => {
              setShapes((prev) =>
                prev.map((i) => {
                  if (i.id === id) {
                    return { ...i, text: e.target.value };
                  }
                  return i;
                })
              );
            }}
            style={{
              ...style,
              color: shape.color,
              fontFamily: shape.fontFamily,
              fontSize: shape.fontSize,
            }}
          />
        </Html>
      ) : (
        <Text
          x={shape.x}
          y={shape.y}
          rotation={shape.rotation}
          onDragMove={(e) => {
            setDragging(e.target.x());
            posUpdate(id, e);
          }}
          ref={shapeRef}
          onClick={() => {
            setSelected(shape);
          }}
          onDblClick={() => {
            setEditing(shape);
          }}
          draggable
          onDragEnd={() => {
            setTimeout(() => setDragging(false));
          }}
          width={shape.width}
          height={shape.height}
          onTransform={() =>
            handleResize({ shapeRef, changingElement, setShapes, id })
          }
          text={shape.text}
          fill={shape.color}
          fontFamily={shape.fontFamily}
          fontSize={shape.fontSize}
        />
      )}

      {isSelected && !isEditing ? (
        <Transformer ref={trRef} flipEnabled={false} />
      ) : null}
    </>
  );
};

function getStyle(width, height) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "1px solid blue",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    overflow: "none",
    colour: "black",
    fontSize: "24px",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px",
  };
}
