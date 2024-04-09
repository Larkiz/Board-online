export function colorPick(e, { selectedShape, setShapes }) {
  return setShapes((prev) =>
    prev.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, color: "#" + e.target.value };
      }

      return shape;
    })
  );
}
