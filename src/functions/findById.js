export const findById = (shapes, id) => {
  return shapes.filter((shape) => {
    return shape.id === id;
  });
};
