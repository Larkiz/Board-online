import { Line } from "react-konva";

export const renderDraw = (line) => {
  return (
    <Line
      key={line.id}
      points={line.points}
      stroke={line.color}
      strokeWidth={5}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={
        line.tool === "eraser" ? "destination-out" : "source-over"
      }
    />
  );
};
