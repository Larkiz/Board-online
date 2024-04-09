import { Image } from "react-konva";
import { CircleCont } from "./shapes/addCirlce";
import { Square } from "./shapes/addSquare";
import { TextCont } from "./text/Text";

export const renderShape = (shape) => {
  if (shape.type === "circle")
    return <CircleCont key={shape.id} shape={shape} />;
  if (shape.type === "text") return <TextCont key={shape.id} shape={shape} />;
  if (shape.type === "img")
    return (
      <Image
        x={55}
        y={55}
        image={
          "https://putidorogi-nn.ru/images/stories/afrika/egipet/krasnoe_more_7.jpg"
        }
      />
    );
  return <Square key={shape.id} shape={shape} />;
};
