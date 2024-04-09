import { useEffect, useRef, useState } from "react";
import { socket } from "../connection/connectServer";

export const useDraw = (width, color) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      {
        width: width,
        color: color,
        points: [pos.x, pos.y],
        id: lines.length + 1,
      },
    ]);
  };
  let lastLine = lines[lines.length - 1];
  const handleMouseMove = (e) => {
    console.log(socket.id);
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (isDrawing.current) {
      socket.emit("draw", lines);
    }
  }, [lines]);

  useEffect(() => {
    socket.on("initShapes", (res) => {
      setLines(res.lines);
    });
    socket.on("draw", (res) => {
      setLines(res);
    });
  }, []);

  return {
    actions: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      lines,
      setLines,
    },
    lines,
  };
};
