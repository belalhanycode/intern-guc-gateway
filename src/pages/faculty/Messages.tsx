
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FacultySidebar from "@/components/navigation/FacultySidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Send, 
  Clock, 
  Info, 
  Paperclip,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Sample message data for faculty
const sampleConversations = [
  {
    id: 1,
    name: "SCAD Office",
    avatar: "SCAD",
    unread: 2,
    lastMessage: "New internship submissions require your review.",
    time: "10:45 AM",
    isActive: true,
    messages: [
      {
        id: 1,
        sender: "SCAD Office",
        text: "Hello Dr. Khalid! We have assigned several new internship submissions for your review.",
        time: "10:43 AM",
        isUser: false
      },
      {
        id: 2,
        sender: "SCAD Office",
        text: "Please prioritize the flagged submissions as students are waiting for feedback.",
        time: "10:45 AM",
        isUser: false
      }
    ]
  },
  {
    id: 2,
    name: "Ahmed Mohamed",
    avatar: "AM",
    unread: 0,
    lastMessage: "Thank you for reviewing my internship report.",
    time: "Yesterday",
    isActive: false,
    messages: [
      {
        id: 1,
        sender: "Ahmed Mohamed",
        text: "Hello Dr., I've revised my internship report based on your feedback. Could you please review it when you have time?",
        time: "Yesterday, 2:30 PM",
        isUser: false
      },
      {
        id: 2,
        sender: "You",
        text: "I'll look at it today and get back to you.",
        time: "Yesterday, 3:15 PM",
        isUser: true
      },
      {
        id: 3,
        sender: "Ahmed Mohamed",
        text: "Thank you for reviewing my internship report.",
        time: "Yesterday, 5:45 PM",
        isUser: false
      }
    ]
  },
  {
    id: 3,
    name: "Sarah Ali",
    avatar: "SA",
    unread: 1,
    lastMessage: "Can you explain why my internship report was flagged?",
    time: "Monday",
    isActive: true,
    messages: [
      {
        id: 1,
        sender: "Sarah Ali",
        text: "Good morning Dr., I noticed that my internship report was flagged. Could you please explain what I need to improve?",
        time: "Monday, 11:20 AM",
        isUser: false
      },
      {
        id: 2,
        sender: "You",
        text: "Hello Sarah, your report needs more details about the technical aspects of your work and how they relate to your coursework.",
        time: "Monday, 11:45 AM",
        isUser: true
      },
      {
        id: 3,
        sender: "Sarah Ali",
        text: "Can you explain why my internship report was flagged?",
        time: "Today, 9:15 AM",
        isUser: false
      }
    ]
  },
  {
    id: 4,
    name: "Mahmoud Khaled",
    avatar: "MK",
    unread: 0,
    lastMessage: "I have resubmitted my evaluation form with the company stamp.",
    time: "Last week",
    isActive: false,
    messages: [
      {
        id: 1,
        sender: "Mahmoud Khaled",
        text: "Dear professor, I have resubmitted my evaluation form with the company stamp as requested.",
        time: "Last week",
        isUser: false
      },
      {
        id: 2,
        sender: "You",
        text: "Thank you, Mahmoud. I'll review it and update your status soon.",
        time: "Last week",
        isUser: true
      }
    ]
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState(sampleConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Create a new message
    const message = {
      id: selectedConversation.messages.length + 1,
      sender: "You",
      text: newMessage.trim(),
      time: "Just now",
      isUser: true
    };
    
    // Add the message to the selected conversation
    const updatedConversations = conversations.map((convo) =>
      convo.id === selectedConversation.id
        ? {
            ...convo,
            lastMessage: message.text,
            time: "Just now",
            messages: [...convo.messages, message],
          }
        : convo
    );
    
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: message.text,
      time: "Just now",
      messages: [...selectedConversation.messages, message],
    });
    
    setNewMessage("");
    toast.success("Message sent");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout 
      sidebar={<FacultySidebar />}
      pageTitle="Messages"
    >
      <div className="h-[calc(100vh-120px)]">
        <Card className="h-full">
          <div className="grid md:grid-cols-[280px_1fr] h-full">
            {/* Conversations sidebar */}
            <div className="border-r h-full flex flex-col">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
                  </Badge>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search students..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1 px-3">
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    onClick={() => {
                      // Mark as read when clicked
                      const updatedConversations = conversations.map((c) => 
                        c.id === conversation.id 
                          ? { ...c, unread: 0 } 
                          : c
                      );
                      setConversations(updatedConversations);
                      setSelectedConversation({...conversation, unread: 0});
                    }}
                    className={`p-3 flex items-start space-x-3 rounded-md cursor-pointer mb-1 ${
                      selectedConversation.id === conversation.id 
                        ? "bg-gray-100" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className={conversation.unread > 0 ? "bg-primary text-white" : "bg-muted"}>
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className={`${conversation.unread > 0 ? "font-medium" : ""} truncate`}>{conversation.name}</span>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className={`text-sm truncate ${conversation.unread > 0 ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            {/* Messages area */}
            <div className="flex flex-col h-full">
              {/* Conversation header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-muted">
                      {selectedConversation?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation?.name}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      {selectedConversation?.isActive ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Last active: {selectedConversation?.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation?.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${message.isUser ? "bg-primary text-primary-foreground" : "bg-gray-100"} rounded-lg px-4 py-2`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">{message.sender}</span>
                          <span className="text-xs opacity-70">{message.time}</span>
                        </div>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..." 
                    className="flex-1 min-h-[50px]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
