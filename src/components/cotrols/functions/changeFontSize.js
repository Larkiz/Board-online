export function changeFontSize(
  e,
  { selectedShape, setShapes, changingElement }
) {
  changingElement.current = true;
  return setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id === selectedShape.id) {
        return {
          ...shape,
          fontSize: Number(e.target.value),
        };
      }
      return shape;
    })
  );
}
