import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toLocalISOString } from "../lib/utils";
import { useContext, useState } from "react";
import { EventsContext } from "./EventsContext";
import { AddEventDialog } from "./AddEventDialog";

export const EventListDialog = () => {
  const {
    selectedDate,
    setNewEvent,
    getEventsForDate,
    selectedEvent,
    setSelectedEvent,
    setSelectedDate,
    handleUpdateEvent,
    handleDeleteEvent,
  } = useContext(EventsContext);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  const events = selectedDate ? getEventsForDate(selectedDate) : [];

  const handleOpenChange = (open?: boolean) => {
    if (!open) {
      setSelectedDate(null);
      setSelectedEvent(null);
    }
  };

  return (
    <>
      <Dialog open={!!selectedDate} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between mr-3">
              <DialogTitle className="">
                {selectedDate ? selectedDate.toDateString() : ""}
              </DialogTitle>
              <Button
                onClick={() => {
                  setNewEvent((prev) => ({
                    ...prev,
                    date: selectedDate || new Date(),
                  }));
                  setIsAddEventDialogOpen(true);
                }}
              >
                Add Event
              </Button>
            </div>
          </DialogHeader>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded cursor-pointer hover:bg-primary/10 ${
                      selectedEvent?.id === event.id ? "bg-primary/20" : ""
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {event.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">
                  No events for this day
                </p>
              )}
            </div>
            {selectedEvent ? (
              <>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-event-date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="edit-event-date"
                      type="date"
                      value={toLocalISOString(selectedEvent.date).split("T")[0]}
                      onChange={(e) =>
                        setSelectedEvent((prev) =>
                          prev
                            ? { ...prev, date: new Date(e.target.value) }
                            : null
                        )
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-event-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="edit-event-title"
                      value={selectedEvent.title}
                      onChange={(e) =>
                        setSelectedEvent((prev) =>
                          prev ? { ...prev, title: e.target.value } : null
                        )
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="edit-event-description"
                      className="text-right"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="edit-event-description"
                      value={selectedEvent.description}
                      onChange={(e) =>
                        setSelectedEvent((prev) =>
                          prev ? { ...prev, description: e.target.value } : null
                        )
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button onClick={handleUpdateEvent} className="bg-primary">
                    Update Event
                  </Button>
                  <Button onClick={handleDeleteEvent} variant="destructive">
                    Delete Event
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
      <AddEventDialog
        isAddEventDialogOpen={isAddEventDialogOpen}
        setIsAddEventDialogOpen={setIsAddEventDialogOpen}
      />
    </>
  );
};
