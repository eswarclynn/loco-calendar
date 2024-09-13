import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { months, years } from "@/lib/utils";

export const Header = ({
  date,
  goToToday,
  handlePrevMonth,
  handleNextMonth,
  handleMonthChange,
  handleYearChange,
}: {
  date: Date;
  goToToday: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleMonthChange: (value: string) => void;
  handleYearChange: (value: string) => void;
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button variant="outline" size="icon" onClick={handlePrevMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex space-x-2">
        <Select
          value={months[date.getMonth()]}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={date.getFullYear().toString()}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={goToToday}>
          Today
        </Button>
      </div>
      <Button variant="outline" size="icon" onClick={handleNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
