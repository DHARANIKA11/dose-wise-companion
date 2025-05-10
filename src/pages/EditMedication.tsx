
import { MedicationForm } from "@/components/MedicationForm";
import { useMedication } from "@/context/MedicationContext";
import { useParams, Navigate } from "react-router-dom";

const EditMedication = () => {
  const { id } = useParams<{ id: string }>();
  const { getMedicationById } = useMedication();
  
  const medication = id ? getMedicationById(id) : undefined;
  
  if (!medication) {
    return <Navigate to="/medications" />;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Medication</h2>
      <MedicationForm existingMedication={medication} />
    </div>
  );
};

export default EditMedication;
