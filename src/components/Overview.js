import React from "react";
import { VictoryPie } from "victory";

const Overview = () => {

  return (
    <div>
      <VictoryPie
        data={[
          { x: "Fede", y: 10 },
          { x: "Dogs", y: 10 },
          { x: "Birds", y: 25 },
        ]}
      />
    </div>
  );
};

export default Overview;
