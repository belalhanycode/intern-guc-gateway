
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ScadSidebar from "@/components/navigation/ScadSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  MessageSquare, 
  Send, 
  Search, 
  User, 
  Check, 
  Clock, 
  X, 
  Flag, 
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for messages/threads
const messagesData = [
  {
    id: 1,
    student: {
      id: "49-12345",
      name: "Ahmed Hassan",
      avatar: "",
    },
    lastMessage: "I need help with my internship submission.",
    timestamp: "2025-05-10 10:30 AM",
    unread: true,
    relatedSubmission: "SUB-2025-001",
    submissionStatus: "pending" as const,
    messages: [
      {
        id: 1,
        from: "student",
        content: "Hello, I need help with my internship submission. The system is giving me an error when I try to upload my evaluation form.",
        timestamp: "2025-05-10 10:30 AM",
        read: false,
      }
    ]
  },
  {
    id: 2,
    student: {
      id: "49-12346",
      name: "Sara Mohamed",
      avatar: "",
    },
    lastMessage: "Thank you for approving my internship report.",
    timestamp: "2025-05-09 03:45 PM",
    unread: false,
    relatedSubmission: "SUB-2025-002",
    submissionStatus: "approved" as const,
    messages: [
      {
        id: 1,
        from: "student",
        content: "Hello, I'm wondering when I will get feedback on my internship report?",
        timestamp: "2025-05-08 11:20 AM",
        read: true,
      },
      {
        id: 2,
        from: "scad",
        content: "Hi Sara, your report has been reviewed and approved. You should receive an official notification soon.",
        timestamp: "2025-05-09 02:30 PM",
        read: true,
      },
      {
        id: 3,
        from: "student",
        content: "Thank you for approving my internship report.",
        timestamp: "2025-05-09 03:45 PM",
        read: true,
      }
    ]
  },
  {
    id: 3,
    student: {
      id: "49-12347",
      name: "Omar Khaled",
      avatar: "",
    },
    lastMessage: "I'd like to appeal the rejection decision.",
    timestamp: "2025-05-07 09:15 AM",
    unread: true,
    relatedSubmission: "SUB-2025-003",
    submissionStatus: "rejected" as const,
    messages: [
      {
        id: 1,
        from: "scad",
        content: "Hello Omar, your internship report has been rejected because it doesn't meet the required criteria. Please check your email for detailed feedback.",
        timestamp: "2025-05-06 04:00 PM",
        read: true,
      },
      {
        id: 2,
        from: "student",
        content: "I'd like to appeal the rejection decision. I believe my report meets all the requirements.",
        timestamp: "2025-05-07 09:15 AM",
        read: false,
      }
    ]
  },
  {
    id: 4,
    student: {
      id: "49-12348",
      name: "Nour Ahmed",
      avatar: "",
    },
    lastMessage: "When will the next submission cycle open?",
    timestamp: "2025-05-05 11:50 AM",
    unread: false,
    relatedSubmission: null,
    submissionStatus: null,
    messages: [
      {
        id: 1,
        from: "student",
        content: "When will the next submission cycle open?",
        timestamp: "2025-05-05 11:50 AM",
        read: true,
      },
      {
        id: 2,
        from: "scad",
        content: "The next submission cycle is scheduled to open on June 1st, 2025.",
        timestamp: "2025-05-05 01:20 PM",
        read: true,
      }
    ]
  },
];

const Messages = () => {
  const [threads, setThreads] = useState(messagesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const selectedThread = threads.find(t => t.id === selectedThreadId);
  
  // Filter threads based on search and status filter
  const filteredThreads = threads.filter(thread => {
    const matchesSearch = 
      thread.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || thread.submissionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const markAsRead = (threadId: number) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          unread: false,
          messages: thread.messages.map(message => ({ ...message, read: true }))
        };
      }
      return thread;
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThreadId) {
      return;
    }

    const updatedThreads = threads.map(thread => {
      if (thread.id === selectedThreadId) {
        const newMessageObj = {
          id: thread.messages.length + 1,
          from: "scad" as const,
          content: newMessage.trim(),
          timestamp: new Date().toLocaleString(),
          read: true,
        };

        return {
          ...thread,
          lastMessage: newMessage.trim(),
          timestamp: new Date().toLocaleString(),
          messages: [...thread.messages, newMessageObj]
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
    setNewMessage("");
    toast.success("Message sent");
  };

  return (
    <DashboardLayout 
      sidebar={<ScadSidebar />} 
      pageTitle="Messages"
    >
      <div className="flex flex-col h-[calc(100vh-156px)]">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Student Messages
              <MessageSquare className="ml-2 h-5 w-5 text-primary" />
            </h2>
            <p className="text-gray-500">
              View and respond to student inquiries and messages
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Message threads list */}
          <Card className="md:col-span-1 flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <CardTitle>Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {filteredThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      thread.id === selectedThreadId
                        ? "bg-primary/10 border-primary/30"
                        : thread.unread
                        ? "bg-blue-50 hover:bg-blue-100/60"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedThreadId(thread.id);
                      if (thread.unread) {
                        markAsRead(thread.id);
                      }
                    }}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-2">
                          <AvatarImage src={thread.student.avatar} />
                          <AvatarFallback>{thread.student.name.charAt(0)}{thread.student.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm flex items-center">
                            {thread.student.name}
                            {thread.unread && (
                              <span className="ml-2 h-2 w-2 bg-blue-600 rounded-full inline-block"></span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">{thread.student.id}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {thread.timestamp.split(" ")[0]}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-700 truncate">{thread.lastMessage}</p>
                    </div>
                    {thread.relatedSubmission && (
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-xs text-gray-500">{thread.relatedSubmission}</span>
                        {thread.submissionStatus && (
                          <StatusBadge status={thread.submissionStatus} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message conversation */}
          <Card className="md:col-span-2 flex flex-col h-full">
            {selectedThread ? (
              <>
                <CardHeader className="pb-2 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedThread.student.avatar} />
                        <AvatarFallback>{selectedThread.student.name.charAt(0)}{selectedThread.student.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedThread.student.name}</CardTitle>
                        <p className="text-gray-500 text-sm">{selectedThread.student.id}</p>
                      </div>
                    </div>
                    {selectedThread.relatedSubmission && (
                      <div className="text-right">
                        <p className="text-sm font-medium">{selectedThread.relatedSubmission}</p>
                        {selectedThread.submissionStatus && (
                          <StatusBadge status={selectedThread.submissionStatus} />
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto flex flex-col p-0">
                  <div className="flex-1 p-6 space-y-4">
                    {selectedThread.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.from === "scad" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.from === "scad"
                              ? "bg-primary text-primary-foreground"
                              : "bg-gray-100"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`text-xs mt-1 flex items-center ${
                              message.from === "scad" ? "text-primary-foreground/70 justify-end" : "text-gray-500"
                            }`}
                          >
                            <span>{message.timestamp}</span>
                            {message.from === "scad" && (
                              <Check className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col p-6 text-gray-500">
                <MessageCircle className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a message thread from the list to view the conversation</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
