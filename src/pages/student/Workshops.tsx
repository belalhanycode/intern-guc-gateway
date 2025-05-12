
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProBadge } from "@/components/ui/pro-badge";
import { 
  Calendar, 
  PlayCircle, 
  Users, 
  Clock,
  CalendarRange,
  MapPin,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Sample data for workshops
const upcomingWorkshops = [
  {
    id: 1,
    title: "Technical Interview Preparation",
    type: "In-Person",
    date: "May 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "GUC H14 Hall",
    speaker: "Eng. Ahmed Samy, Google Egypt",
    spotsLeft: 12,
    totalSpots: 30,
    description: "Learn how to excel in technical interviews at top tech companies. This workshop covers common coding problems, system design questions, and behavioral interview strategies."
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    type: "Online",
    date: "June 2, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Zoom Meeting",
    speaker: "Sara Adel, HR Manager at Microsoft",
    spotsLeft: 25,
    totalSpots: 50,
    description: "Craft a professional resume that stands out to employers. Learn how to highlight your skills, experience, and education in a way that catches the attention of recruiters."
  },
  {
    id: 3,
    title: "Introduction to AI and Machine Learning",
    type: "In-Person",
    date: "June 10, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "GUC C7.303",
    speaker: "Dr. Mohamed Hassan, AI Research Scientist",
    spotsLeft: 5,
    totalSpots: 20,
    description: "An overview of AI and machine learning fundamentals. This workshop introduces key concepts, applications, and career opportunities in the rapidly growing field of artificial intelligence."
  }
];

const recordedWorkshops = [
  {
    id: 101,
    title: "Web Development Best Practices",
    date: "April 15, 2025",
    duration: "90 minutes",
    speaker: "Eng. Kareem Saber, Senior Web Developer",
    views: 128,
    watched: true,
    thumbnail: "https://i.postimg.cc/cJHGkFrv/workshop-webdev.jpg",
    description: "Learn modern web development practices including responsive design, accessibility, performance optimization, and modern frameworks."
  },
  {
    id: 102,
    title: "Negotiating Job Offers",
    date: "March 30, 2025",
    duration: "60 minutes",
    speaker: "Nour Ibrahim, Career Coach",
    views: 95,
    watched: false,
    thumbnail: "https://i.postimg.cc/bJHGkFrz/workshop-negotiation.jpg",
    description: "How to negotiate salary, benefits, and other aspects of your job offer to secure the best compensation package possible."
  },
  {
    id: 103,
    title: "Effective Technical Communication",
    date: "March 10, 2025",
    duration: "75 minutes",
    speaker: "Dr. Laila Mohamed, Technical Writing Expert",
    views: 110,
    watched: false,
    thumbnail: "https://i.postimg.cc/kXHGkFrq/workshop-communication.jpg",
    description: "Improve your ability to communicate technical concepts clearly and effectively in both written and verbal formats."
  }
];

const Workshops = () => {
  const handleRegister = (workshopId: number) => {
    toast.success(`Successfully registered for workshop #${workshopId}`);
  };

  const handleWatchWorkshop = (workshopId: number) => {
    toast.success(`Opening workshop #${workshopId}`);
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="Workshops"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Career Development Workshops
              <ProBadge className="ml-2" />
            </h2>
            <p className="text-gray-500">
              Access exclusive workshops to enhance your professional skills
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Workshops
            </TabsTrigger>
            <TabsTrigger value="recorded" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Recorded Workshops
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingWorkshops.map((workshop) => (
              <Card key={workshop.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{workshop.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        Presented by {workshop.speaker}
                      </CardDescription>
                    </div>
                    <Badge variant={workshop.type === "In-Person" ? "default" : "outline"}>
                      {workshop.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{workshop.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{workshop.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{workshop.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{workshop.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 border-t flex justify-between items-center">
                  <div>
                    <span className="text-sm">
                      {workshop.spotsLeft} spots left out of {workshop.totalSpots}
                    </span>
                    <div className="w-36 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${(workshop.spotsLeft / workshop.totalSpots) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleRegister(workshop.id)}>
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary">About Workshop Registration</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Registration is on a first-come, first-served basis. You'll receive a confirmation email 
                      with additional details once registered. For in-person workshops, please arrive 15 minutes 
                      early with your GUC ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recorded" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recordedWorkshops.map((workshop) => (
                <Card key={workshop.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={workshop.thumbnail || "https://via.placeholder.com/400x225"}
                        alt={workshop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-3">
                          <PlayCircle className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      {workshop.watched && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Watched
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{workshop.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{workshop.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{workshop.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{workshop.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full"
                      onClick={() => handleWatchWorkshop(workshop.id)}
                      variant={workshop.watched ? "outline" : "default"}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      {workshop.watched ? "Watch Again" : "Start Watching"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <CalendarRange className="h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Workshop Archive Policy</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Recorded workshops remain available for 6 months after the event. You can watch them 
                      as many times as you need during this period. New recordings are added regularly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Workshops;
