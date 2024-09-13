"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { days, months } from "../lib/utils";
import { EventListDialog } from "../components/EventsListDialog";
import { DatesGrid } from "../components/DatesGrid";
import { EventsProvider } from "../components/EventsContext";
import { ToggleTheme } from "../components/ToggleTheme";

const ANIMATION_DURATION = 500;

export default function FullPageCalendar() {
  const [date, setDate] = useState(new Date());
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right" | null
  >(null);

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
    <div className="min-h-screen bg-background text-foreground flex flex-col p-2 sm:p-4">
      <Header
        date={date}
        goToToday={goToToday}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
      />
      <EventsProvider>
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
        <EventListDialog />
      </EventsProvider>
      <ToggleTheme />
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
    </div>
  );
}
