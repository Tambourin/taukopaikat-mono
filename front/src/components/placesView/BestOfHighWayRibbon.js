import React from "react";
import { Label } from "semantic-ui-react";

const style = {
  position: "absolute",
  top: "10px"
}

const BestOfHighwayRibbon = ({ highway }) => {
  return (
    <div style={style}>
      <Label ribbon color="blue">{`Valtatie ${highway}:n paras taukopaikka`}</Label>
    </div>
  )
}
export default BestOfHighwayRibbon;