export function fontFamilyChange(
  e,
  { selectedShape, setShapes, changingElement }
) {
  changingElement.current = true;
  return setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id === selectedShape.id) {
        return {
          ...shape,
          fontFamily: e.target.value,
        };
      }
      return shape;
    })
  );
}
