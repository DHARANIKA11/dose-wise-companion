
import { useMedication } from "@/context/MedicationContext";
import { DAYS_SHORT } from "@/types/medication";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { Pill } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const DailySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { medications } = useMedication();
  
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const dateString = useMemo(() => {
    return format(selectedDate, "EEEE, MMMM d");
  }, [selectedDate]);
  
  const dayOfWeek = selectedDate.getDay();
  
  const scheduledMedications = useMemo(() => {
    // Filter medications scheduled for the selected day
    const medsForDay = medications.filter(med => 
      med.schedule.some(schedule => 
        schedule.active && schedule.days.includes(dayOfWeek)
      )
    );
    
    // Create a timeline of medication events
    const timelineEvents: {
      time: string;
      medications: typeof medications;
    }[] = [];
    
    // Collect all unique times
    const allTimes = new Set<string>();
    medsForDay.forEach(med => {
      med.schedule.forEach(schedule => {
        if (schedule.active && schedule.days.includes(dayOfWeek)) {
          allTimes.add(schedule.time);
        }
      });
    });
    
    // Sort times chronologically
    const sortedTimes = Array.from(allTimes).sort();
    
    // Create timeline events
    sortedTimes.forEach(time => {
      const medsAtThisTime = medsForDay.filter(med => 
        med.schedule.some(schedule => 
          schedule.active && 
          schedule.days.includes(dayOfWeek) && 
          schedule.time === time
        )
      );
      
      timelineEvents.push({
        time,
        medications: medsAtThisTime
      });
    });
    
    return timelineEvents;
  }, [medications, dayOfWeek]);
  
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const isPast = (time: string) => {
    const now = new Date();
    const today = new Date();
    
    if (selectedDate.getDate() !== today.getDate() || 
        selectedDate.getMonth() !== today.getMonth() || 
        selectedDate.getFullYear() !== today.getFullYear()) {
      return selectedDate < today;
    }
    
    const [hour, minute] = time.split(':').map(Number);
    return (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() > minute));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousDay}>
          <span className="sr-only">Previous day</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
        <div className="text-center">
          <h2 className="font-semibold text-lg">{dateString}</h2>
          <Button variant="ghost" size="sm" onClick={goToToday} className="text-xs">
            Today
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={goToNextDay}>
          <span className="sr-only">Next day</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>

      {scheduledMedications.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Calendar className="h-12 w-12 text-med-blue-300" />
            <h3 className="font-medium text-lg">No Medications Scheduled</h3>
            <p className="text-sm text-gray-500">
              There are no medications scheduled for {DAYS_SHORT[dayOfWeek]}.
            </p>
          </div>
        </Card>
      ) : (
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-200" />
          
          {scheduledMedications.map((event, index) => (
            <div key={index} className="ml-6 pb-8 relative">
              <div className="absolute -left-6 w-3 h-3 rounded-full bg-med-blue-500 border-2 border-white" />
              <div className={`pl-6 ${isPast(event.time) ? 'opacity-60' : ''}`}>
                <p className="font-medium text-sm">{formatTime(event.time)}</p>
                <div className="mt-2 space-y-3">
                  {event.medications.map(med => (
                    <Card key={med.id} className={`p-3 border-l-4 ${med.color || "border-med-blue-500"}`}>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${med.color || "bg-med-blue-500"}`}>
                          <Pill className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-500">{med.dosage}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
