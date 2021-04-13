import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";

const Overview = ({ activities }) => {
  const [categories, setCategories] = useState({
    bar: 0,
    restaurant: 0,
    grocery: 0,
    transport: 0,
  });

  useEffect(() => {
    activities.forEach((act) => {
      switch (act.category) {
        case "Bar/Cafeteria":
          const cat1 = categories.bar + act.amount;
          setCategories({ ...categories, bar: cat1 });
          break;
        case "Restaurant":
          const cat2 = categories.restaurant + act.amount;
          setCategories({ ...categories, restaurant: cat2 });
          break;
        case "Grocery Store":
          const cat3 = categories.grocery + act.amount;
          setCategories({ ...categories, grocery: cat3 });
          break;
        case "Transport":
          const cat4 = categories.transport + act.amount;
          setCategories({ ...categories, transport: cat4 });
          break;
        default:
          break;
      }
    });
  }, []);

  console.log(categories);

  return (
    <div>
      <VictoryPie
        data={[
          { x: "Bar/Cafeteria", y: categories.bar },
          { x: "Restaurant", y: categories.restaurant },
          { x: "Grocery Store", y: categories.grocery },
          { x: "Transport", y: categories.transport },
        ]}
      />
    </div>
  );
};

export default Overview;
