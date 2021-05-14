import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";

const Timeline = ({ activities }) => {
  return (
    <div>
      <VictoryChart domainPadding={50}>
        <VictoryGroup
          height={3200}
          horizontal={true}
          offset={24}
          colorScale={["tomato", "#01AC83"]}
          animate={{
            duration: 500,
            onLoad: { duration: 100 },
          }}
        >
          <VictoryBar
            data={[
              { x: "april", y: 3 },
              { x: "may", y: 3 },
              { x: "june", y: 3 },
            ]}
          />
          <VictoryBar
            data={[
              { x: "april", y: 2 },
              { x: "may", y: 1 },
              { x: "june", y: 7 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default Timeline;
