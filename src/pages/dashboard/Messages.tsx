
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: 'Emily Johnson',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Entrepreneur',
    },
    lastMessage: {
      text: 'I'd love to discuss your startup idea further. When are you free for a call?',
      time: new Date(2023, 9, 25, 14, 30),
      read: true,
      sender: 'them',
    },
    unread: 0,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: 'Michael Chen',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Investor',
    },
    lastMessage: {
      text: 'Your pitch deck looks promising. Let's schedule a meeting next week.',
      time: new Date(2023, 9, 24, 10, 15),
      read: false,
      sender: 'them',
    },
    unread: 2,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: 'Sarah Williams',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      role: 'Mentor',
    },
    lastMessage: {
      text: 'Thanks for the update on your progress. I'm glad to hear things are going well.',
      time: new Date(2023, 9, 23, 16, 45),
      read: true,
      sender: 'you',
    },
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: 'James Rodriguez',
      profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
      role: 'Entrepreneur',
    },
    lastMessage: {
      text: 'Would you be interested in collaborating on a project together?',
      time: new Date(2023, 9, 22, 9, 30),
      read: true,
      sender: 'them',
    },
    unread: 0,
    isNew: true,
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    text: 'Hi there! I saw your startup profile and I'm really impressed with what you're building.',
    time: new Date(2023, 9, 24, 9, 30),
    sender: 'them',
  },
  {
    id: 2,
    text: 'Thank you! I've been working on it for about 6 months now.',
    time: new Date(2023, 9, 24, 9, 32),
    sender: 'you',
  },
  {
    id: 3,
    text: 'That's impressive progress. I'm actually an angel investor looking for opportunities in your industry.',
    time: new Date(2023, 9, 24, 9, 35),
    sender: 'them',
  },
  {
    id: 4,
    text: 'That sounds great! I'd love to share more about our traction and plans.',
    time: new Date(2023, 9, 24, 9, 38),
    sender: 'you',
  },
  {
    id: 5,
    text: 'Perfect. Could you send over your pitch deck? And maybe we can schedule a call next week?',
    time: new Date(2023, 9, 24, 9, 45),
    sender: 'them',
  },
  {
    id: 6,
    text: 'Absolutely! I'll email you the deck shortly. I'm available Monday and Tuesday afternoons for a call.',
    time: new Date(2023, 9, 24, 9, 48),
    sender: 'you',
  },
  {
    id: 7,
    text: 'Your pitch deck looks promising. Let's schedule a meeting next week.',
    time: new Date(2023, 9, 24, 10, 15),
    sender: 'them',
  },
];

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    profilePic: string;
    role: string;
  };
  lastMessage: {
    text: string;
    time: Date;
    read: boolean;
    sender: 'you' | 'them';
  };
  unread: number;
  isNew?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: Date;
  sender: 'you' | 'them';
}

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Filter conversations based on search
  const filteredConversations = mockConversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    // In a real app, you would fetch messages from the backend
    setMessages(mockMessages);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    // Add new message to the list
    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date(),
      sender: 'you',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // In a real app, you would send this message to your backend
  };
  
  const formatMessageTime = (date: Date) => {
    return format(date, 'h:mm a');
  };
  
  const formatConversationTime = (date: Date) => {
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                   date.getMonth() === now.getMonth() && 
                   date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return format(date, 'h:mm a');
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && 
                        date.getMonth() === yesterday.getMonth() && 
                        date.getFullYear() === yesterday.getFullYear();
    
    if (isYesterday) {
      return 'Yesterday';
    }
    
    return format(date, 'MMM d');
  };

  return (
    <div className="container py-6 h-[calc(100vh-9rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>
      
      <Card className="flex-grow overflow-hidden flex flex-col md:flex-row">
        {/* Conversation List */}
        <div className={cn(
          "w-full md:w-80 border-r",
          activeConversation ? "hidden md:block" : "block"
        )}>
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            ) : (
              filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-4 border-b flex items-start gap-3 cursor-pointer hover:bg-muted/50 transition-colors",
                    activeConversation?.id === conversation.id ? "bg-muted" : "",
                    conversation.unread > 0 ? "bg-primary/5" : ""
                  )}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="relative">
                    <UserAvatar user={conversation.user} size="sm" />
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{conversation.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatConversationTime(conversation.lastMessage.time)}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs mr-2">
                        {conversation.user.role}
                      </Badge>
                      {conversation.isNew && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.lastMessage.sender === 'you' ? 'You: ' : ''}
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Conversation/Chat View */}
        <div className={cn(
          "flex-grow flex flex-col",
          !activeConversation ? "hidden md:flex" : "flex"
        )}>
          {activeConversation ? (
            <>
              <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden" 
                    onClick={() => setActiveConversation(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  
                  <UserAvatar user={activeConversation.user} size="sm" />
                  
                  <div>
                    <CardTitle className="text-lg">{activeConversation.user.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {activeConversation.user.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow p-4 overflow-y-auto flex flex-col-reverse">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex",
                        message.sender === 'you' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "max-w-[75%] rounded-lg px-4 py-2",
                          message.sender === 'you' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        )}
                      >
                        <p>{message.text}</p>
                        <div 
                          className={cn(
                            "text-xs mt-1",
                            message.sender === 'you' 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          )}
                        >
                          {formatMessageTime(message.time)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <div className="p-4 border-t">
                <form 
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
              <p className="text-muted-foreground max-w-md">
                Select a conversation from the list to view messages or start a new conversation.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Messages;
