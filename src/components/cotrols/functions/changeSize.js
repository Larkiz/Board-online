export function changeWidth(e, { selectedShape, setShapes, changingElement }) {
  changingElement.current = true;
  return setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id === selectedShape.id) {
        return {
          ...shape,
          width: Number(e.target.value),

          radius: Number(e.target.value),
        };
      }
      return shape;
    })
  );
}

export function changeHeight(e, { selectedShape, setShapes, changingElement }) {
  changingElement.current = true;
  return setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id === selectedShape.id) {
        return {
          ...shape,

          height: Number(e.target.value),
          radius: Number(e.target.value),
        };
      }
      return shape;
    })
  );
}
