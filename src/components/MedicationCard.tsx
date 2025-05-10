
import { Card } from "@/components/ui/card";
import { Medication, DAYS_SHORT } from "@/types/medication";
import { Pill } from "lucide-react";
import { Link } from "react-router-dom";

interface MedicationCardProps {
  medication: Medication;
}

export const MedicationCard = ({ medication }: MedicationCardProps) => {
  const nextDoseTime = () => {
    if (medication.schedule.length === 0) return "No schedule set";
    
    const today = new Date().getDay();
    // Find schedules for today
    const todaySchedules = medication.schedule.filter(schedule => 
      schedule.active && schedule.days.includes(today)
    );
    
    if (todaySchedules.length === 0) return "No doses today";
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Find the next dose time
    for (const schedule of todaySchedules) {
      const [hour, minute] = schedule.time.split(':').map(Number);
      if (hour > currentHour || (hour === currentHour && minute > currentMinute)) {
        return `Next dose: ${formatTime(schedule.time)}`;
      }
    }
    
    return "All doses taken for today";
  };
  
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };
  
  const activeDays = () => {
    if (medication.schedule.length === 0) return "";
    
    const allDays = medication.schedule.flatMap(schedule => schedule.days);
    const uniqueDays = [...new Set(allDays)].sort();
    
    if (uniqueDays.length === 7) return "Every day";
    
    return uniqueDays.map(day => DAYS_SHORT[day]).join(', ');
  };

  return (
    <Link to={`/medication/${medication.id}`}>
      <Card className={`p-4 med-card cursor-pointer border-l-4 ${medication.color || "border-med-blue-500"}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.dosage}</p>
            <p className="text-xs text-gray-500 mt-1">{activeDays()}</p>
          </div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${medication.color || "bg-med-blue-100 text-med-blue-600"}`}>
            <Pill className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium">{nextDoseTime()}</p>
          <div className="mt-2 flex items-center">
            <div className="h-1.5 bg-gray-200 rounded-full flex-grow">
              <div 
                className={`h-full ${medication.color || "bg-med-blue-500"} rounded-full`}
                style={{ width: `${(medication.inventory / 60) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">{medication.inventory} left</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
