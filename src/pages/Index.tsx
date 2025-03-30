
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import ConversationList from '@/components/ConversationList';
import ChatInterface from '@/components/ChatInterface';
import { MessageType } from '@/components/ChatMessage';
import { cn } from '@/lib/utils';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Did you see the latest design?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    isGroup: false,
    members: [
      {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'online' as const
      }
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    lastMessage: 'Alex: I\'ll prepare the mockups',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    isGroup: true,
    members: [
      {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'online' as const
      },
      {
        id: 'user3',
        name: 'Alex Turner',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        status: 'online' as const
      },
      {
        id: 'user4',
        name: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
        status: 'offline' as const
      }
    ]
  },
  {
    id: '3',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Thanks for your help yesterday!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    isGroup: false,
    members: [
      {
        id: 'user5',
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'offline' as const
      }
    ]
  },
  {
    id: '4',
    name: 'Project Brainstorm',
    lastMessage: 'Meeting scheduled for tomorrow at 10 AM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: 0,
    isGroup: true,
    members: [
      {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'online' as const
      },
      {
        id: 'user5',
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'offline' as const
      },
      {
        id: 'user6',
        name: 'David Chen',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        status: 'away' as const
      }
    ]
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    lastMessage: 'Can we schedule a call next week?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 1,
    isGroup: false,
    members: [
      {
        id: 'user7',
        name: 'Lisa Anderson',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        status: 'busy' as const
      }
    ]
  }
];

const MOCK_MESSAGES: Record<string, MessageType[]> = {
  '1': [
    {
      id: '1-1',
      content: 'Hi! Did you see the latest design I sent over?',
      sender: {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isCurrentUser: false
    },
    {
      id: '1-2',
      content: 'I was thinking we could make some adjustments to the color palette.',
      sender: {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      isCurrentUser: false,
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80',
          fileName: 'design-mockup.png'
        }
      ]
    },
    {
      id: '1-3',
      content: "I haven't checked it yet, but I'll take a look right now!",
      sender: {
        id: 'user1',
        name: 'You',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      isCurrentUser: true
    }
  ],
  '2': [
    {
      id: '2-1',
      content: 'Hey team, how are we doing with the redesign?',
      sender: {
        id: 'user1',
        name: 'You',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      isCurrentUser: true
    },
    {
      id: '2-2',
      content: "I've finished the wireframes, should I share them here?",
      sender: {
        id: 'user2',
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      isCurrentUser: false
    },
    {
      id: '2-3',
      content: "Yes please! And I'll prepare the mockups based on them.",
      sender: {
        id: 'user3',
        name: 'Alex Turner',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isCurrentUser: false
    },
    {
      id: '2-4',
      content: "Great! Let's sync up tomorrow morning to finalize everything.",
      sender: {
        id: 'user1',
        name: 'You',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isCurrentUser: true
    }
  ]
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, MessageType[]>>(MOCK_MESSAGES);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Auto-login after 2 seconds in demo mode
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDemoMode) {
        setIsAuthenticated(true);
        setActiveConversation('1');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isDemoMode]);
  
  const handleLogin = (userData: any) => {
    console.log('Login data:', userData);
    setIsAuthenticated(true);
    
    // Select the first conversation with unread messages, or the first one
    const firstUnread = conversations.find(c => c.unread > 0);
    setActiveConversation(firstUnread?.id || conversations[0].id);
  };
  
  const handleSendMessage = (conversationId: string, content: string, media?: any[]) => {
    const newMessage: MessageType = {
      id: `${conversationId}-${Date.now()}`,
      content,
      sender: {
        id: 'user1',
        name: 'You',
      },
      timestamp: new Date(),
      isCurrentUser: true,
      media: media?.map(m => ({
        type: m.type,
        url: m.url,
        fileName: m.fileName,
        fileSize: m.fileSize
      }))
    };
    
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));
    
    // Update last message in conversation list
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId
        ? {
            ...conv,
            lastMessage: content || 'Sent an attachment',
            timestamp: new Date()
          }
        : conv
    ));
    
    // Simulate response after a delay in Demo mode
    if (isDemoMode && conversationId === '1') {
      setTimeout(() => {
        const responseMessage: MessageType = {
          id: `${conversationId}-${Date.now() + 1}`,
          content: "Thanks for your quick response! What do you think of the color choices?",
          sender: {
            id: 'user2',
            name: 'Emma Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          timestamp: new Date(),
          isCurrentUser: false
        };
        
        setMessages(prev => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), responseMessage]
        }));
        
        setConversations(prev => prev.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                lastMessage: "Thanks for your quick response!",
                timestamp: new Date()
              }
            : conv
        ));
      }, 3000);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F5F7FA] to-[#C3CFE2]"
      >
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-chat-primary to-chat-secondary bg-clip-text text-transparent">
              Whisper
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              A minimalist messaging platform designed for simple, beautiful conversations
            </p>
          </div>
          
          <div className="w-full flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <LoginForm onLogin={handleLogin} />
              
              <div className="text-center mt-4">
                <button 
                  className="text-sm text-muted-foreground hover:text-chat-primary transition-colors"
                  onClick={() => {
                    setIsDemoMode(true);
                  }}
                >
                  Or try the demo version
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-chat-primary to-chat-secondary opacity-10 blur-2xl rounded-full transform -translate-y-1/2"></div>
                <div className="relative bg-white/25 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611746869696-d09bce200020?w=800&q=80"
                    alt="Chat app preview" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex gap-8 justify-center items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-chat-primary mb-1">Simple</div>
              <p className="text-sm text-muted-foreground">Clean interface without distractions</p>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chat-primary mb-1">Secure</div>
              <p className="text-sm text-muted-foreground">Privacy-focused messaging</p>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chat-primary mb-1">Seamless</div>
              <p className="text-sm text-muted-foreground">Works across all your devices</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const activeChat = activeConversation 
    ? conversations.find(c => c.id === activeConversation) 
    : null;
  
  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="h-full flex">
        {/* Conversations sidebar */}
        <div className={cn(
          "w-80 border-r h-full flex-shrink-0",
          !activeConversation && "flex"
        )}>
          <ConversationList 
            conversations={conversations}
            activeId={activeConversation || undefined}
            onSelectConversation={(id) => {
              setActiveConversation(id);
              // Mark as read
              setConversations(prev => prev.map(conv => 
                conv.id === id ? { ...conv, unread: 0 } : conv
              ));
            }}
          />
        </div>
        
        {/* Chat area */}
        <div className="flex-1 h-full">
          {activeChat ? (
            <ChatInterface 
              chatId={activeChat.id}
              chatName={activeChat.name}
              chatAvatar={activeChat.avatar}
              isGroup={activeChat.isGroup}
              members={activeChat.members || []}
              messages={messages[activeChat.id] || []}
              onSendMessage={(content, media) => handleSendMessage(activeChat.id, content, media)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10.5H16M8 14.5H11M19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H8V21L12 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Whisper</h2>
              <p className="text-muted-foreground max-w-md">
                Select a conversation from the sidebar to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
