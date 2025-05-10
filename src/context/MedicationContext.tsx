
import React, { createContext, useContext, useState, useEffect } from "react";
import { Medication } from "@/types/medication";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface MedicationContextType {
  medications: Medication[];
  isLoading: boolean;
  addMedication: (medication: Omit<Medication, "id" | "createDate">) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  getMedicationById: (id: string) => Medication | undefined;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
};

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load medications from local storage
  useEffect(() => {
    if (user) {
      const storedMeds = localStorage.getItem(`medications-${user.id}`);
      if (storedMeds) {
        setMedications(JSON.parse(storedMeds));
      } else {
        // Add sample data for demo purposes
        const sampleMedications: Medication[] = [
          {
            id: "med1",
            name: "Vitamin D",
            dosage: "1000 IU",
            schedule: [
              {
                time: "08:00",
                days: [0, 1, 2, 3, 4, 5, 6],
                active: true,
              },
            ],
            instructions: "Take with food",
            color: "bg-yellow-500",
            inventory: 30,
            createDate: new Date().toISOString(),
          },
          {
            id: "med2",
            name: "Lisinopril",
            dosage: "10mg",
            schedule: [
              {
                time: "09:00",
                days: [0, 1, 2, 3, 4, 5, 6],
                active: true,
              },
              {
                time: "21:00",
                days: [0, 1, 2, 3, 4, 5, 6],
                active: true,
              },
            ],
            instructions: "Take with water",
            color: "bg-med-blue-500",
            inventory: 45,
            createDate: new Date().toISOString(),
          },
        ];
        setMedications(sampleMedications);
        localStorage.setItem(`medications-${user.id}`, JSON.stringify(sampleMedications));
      }
    } else {
      setMedications([]);
    }
    setIsLoading(false);
  }, [user]);

  // Save medications to local storage whenever they change
  useEffect(() => {
    if (user && medications.length > 0) {
      localStorage.setItem(`medications-${user.id}`, JSON.stringify(medications));
    }
  }, [medications, user]);

  const addMedication = (medication: Omit<Medication, "id" | "createDate">) => {
    const newMedication: Medication = {
      ...medication,
      id: `med-${Date.now()}`,
      createDate: new Date().toISOString(),
    };
    setMedications((prev) => [...prev, newMedication]);
    toast({
      title: "Medication Added",
      description: `${newMedication.name} has been added to your medications.`,
    });
  };

  const updateMedication = (medication: Medication) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === medication.id ? medication : med))
    );
    toast({
      title: "Medication Updated",
      description: `${medication.name} has been updated.`,
    });
  };

  const deleteMedication = (id: string) => {
    const medToDelete = medications.find(med => med.id === id);
    setMedications((prev) => prev.filter((med) => med.id !== id));
    if (medToDelete) {
      toast({
        title: "Medication Deleted",
        description: `${medToDelete.name} has been removed from your medications.`,
      });
    }
  };

  const getMedicationById = (id: string) => {
    return medications.find((med) => med.id === id);
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        isLoading,
        addMedication,
        updateMedication,
        deleteMedication,
        getMedicationById,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};
