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
import { cn, toLocalISOString } from "../lib/utils";
import { useContext, useState } from "react";
import { EventsContext } from "./EventsContext";
import { AddEventDialog } from "./AddEventDialog";
import { Trash } from "lucide-react";

const EventsList = () => {
  const {
    selectedDate,
    selectedEvent,
    getEventsForDate,
    setSelectedEvent,
    handleUpdateEvent,
    handleDeleteEvent,
  } = useContext(EventsContext);

  const events = selectedDate ? getEventsForDate(selectedDate) : [];

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">No events for this day</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row ">
      <div className=" space-y-2 max-h-[300px] overflow-y-auto sm:w-1/3 sm:border-r sm:pr-5 sm:mr-5">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn("p-2 rounded cursor-pointer hover:bg-primary/10", {
              "bg-primary/20": selectedEvent?.id === event.id,
            })}
            onClick={() => setSelectedEvent(event)}
          >
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {event.description}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-5" />
      {selectedEvent ? (
        <>
          <div className="flex flex-1 flex-col justify-between space-y-3">
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
                    prev ? { ...prev, date: new Date(e.target.value) } : null
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
              <Label htmlFor="edit-event-description" className="text-right">
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
            <div className="flex justify-between">
              <Button onClick={handleDeleteEvent} variant="destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete Event
              </Button>
              <Button onClick={handleUpdateEvent} className="bg-primary">
                Update Event
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export const EventListDialog = () => {
  const { selectedDate, setNewEvent, setSelectedEvent, setSelectedDate } =
    useContext(EventsContext);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

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
          <EventsList />
        </DialogContent>
      </Dialog>
      <AddEventDialog
        isAddEventDialogOpen={isAddEventDialogOpen}
        setIsAddEventDialogOpen={setIsAddEventDialogOpen}
      />
    </>
  );
};
