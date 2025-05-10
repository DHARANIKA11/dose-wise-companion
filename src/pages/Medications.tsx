
import { useMedication } from "@/context/MedicationContext";
import { MedicationCard } from "@/components/MedicationCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Medications = () => {
  const { medications, isLoading } = useMedication();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMedications = medications.filter(
    med => med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">All Medications</h2>
        <Link to="/add-medication">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </Link>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search medications..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
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
      ) : filteredMedications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-medium">No matches found</h4>
          <p className="text-gray-500">
            Try a different search term or add a new medication
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedications.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Medications;
