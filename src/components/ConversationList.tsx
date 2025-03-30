
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Plus, UserPlus } from 'lucide-react';
import Avatar from './Avatar';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isGroup: boolean;
  members?: {
    id: string;
    name: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  }[];
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelectConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <button className="p-2 rounded-full bg-chat-primary text-white hover:bg-chat-primary/90 transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
            <Search className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-center">No conversations match your search</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map(conv => (
              <div 
                key={conv.id}
                className={cn(
                  'conversation-item',
                  activeId === conv.id && 'conversation-item-active'
                )}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div className="relative">
                  <Avatar 
                    name={conv.name} 
                    src={conv.avatar} 
                    size="md" 
                  />
                  {conv.isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-chat-accent text-white rounded-full p-0.5">
                      <UserPlus className="h-3 w-3" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">{conv.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {conv.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="ml-2 bg-chat-primary text-white text-xs rounded-full px-1.5 py-0.5 min-w-5 text-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
