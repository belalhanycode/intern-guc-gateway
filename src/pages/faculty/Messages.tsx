
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FacultySidebar from "@/components/navigation/FacultySidebar";
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

interface Message {
  id: string;
  sender: string;
  senderType: "student" | "scad" | "company";
  content: string;
  timestamp: Date;
  read: boolean;
}

const FacultyMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Sarah Hassan",
      senderType: "student",
      content: "Hello Professor, I have a question about my internship report evaluation. Could you please clarify why it was flagged?",
      timestamp: new Date(2025, 4, 14, 14, 30),
      read: true,
    },
    {
      id: "2",
      sender: "SCAD Office",
      senderType: "scad",
      content: "We've assigned you 5 new internship reports to review. Please complete your evaluations by May 25th.",
      timestamp: new Date(2025, 4, 15, 9, 45),
      read: false,
    },
    {
      id: "3",
      sender: "Omar Ahmed",
      senderType: "student",
      content: "Thank you for your feedback on my report. I've made the suggested changes and resubmitted it for your review.",
      timestamp: new Date(2025, 4, 15, 11, 20),
      read: false,
    },
    {
      id: "4",
      sender: "Microsoft Egypt",
      senderType: "company",
      content: "We'd like to invite you to our next career day as a guest speaker. Please let us know if you're available.",
      timestamp: new Date(2025, 4, 13, 15, 10),
      read: true,
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
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
  };

  const handleSendMessage = () => {
    if (newMessageContent.trim() && selectedMessage) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "You (Faculty)",
        senderType: "scad", // Using SCAD styling for faculty
        content: newMessageContent,
        timestamp: new Date(),
        read: true,
      };

      setMessages([...messages, newMessage]);
      setNewMessageContent("");
      // In a real app, we would also store this in a database
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
      sidebar={<FacultySidebar />}
      pageTitle="Messages"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <CardDescription>Manage your messages</CardDescription>
            <Input 
              placeholder="Search messages..." 
              className="mt-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                          : "Company Representative"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 overflow-y-auto flex-grow">
                <div className="space-y-4">
                  <div className={`flex ${selectedMessage.senderType !== "faculty" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      selectedMessage.senderType === "student" 
                        ? "bg-blue-100" 
                        : selectedMessage.senderType === "scad" 
                          ? "bg-purple-100" 
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

export default FacultyMessages;
