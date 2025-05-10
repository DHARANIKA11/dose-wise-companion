
import { DailySchedule } from "@/components/DailySchedule";

const Schedule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Medication Schedule</h2>
      <p className="text-gray-600">
        View and manage your daily medication schedule.
      </p>
      
      <div className="bg-white rounded-lg">
        <DailySchedule />
      </div>
    </div>
  );
};

export default Schedule;
