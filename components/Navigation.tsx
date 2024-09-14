"use client";

import React, { useEffect, useState } from "react";
import { months } from "../lib/utils";

export const NavigationContext = React.createContext<{
  date: Date;
  transitionDirection: "left" | "right" | null;
  goToToday: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleMonthChange: (value: string) => void;
  handleYearChange: (value: string) => void;
}>({
  date: new Date(),
  transitionDirection: null,
  goToToday: () => {},
  handlePrevMonth: () => {},
  handleNextMonth: () => {},
  handleMonthChange: () => {},
  handleYearChange: () => {},
});
const ANIMATION_DURATION = 500;

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [date, setDate] = useState(new Date());
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right" | null
  >(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const goToToday = () => {
    setDate(new Date());
  };

  const getPreviousMonth = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth() - 1, 1);
  const getNextMonth = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 1);

  const handlePrevMonth = () => {
    setTransitionDirection("right");
    setTimeout(() => {
      setDate((prevDate) => getPreviousMonth(prevDate));
    }, ANIMATION_DURATION / 10);
    setTimeout(() => {
      setTransitionDirection(null);
    }, ANIMATION_DURATION);
  };

  const handleNextMonth = () => {
    setTransitionDirection("left");
    setTimeout(() => {
      setDate((prevDate) => getNextMonth(prevDate));
    }, ANIMATION_DURATION / 10);
    setTimeout(() => {
      setTransitionDirection(null);
    }, ANIMATION_DURATION);
  };

  const handleMonthChange = (value: string) => {
    const newMonth = months.indexOf(value);
    if (newMonth > date.getMonth()) {
      setTransitionDirection("left");
    } else if (newMonth < date.getMonth()) {
      setTransitionDirection("right");
    }
    setTimeout(() => {
      setDate((prevDate) => new Date(prevDate.getFullYear(), newMonth, 1));
    }, ANIMATION_DURATION / 10);
    setTimeout(() => {
      setTransitionDirection(null);
    }, ANIMATION_DURATION);
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value);
    if (newYear > date.getFullYear()) {
      setTransitionDirection("left");
    } else if (newYear < date.getFullYear()) {
      setTransitionDirection("right");
    }

    setTimeout(() => {
      setDate((prevDate) => new Date(newYear, prevDate.getMonth(), 1));
    }, ANIMATION_DURATION / 10);

    setTimeout(() => {
      setTransitionDirection(null);
    }, ANIMATION_DURATION);
  };

  return (
    <NavigationContext.Provider
      value={{
        date,
        transitionDirection,
        goToToday,
        handlePrevMonth,
        handleNextMonth,
        handleMonthChange,
        handleYearChange,
      }}
    >
      {children}
      <style>
        {`
          .animation-right {
            animation: slideToRight ${ANIMATION_DURATION}ms ease-in-out;
          }
          .animation-left {
            animation: slideToLeft ${ANIMATION_DURATION}ms ease-in-out;
          }
            
          @keyframes slideToLeft {
            0% {
              transform: translateX(10%);
              opacity: 0.8;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
                  
          @keyframes slideToRight {
            0% {
              transform: translateX(-10%);
              opacity: 0.8;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </NavigationContext.Provider>
  );
};
