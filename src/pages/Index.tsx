
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pill, Calendar, Bell, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="py-6 border-b">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pill className="h-6 w-6 text-med-blue-500" />
            <span className="font-semibold text-lg">DoseWise</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Never miss a dose with your medication assistant
              </h1>
              <p className="text-lg text-gray-600">
                DoseWise keeps you on track with your medication schedule, 
                ensuring you take the right medicine at the right time, every time.
              </p>
              <div className="space-x-4">
                <Link to="/register">
                  <Button size="lg">Get Started — It's Free</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">Sign In</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-med-blue-50 rounded-3xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6 pill-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Today's Medications</h3>
                    <span className="text-sm text-gray-500">4 left</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-med-blue-50 border border-med-blue-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-med-blue-500 rounded-md flex items-center justify-center">
                          <Pill className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Vitamin D</p>
                          <p className="text-sm text-gray-500">1000 IU</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">8:00 AM</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-med-green-50 border border-med-green-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-med-green-500 rounded-md flex items-center justify-center">
                          <Pill className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Lisinopril</p>
                          <p className="text-sm text-gray-500">10mg</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-med-blue-100 rounded-full mb-4">
                <Bell className="w-6 h-6 text-med-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Schedule recurring or one-time medicine alerts that notify you when it's time for a dose.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-med-green-100 rounded-full mb-4">
                <Calendar className="w-6 h-6 text-med-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Schedule</h3>
              <p className="text-gray-600">
                View a complete timeline of your daily medication schedule at a glance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
              <p className="text-gray-600">
                Keep track of your medication inventory and never run out of essential medicines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Pill className="h-5 w-5 text-med-blue-500" />
              <span className="font-medium">DoseWise</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} DoseWise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
