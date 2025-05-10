
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { User } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would update the user profile
    alert("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Profile</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-med-blue-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-med-blue-500" />
              </div>
              <h3 className="text-xl font-medium">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              
              <Button 
                variant="outline"
                className="mt-6 w-full"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>
              
              <Button type="submit">
                Save Changes
              </Button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm mt-6">
            <h3 className="text-lg font-medium mb-2">App Preferences</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customize your app experience
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notification Preferences</p>
                  <p className="text-sm text-gray-600">
                    Configure how you receive medication reminders
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accessibility Settings</p>
                  <p className="text-sm text-gray-600">
                    Adjust text size and contrast
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Adjust
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
