export function handleResize({ shapeRef, changingElement, setShapes, id }) {
  if (shapeRef.current !== null) {
    changingElement.current = true;
    const textNode = shapeRef.current;
    const newWidth = textNode.width() * textNode.scaleX();
    const newHeight = textNode.height() * textNode.scaleY();

    textNode.setAttrs({
      width: newWidth,
      scaleX: 1,
    });

    setShapes((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          return { ...i, width: newWidth, height: newHeight };
        }
        return i;
      })
    );
  }
}
