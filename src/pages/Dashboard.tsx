
import { useMedication } from "@/context/MedicationContext";
import { DailySchedule } from "@/components/DailySchedule";
import { MedicationCard } from "@/components/MedicationCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { medications, isLoading } = useMedication();
  
  const getMedicationsForToday = () => {
    const today = new Date().getDay();
    return medications.filter(med => 
      med.schedule.some(schedule => schedule.active && schedule.days.includes(today))
    );
  };
  
  const todayMedications = getMedicationsForToday();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Dashboard</h2>
        <Link to="/add-medication">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </Link>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
        <DailySchedule />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Your Medications</h3>
        
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : medications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
            <h4 className="text-lg font-medium">No medications added yet</h4>
            <p className="text-gray-500 mb-4">Add your first medication to get started</p>
            <Link to="/add-medication">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medications.slice(0, 3).map((medication) => (
              <MedicationCard key={medication.id} medication={medication} />
            ))}
            
            {medications.length > 3 && (
              <div className="col-span-full text-center mt-2">
                <Link to="/medications">
                  <Button variant="link">
                    View all {medications.length} medications
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
