import React, { useState } from "react";

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
}

export const EventsContext = React.createContext<{
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  newEvent: CalendarEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
  getEventsForDate: (date: Date) => CalendarEvent[];
  handleAddEvent: () => void;
  handleUpdateEvent: () => void;
  handleDeleteEvent: () => void;
}>({
  events: [],
  setEvents: () => {},
  newEvent: {
    id: "",
    date: new Date(),
    title: "",
    description: "",
  },
  setNewEvent: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  getEventsForDate: () => [],
  handleAddEvent: () => {},
  handleUpdateEvent: () => {},
  handleDeleteEvent: () => {},
});

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    id: "",
    date: new Date(),
    title: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const getEventsForDate = (date: Date, newEvents?: CalendarEvent[]) => {
    return (newEvents || events).filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() === "") return;
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, id: Date.now().toString() },
    ]);
    setNewEvent({ id: "", date: new Date(), title: "", description: "" });
    // select the new event on addition
    setSelectedEvent({ ...newEvent, id: Date.now().toString() });
  };

  const handleUpdateEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) => {
        const newEvents = prevEvents.filter(
          (event) => event.id !== selectedEvent.id
        );
        // select the next available event after deletion
        setSelectedEvent(
          selectedDate ? getEventsForDate(selectedDate, newEvents)[0] : null
        );
        return newEvents;
      });
    }
  };

  return React.createElement(
    EventsContext.Provider,
    {
      value: {
        events,
        setEvents,
        newEvent,
        setNewEvent,
        selectedDate,
        setSelectedDate,
        selectedEvent,
        setSelectedEvent,
        getEventsForDate,
        handleAddEvent,
        handleUpdateEvent,
        handleDeleteEvent,
      },
    },
    children
  );
};
