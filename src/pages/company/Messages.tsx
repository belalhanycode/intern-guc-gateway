
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanySidebar from "@/components/navigation/CompanySidebar";
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
import { Search } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  senderType: "student" | "scad" | "faculty" | "company";
  content: string;
  timestamp: Date;
  read: boolean;
}

const CompanyMessages = () => {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "SCAD Office",
      senderType: "scad",
      content: "Your company registration has been approved. You can now post internship opportunities.",
      timestamp: new Date(2025, 4, 14, 10, 30),
      read: true,
    },
    {
      id: "2",
      sender: "Ahmed Hassan",
      senderType: "student",
      content: "Hello, I have a question about the Frontend Developer intern position that I applied for last week.",
      timestamp: new Date(2025, 4, 15, 9, 45),
      read: false,
    },
    {
      id: "3",
      sender: "Dr. Mohamed Adel",
      senderType: "faculty",
      content: "We'd like to invite you to our next career day as a guest speaker. Please let us know if you're available.",
      timestamp: new Date(2025, 4, 15, 14, 20),
      read: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter((message) => 
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      sidebar={<CompanySidebar />}
      pageTitle="Messages"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <CardDescription>Manage your messages</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search messages..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  <div className={`flex ${selectedMessage.senderType !== "company" ? "justify-start" : "justify-end"}`}>
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

export default CompanyMessages;
