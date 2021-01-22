import React from "react";
import { Image } from "semantic-ui-react";
import road1 from "../static/road-numbers/1.png";
import road2 from "../static/road-numbers/2.png";
import road3 from "../static/road-numbers/3.png";
import road4 from "../static/road-numbers/4.png";
import road5 from "../static/road-numbers/5.png";

const roadNumbers = [road1, road2, road3, road4, road5];

const RoadNumber = ({ roadNumber, floated }) => {
  return (
    <Image
      className="road_number"
      floated={floated}
      verticalAlign="middle"
      size="mini"
      src={roadNumbers[roadNumber - 1]}
    />
  );
};

export default RoadNumber;
