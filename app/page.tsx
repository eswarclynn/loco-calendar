"use client";

import { EventsProvider } from "../components/EventsContext";
import { EventListDialog } from "../components/EventsListDialog";
import { Navigation } from "../components/Navigation";
import { Month } from "../components/Month";
import { NavigationProvider } from "../components/NavigationContext";
import { Footer } from "../components/Footer";

export default function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col p-2 sm:p-4">
        <Navigation />
        <EventsProvider>
          <Month />
          <EventListDialog />
        </EventsProvider>
        <Footer />
      </div>
    </NavigationProvider>
  );
}
