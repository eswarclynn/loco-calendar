import { useContext } from "react";
import { days } from "../lib/utils";
import { DatesGrid } from "./DatesGrid";
import { NavigationContext } from "./Navigation";

export const Month = () => {
  const { date, transitionDirection } = useContext(NavigationContext);
  return (
    <div className="flex-grow flex flex-col">
      <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
        {days.map((day) => (
          <div key={day} className="p-1 sm:p-2 text-sm sm:text-base">
            {day}
          </div>
        ))}
      </div>
      <div className="flex-grow relative overflow-hidden">
        <div
          className={`mt-2 grid grid-cols-7 gap-1 absolute inset-0 animation-${transitionDirection}`}
        >
          <DatesGrid date={date} />
        </div>
      </div>
    </div>
  );
};
