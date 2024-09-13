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
import { useContext } from "react";
import { toLocalISOString } from "../lib/utils";
import { EventsContext } from "./EventsContext";

export const AddEventDialog = ({
  isAddEventDialogOpen,
  setIsAddEventDialogOpen,
}: {
  isAddEventDialogOpen: boolean;
  setIsAddEventDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { newEvent, setNewEvent, handleAddEvent } = useContext(EventsContext);
  return (
    <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-date" className="text-right">
                Date
              </Label>
              <Input
                id="event-date"
                type="date"
                value={toLocalISOString(newEvent.date).split("T")[0]}
                onChange={(e) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input
                id="event-title"
                autoFocus
                required
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent((prev) => ({ ...prev, title: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <Button
            className="w-full"
            type="submit"
            onClick={() => {
              handleAddEvent();
              setIsAddEventDialogOpen(false);
            }}
          >
            Add Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
