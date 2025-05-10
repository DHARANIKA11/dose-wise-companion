
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMedication } from "@/context/MedicationContext";
import { Medication, DAYS_OF_WEEK, MEDICATION_COLORS } from "@/types/medication";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Pill } from "lucide-react";

interface MedicationFormProps {
  existingMedication?: Medication;
}

export const MedicationForm = ({ existingMedication }: MedicationFormProps) => {
  const { addMedication, updateMedication } = useMedication();
  const navigate = useNavigate();
  
  const [name, setName] = useState(existingMedication?.name || "");
  const [dosage, setDosage] = useState(existingMedication?.dosage || "");
  const [time, setTime] = useState(existingMedication?.schedule[0]?.time || "08:00");
  const [selectedDays, setSelectedDays] = useState<number[]>(
    existingMedication?.schedule[0]?.days || [0, 1, 2, 3, 4, 5, 6]
  );
  const [instructions, setInstructions] = useState(existingMedication?.instructions || "");
  const [inventory, setInventory] = useState(existingMedication?.inventory || 30);
  const [selectedColor, setSelectedColor] = useState(existingMedication?.color || "bg-med-blue-500");

  const handleDayToggle = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !dosage || selectedDays.length === 0) {
      alert("Please fill out all required fields");
      return;
    }

    const medicationData = {
      name,
      dosage,
      schedule: [
        {
          time,
          days: selectedDays,
          active: true,
        },
      ],
      instructions,
      inventory: Number(inventory),
      color: selectedColor,
    };

    if (existingMedication) {
      updateMedication({
        ...existingMedication,
        ...medicationData,
      });
    } else {
      addMedication(medicationData);
    }

    navigate("/medications");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Medication Name</Label>
          <Input
            id="name"
            placeholder="e.g., Lisinopril"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            placeholder="e.g., 10mg"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Days of the Week</Label>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {DAYS_OF_WEEK.map((day, index) => (
              <Button
                key={day}
                type="button"
                variant={selectedDays.includes(index) ? "default" : "outline"}
                onClick={() => handleDayToggle(index)}
                className="py-1 px-0 h-auto text-xs"
              >
                {day.slice(0, 1)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Color</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {MEDICATION_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full ${color} ${
                  selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="inventory">Pills in Inventory</Label>
          <Input
            id="inventory"
            type="number"
            min="0"
            value={inventory}
            onChange={(e) => setInventory(Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="instructions">Special Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="e.g., Take with food"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {existingMedication ? "Save Changes" : "Add Medication"}
        </Button>
      </div>
    </form>
  );
};
