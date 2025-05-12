
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProBadge } from "@/components/ui/pro-badge";
import { Award, BarChart, Brain, Puzzle } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const assessments = [
  {
    id: 1,
    title: "Myers-Briggs Type Indicator (MBTI)",
    description: "Discover your personality type and how you perceive the world and make decisions.",
    duration: "20-30 minutes",
    questions: 93,
    icon: <Brain className="h-8 w-8 text-primary" />,
    status: "completed",
    progress: 100,
    result: "INTJ - The Architect"
  },
  {
    id: 2,
    title: "Strong Interest Inventory",
    description: "Identify your interests and match them with potential career paths.",
    duration: "25-35 minutes",
    questions: 120,
    icon: <BarChart className="h-8 w-8 text-primary" />,
    status: "in-progress",
    progress: 60,
    result: null
  },
  {
    id: 3,
    title: "Big Five Personality Test",
    description: "Measure the five major dimensions of personality: openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
    duration: "15-20 minutes",
    questions: 60,
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    status: "not-started",
    progress: 0,
    result: null
  }
];

const Assessments = () => {
  const handleStartTest = (id: number) => {
    toast.success(`Starting assessment ${id}`);
    // In a real app, redirect to assessment
  };
  
  const handleContinueTest = (id: number) => {
    toast.success(`Continuing assessment ${id}`);
    // In a real app, redirect to assessment
  };
  
  const handleViewResults = (id: number) => {
    toast.success(`Viewing results for assessment ${id}`);
    // In a real app, show results
  };

  return (
    <DashboardLayout 
      sidebar={<StudentSidebar />}
      pageTitle="PRO Assessments"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Career Assessments
              <ProBadge className="ml-2" />
            </h2>
            <p className="text-gray-500">
              Take professional assessments to better understand your personality and career interests
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  {assessment.icon}
                </div>
                <CardDescription>{assessment.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-0">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Duration: {assessment.duration}</span>
                  <span>{assessment.questions} questions</span>
                </div>
                
                <div className="space-y-3">
                  <Progress value={assessment.progress} />
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      {assessment.status === "completed" ? "Completed" : 
                       assessment.status === "in-progress" ? `${assessment.progress}% Complete` : 
                       "Not Started"}
                    </span>
                    {assessment.result && (
                      <span className="text-primary font-medium">{assessment.result}</span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                {assessment.status === "not-started" && (
                  <Button 
                    className="w-full" 
                    onClick={() => handleStartTest(assessment.id)}
                  >
                    Start Assessment
                  </Button>
                )}
                
                {assessment.status === "in-progress" && (
                  <Button 
                    className="w-full" 
                    onClick={() => handleContinueTest(assessment.id)}
                  >
                    Continue Assessment
                  </Button>
                )}
                
                {assessment.status === "completed" && (
                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={() => handleViewResults(assessment.id)}
                  >
                    View Detailed Results
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Why Take Career Assessments?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Career assessments provide valuable insights into your personality traits, interests, and strengths.
              These insights can help you make more informed decisions about your career path, identify potential
              job roles that align with your natural tendencies, and develop a deeper understanding of how you
              work best in professional settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
