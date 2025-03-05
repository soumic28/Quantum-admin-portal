import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Schedule } from "../components/Slot/Schedule";
import { useToast } from "../ui/use-toast";
import { createSlots, getAllSchedules } from "../api/slots";
import { ScheduleType } from "../interfaces/Schedule";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertBox";
import { Loader } from "../ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Turf } from "../interfaces";
import { getTurfs } from "../api/turf";
import { DatePickerWithRange } from "../ui/DateRange";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useNavigate } from "react-router-dom";
import { SlotPage } from "../components/Slot/Slot";

export function Slot() {
  return (
    <div className="my-10">
      <Tabs defaultValue="Schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="Schedule">Schedule</TabsTrigger>
          <TabsTrigger value="Slots">Slots</TabsTrigger>
        </TabsList>
        <TabsContent value="Schedule" className="space-y-4">
          <SchedulePage />
        </TabsContent>
        <TabsContent value="Slots" className="space-y-4">
          <SlotsPage turfId="" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SlotsPage({ turfId }: { turfId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [slots, setSlots] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSlots() {
      try {
        setLoading(true);
        const response = await getAllSchedules(); // Replace with actual API for slots
        setSlots(response?.data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [turfId]);

  return (
    <div className="p-5">
      <h1 className="text-3xl mb-4">Slots</h1>
      {loading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : slots.length === 0 ? (
        <p className="text-center text-lg">No slots available.</p>
      ) : (
        <SlotPage />
      )}
    </div>
  );
}

export function SchedulePage() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await getAllSchedules();
        setSchedules(response.data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    }
    fetchSchedules();
  }, []);

  if (showForm) return <Schedule setShowForm={setShowForm} />;
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl">Schedule</h1>
        <Button
          variant="default"
          size="lg"
          className="text-lg"
          onClick={() => setShowForm(true)}
        >
          Create new Schedule
        </Button>
      </div>
      <div className="flex flex-col ">
        {schedules.length === 0 && (
          <h1 className="text-3xl text-center">No schedules found</h1>
        )}
        {schedules.map((schedule: ScheduleType, index) => (
          <ScheduleCard index={index} schedule={schedule} key={index} />
        ))}
      </div>
    </div>
  );
}

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function ScheduleCard({
  schedule,
  index,
}: {
  schedule: ScheduleType;
  index: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [turf, setTurf] = useState<Turf[]>([]);
  const [turfId, setTurfId] = useState<string>("");
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTurf() {
      try {
        setLoading(true);
        const response = await getTurfs();
        setTurf(response?.data);
      } catch (error) {
        console.error("Error during GET request:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTurf();
  }, []);

  async function handleCreateSlot() {
    try {
      // setLoading(true);
      const data = {
        turfId,
        startDate: date.from,
        endDate: date.to,
        scheduleId: schedule?._id,
      };
      const response = await createSlots(data);
      toast({
        title: "Success",
        description: response.message,
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex flex-col justify-between border mb-4 p-4 rounded-md cursor-pointer"
      onClick={() => navigate(`/Slot/${schedule._id}`)}
    >
      <div className="flex justify-between">
        <h1 className="text-xl">Schedule {index + 1}</h1>
        <div className="flex gap-4">
          <AlertDialog open={open} onOpenChange={() => setOpen(true)}>
            <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
              Create Slots
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-2">
                  Create Slots
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <h1>Turf</h1>
                  <Select onValueChange={(value) => setTurfId(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Turf" />
                    </SelectTrigger>
                    <SelectContent>
                      {turf.map((item, index) => (
                        <SelectItem key={index} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <h1>Select Date Range</h1>
                  <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    className={""}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={handleCreateSlot}>
                  {loading ? <Loader /> : <h1>Continue</h1>}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline">Active Slots</Button>
        </div>
      </div>
      <div className="flex gap-4">
        {weekDays.map((day) => {
          return (
            <div key={day}>
              {schedule[day].length > 0 && (
                <div>
                  <h1>{day.slice(0, 3)}</h1>
                  <p>{schedule[day].length}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}