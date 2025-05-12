
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "@/components/navigation/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Send, 
  Clock, 
  CheckCircle,
  Info, 
  Paperclip,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample message data
const sampleConversations = [
  {
    id: 1,
    name: "SCAD Office",
    avatar: "SCAD",
    unread: 1,
    lastMessage: "Your internship submission has been received.",
    time: "10:45 AM",
    isActive: true,
    messages: [
      {
        id: 1,
        sender: "SCAD Office",
        text: "Hello! Your internship submission has been received. We will review it shortly.",
        time: "10:45 AM",
        isUser: false
      },
      {
        id: 2,
        sender: "SCAD Office",
        text: "Please note that we might need additional information about your company supervisor.",
        time: "10:45 AM",
        isUser: false
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Ali Hassan",
    avatar: "AH",
    unread: 0,
    lastMessage: "Your revised report looks good. I've approved it.",
    time: "Yesterday",
    isActive: false,
    messages: [
      {
        id: 1,
        sender: "You",
        text: "Hello Dr. Ali, I've submitted my revised internship report. Could you please review it when you have time?",
        time: "Yesterday, 2:30 PM",
        isUser: true
      },
      {
        id: 2,
        sender: "Dr. Ali Hassan",
        text: "I'll take a look at it today.",
        time: "Yesterday, 3:15 PM",
        isUser: false
      },
      {
        id: 3,
        sender: "Dr. Ali Hassan",
        text: "Your revised report looks good. I've approved it.",
        time: "Yesterday, 5:45 PM",
        isUser: false
      },
      {
        id: 4,
        sender: "You",
        text: "Thank you very much!",
        time: "Yesterday, 6:00 PM",
        isUser: true
      }
    ]
  },
  {
    id: 3,
    name: "Career Services",
    avatar: "CS",
    unread: 0,
    lastMessage: "Your career counseling session is scheduled for next Monday at 2 PM.",
    time: "Monday",
    isActive: false,
    messages: [
      {
        id: 1,
        sender: "Career Services",
        text: "Hello! We've received your request for a career counseling session.",
        time: "Monday, 11:20 AM",
        isUser: false
      },
      {
        id: 2,
        sender: "You",
        text: "Great! When can we schedule it?",
        time: "Monday, 11:45 AM",
        isUser: true
      },
      {
        id: 3,
        sender: "Career Services",
        text: "Your career counseling session is scheduled for next Monday at 2 PM. Does that work for you?",
        time: "Monday, 12:15 PM",
        isUser: false
      },
      {
        id: 4,
        sender: "You",
        text: "Yes, that works perfectly. Thank you!",
        time: "Monday, 12:30 PM",
        isUser: true
      },
      {
        id: 5,
        sender: "Career Services",
        text: "Great! We'll send you a reminder closer to the date.",
        time: "Monday, 12:35 PM",
        isUser: false
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
      sidebar={<StudentSidebar />}
      pageTitle="Messages"
    >
      <div className="h-[calc(100vh-120px)]">
        <Card className="h-full">
          <div className="grid md:grid-cols-[280px_1fr] h-full">
            {/* Conversations sidebar */}
            <div className="border-r h-full flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search conversations..." 
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
                      // Mark as read
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
                      <AvatarFallback className="bg-primary text-white">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate">{conversation.name}</span>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
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
                    <AvatarFallback className="bg-primary text-white">
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
