"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { days, months } from "../lib/utils";
import { AddEventDialog } from "../components/AddEventDialog";
import { EventListDialog } from "../components/EventsListDialog";
import { DatesGrid } from "../components/DatesGrid";
import { EventsProvider } from "../components/EventsContext";
import { ToggleTheme } from "../components/ToggleTheme";

export default function FullPageCalendar() {
  const [date, setDate] = useState(new Date());
  const [transitionClass, setTransitionClass] = useState("");

  const goToToday = () => {
    setDate(new Date());
  };

  const handlePrevMonth = () => {
    setTransitionClass("slide-right");
    setTimeout(() => {
      setDate(
        (prevDate) =>
          new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
      );
      setTransitionClass("");
    }, 0);
  };

  const handleNextMonth = () => {
    setTransitionClass("slide-left");
    setTimeout(() => {
      setDate(
        (prevDate) =>
          new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
      );
      setTransitionClass("");
    }, 0);
  };

  const handleMonthChange = (value: string) => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), months.indexOf(value), 1)
    );
  };

  const handleYearChange = (value: string) => {
    setDate((prevDate) => new Date(parseInt(value), prevDate.getMonth(), 1));
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
              className={`grid grid-cols-7 gap-1 transition-transform duration-300 ease-in-out ${transitionClass}`}
            >
              <DatesGrid date={date} />
            </div>
          </div>
        </div>
        <AddEventDialog />
        <EventListDialog />
      </EventsProvider>
      <ToggleTheme />
    </div>
  );
}
