"use client";

import { EventsProvider } from "../components/EventsContext";
import { EventListDialog } from "../components/EventsListDialog";
import { Footer } from "../components/Footer";
import { Month } from "../components/Month";
import { NavigationProvider } from "../components/Navigation";
import { Header } from "../components/Header";

export default function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col p-2 sm:p-4">
        <Header />
        <EventsProvider>
          <Month />
          <EventListDialog />
        </EventsProvider>
        <Footer />
      </div>
    </NavigationProvider>
  );
}
