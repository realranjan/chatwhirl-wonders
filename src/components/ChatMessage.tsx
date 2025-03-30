
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Avatar from './Avatar';
import MediaPreview from './MediaPreview';

export interface MessageType {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  isCurrentUser: boolean;
  media?: {
    type: 'image' | 'video' | 'file';
    url: string;
    thumbnailUrl?: string;
    fileName?: string;
    fileSize?: number;
  }[];
}

interface ChatMessageProps {
  message: MessageType;
  showAvatar?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  showAvatar = true
}) => {
  const { content, sender, timestamp, isCurrentUser, media } = message;
  
  return (
    <div className={cn(
      'flex items-end gap-2 mb-4 animate-slide-in',
      isCurrentUser ? 'justify-end' : 'justify-start'
    )}>
      {!isCurrentUser && showAvatar && (
        <Avatar name={sender.name} src={sender.avatar} size="sm" />
      )}
      
      <div>
        {media && media.length > 0 && (
          <div className="mb-1">
            {media.map((item, idx) => (
              <MediaPreview 
                key={idx} 
                media={item} 
                className={isCurrentUser ? 'ml-auto' : 'mr-auto'} 
              />
            ))}
          </div>
        )}
        
        <div className={cn(
          isCurrentUser ? 'chat-bubble-sent' : 'chat-bubble-received'
        )}>
          {content}
          <span className={cn(
            'text-xs block mt-1',
            isCurrentUser ? 'text-white/70' : 'text-foreground/50'
          )}>
            {format(timestamp, 'h:mm a')}
          </span>
        </div>
      </div>
      
      {isCurrentUser && showAvatar && (
        <Avatar name={sender.name} src={sender.avatar} size="sm" />
      )}
    </div>
  );
};

export default ChatMessage;
