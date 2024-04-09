import { useContext, useEffect } from "react";
import { socket } from "../connection/connectServer";
import { shapesCont } from "../context/shapesContext";

export const useSyncServer = () => {
  const { shapes, setShapes, isDragging, changingElement } =
    useContext(shapesCont);

  useEffect(() => {
    socket.on("updateElement", (res) => setShapes(res));
  }, []);

  useEffect(() => {
    if (isDragging || changingElement.current) {
      socket.emit("createElement", shapes);
    }

    changingElement.current = false;
  }, [shapes]);
};
