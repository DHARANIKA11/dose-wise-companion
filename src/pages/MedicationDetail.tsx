
import { useMedication } from "@/context/MedicationContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { DAYS_OF_WEEK } from "@/types/medication";
import { 
  Calendar,
  Clock, 
  Edit2,
  Pill, 
  Trash2
} from "lucide-react";

const MedicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getMedicationById, deleteMedication } = useMedication();
  const navigate = useNavigate();
  
  const medication = id ? getMedicationById(id) : undefined;
  
  if (!medication) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Medication not found</h2>
        <p className="text-gray-600 mt-2 mb-6">
          The medication you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate("/medications")}>
          Back to Medications
        </Button>
      </div>
    );
  }
  
  const handleDelete = () => {
    deleteMedication(medication.id);
    navigate("/medications");
  };
  
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{medication.name}</h2>
          <p className="text-gray-600">{medication.dosage}</p>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/medication/${medication.id}/edit`}>
            <Button variant="outline">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Medication</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {medication.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Medication Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="font-medium">{medication.name}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Dosage</p>
              <p>{medication.dosage}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Instructions</p>
              <p>{medication.instructions || "No specific instructions"}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Inventory</p>
              <div className="flex items-center">
                <div className="h-2 bg-gray-200 rounded-full flex-grow mr-3">
                  <div 
                    className={`h-full ${medication.color || "bg-med-blue-500"} rounded-full`}
                    style={{ width: `${(medication.inventory / 60) * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium">{medication.inventory} left</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Added on</p>
              <p>{new Date(medication.createDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Schedule
            </CardTitle>
            <CardDescription>
              When you take this medication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medication.schedule.map((schedule, i) => (
              <div key={i} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <p className="font-medium">{formatTime(schedule.time)}</p>
                  <span className={`text-sm ${schedule.active ? "text-med-green-500" : "text-gray-400"}`}>
                    {schedule.active ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {DAYS_OF_WEEK.map((day, index) => (
                    <div
                      key={day}
                      className={`text-xs px-2 py-1 rounded-md ${
                        schedule.days.includes(index)
                          ? `${medication.color} text-white` || "bg-med-blue-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {medication.schedule.length === 0 && (
              <div className="text-center py-6">
                <Calendar className="h-10 w-10 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-2">No schedule set</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicationDetail;
