
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  senderType: "student" | "scad" | "faculty" | "company";
  content: string;
  timestamp: Date;
  read: boolean;
  category: "general" | "report" | "company" | "faculty";
}

const ScadMessages = () => {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Ahmed Hassan",
      senderType: "student",
      content: "Hello, I have a question about my internship submission. It's been a week since I submitted it.",
      timestamp: new Date(2025, 4, 14, 10, 30),
      read: true,
      category: "report",
    },
    {
      id: "2",
      sender: "Microsoft Egypt",
      senderType: "company",
      content: "We have a question about the requirements for posting internships on the platform.",
      timestamp: new Date(2025, 4, 15, 9, 45),
      read: false,
      category: "company",
    },
    {
      id: "3",
      sender: "Dr. Mohamed Adel",
      senderType: "faculty",
      content: "I'm having trouble assigning grades to the internship reports. Is there a guideline I can follow?",
      timestamp: new Date(2025, 4, 15, 14, 20),
      read: false,
      category: "faculty",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || message.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = () => {
    if (newMessageContent.trim() && selectedMessage) {
      // In a real app, we would send the message to the server
      setNewMessageContent("");
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' }) + 
             ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  return (
    <DashboardLayout
      sidebar={<ScadSidebar />}
      pageTitle="Messages"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            Messages
            <Users className="ml-2 h-5 w-5 text-primary" />
          </h2>
          <p className="text-gray-500">
            Communicate with students, faculty, and companies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <CardDescription>Manage your messages</CardDescription>
            
            <div className="flex flex-col space-y-2 mt-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="report">Report Questions</SelectItem>
                  <SelectItem value="company">Company Inquiries</SelectItem>
                  <SelectItem value="faculty">Faculty Support</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto flex-grow p-0">
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-gray-100' : ''
                  } ${!message.read ? 'border-l-4 border-blue-500' : ''}`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className={
                        message.senderType === "student" 
                          ? "bg-blue-500" 
                          : message.senderType === "scad" 
                            ? "bg-purple-500" 
                            : message.senderType === "faculty"
                              ? "bg-amber-500"
                              : "bg-green-500"
                      }>
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="font-medium text-sm truncate">{message.sender}</p>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col h-full">
          {selectedMessage ? (
            <>
              <CardHeader className="px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className={
                      selectedMessage.senderType === "student" 
                        ? "bg-blue-500" 
                        : selectedMessage.senderType === "scad" 
                          ? "bg-purple-500" 
                          : selectedMessage.senderType === "faculty"
                            ? "bg-amber-500"
                            : "bg-green-500"
                    }>
                      {selectedMessage.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.sender}</CardTitle>
                    <CardDescription>
                      {selectedMessage.senderType === "student" 
                        ? "Student" 
                        : selectedMessage.senderType === "scad" 
                          ? "SCAD Office" 
                          : selectedMessage.senderType === "faculty"
                            ? "Faculty Member"
                            : "Company Representative"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 overflow-y-auto flex-grow">
                <div className="space-y-4">
                  <div className={`flex ${selectedMessage.senderType !== "scad" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      selectedMessage.senderType === "student" 
                        ? "bg-blue-100" 
                        : selectedMessage.senderType === "scad" 
                          ? "bg-purple-100" 
                          : selectedMessage.senderType === "faculty"
                            ? "bg-amber-100"
                            : "bg-green-100"
                    }`}>
                      <p className="text-sm">{selectedMessage.content}</p>
                      <span className="block text-xs text-gray-500 mt-1">
                        {formatDate(selectedMessage.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="p-4 border-t mt-auto">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="resize-none"
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">Select a conversation</h3>
                <p className="text-gray-500">Choose a message to view the conversation</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScadMessages;
