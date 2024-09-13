import { useContext } from "react";
import { EventsContext } from "./EventsContext";
import { cn } from "../lib/utils";

export const DatesGrid = ({ date }: { date: Date }) => {
  const { selectedDate, setSelectedDate, setSelectedEvent, getEventsForDate } =
    useContext(EventsContext);
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  return Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const currentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      dayNumber
    );
    const dayEvents = getEventsForDate(currentDate);
    const isCurrentDay = isToday(currentDate);
    const isSunday = currentDate.getDay() === 0;

    return (
      <div
        key={i}
        className={cn(
          `p-1 sm:p-2 flex flex-col items-start justify-start rounded-lg`,
          {
            "cursor-pointer": isCurrentMonth,
            "bg-primary": isCurrentMonth && isCurrentDay,
            "hover:bg-primary/20 cursor-pointer transition-colors duration-300":
              isCurrentMonth && !isCurrentDay,
            "bg-secondary": isCurrentMonth && !isCurrentDay && !isSunday,
            "bg-destructive/20": isCurrentMonth && !isCurrentDay && isSunday,
            "ring-2 ring-primary":
              selectedDate &&
              isCurrentMonth &&
              currentDate.getTime() === selectedDate.getTime(),
          }
        )}
        onClick={() => {
          if (isCurrentMonth) {
            setSelectedDate(currentDate);
            setSelectedEvent(dayEvents[0]);
          }
        }}
      >
        {isCurrentMonth && (
          <>
            <span className="text-xs sm:text-base font-semibold">
              {dayNumber}
            </span>
            <div className="mt-1 w-full">
              {dayEvents.slice(0, 1).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "text-xs truncate bg-primary/80 p-px sm:p-1 mb-1 rounded cursor-pointer",
                    { "bg-secondary": isCurrentDay }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDate(currentDate);
                    setSelectedEvent(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 1 && (
                <div className="text-xs truncate">
                  +{dayEvents.length - 1} more
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  });
};
