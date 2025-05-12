
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  GraduationCap, 
  Video, 
  Phone, 
  CalendarRange,
  Clock,
  UserPlus
} from "lucide-react";
import { ProBadge } from "@/components/ui/pro-badge";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Sample career mentors data
const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    role: "Career Advisor",
    specialty: "Computer Science & AI",
    availability: "Monday & Wednesday",
    image: "",
    initials: "SA"
  },
  {
    id: 2,
    name: "Eng. Tarek Hassan",
    role: "Industry Expert",
    specialty: "Software Engineering",
    availability: "Tuesday & Thursday",
    image: "",
    initials: "TH"
  },
  {
    id: 3,
    name: "Dr. Laila Mahmoud",
    role: "Academic Advisor",
    specialty: "Information Systems",
    availability: "Sunday & Tuesday",
    image: "",
    initials: "LM"
  }
];

// Sample upcoming sessions data
const upcomingSessions = [
  {
    id: 1,
    type: "Video Call",
    mentor: "Dr. Sarah Ahmed",
    date: "May 20, 2025",
    time: "2:00 PM",
    status: "confirmed"
  }
];

const CareerGuidance = () => {
  const handleScheduleCall = (mentorId: number, callType: string) => {
    toast.success(`Requested ${callType} with mentor #${mentorId}. You'll be notified when confirmed.`);
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Career Guidance"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Career Guidance
              <ProBadge className="ml-2" />
            </h2>
            <p className="text-gray-500">
              Schedule career guidance sessions with industry professionals and academics
            </p>
          </div>
        </div>
        
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Your Upcoming Sessions
            </CardTitle>
            <CardDescription>
              View your scheduled career guidance sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full 
                        ${session.type === "Video Call" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
                        {session.type === "Video Call" ? 
                          <Video className="h-5 w-5" /> : 
                          <Phone className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{session.type} with {session.mentor}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <CalendarRange className="h-3.5 w-3.5 mr-1" />
                          {session.date}
                          <span className="mx-1">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {session.time}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      session.status === "confirmed" 
                        ? "bg-green-500" 
                        : "bg-amber-500"
                    }>
                      {session.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarRange className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">You don't have any upcoming sessions</p>
                <p className="text-sm text-gray-400">Schedule a session with one of our mentors below</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Mentors */}
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-primary" />
            Available Career Mentors
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardHeader className="pb-2 flex flex-row items-center space-x-4 bg-gray-50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentor.image} />
                    <AvatarFallback className="bg-primary text-white">{mentor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.role}</CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Specialty</p>
                    <p className="font-medium">{mentor.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available On</p>
                    <p className="font-medium">{mentor.availability}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between gap-2 bg-gray-50">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleScheduleCall(mentor.id, "Voice Call")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Voice Call
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => handleScheduleCall(mentor.id, "Video Call")}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* How It Works */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">How Career Guidance Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-3">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Choose a Mentor</h4>
                  <p className="text-sm text-gray-600">Select a mentor who specializes in your area of interest</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Schedule a Session</h4>
                  <p className="text-sm text-gray-600">Choose between video calls or voice calls based on your preference</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full mr-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Receive Guidance</h4>
                  <p className="text-sm text-gray-600">Discuss your career goals, resume, interview techniques, and more</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CareerGuidance;
