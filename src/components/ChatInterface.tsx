
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreHorizontal, Smile, Paperclip, Send, Image, Mic, X } from 'lucide-react';
import Avatar from './Avatar';
import ChatMessage, { MessageType } from './ChatMessage';

interface Member {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

interface ChatInterfaceProps {
  chatId: string;
  chatName: string;
  chatAvatar?: string;
  isGroup: boolean;
  members: Member[];
  messages: MessageType[];
  onSendMessage: (content: string, media?: any[]) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatId,
  chatName,
  chatAvatar,
  isGroup,
  members,
  messages,
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map(file => {
        return {
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 'file',
          url: URL.createObjectURL(file),
          fileName: file.name,
          fileSize: file.size
        };
      });
      
      setAttachments([...attachments, ...newAttachments]);
    }
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].url);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const onlineMembers = members.filter(m => m.status === 'online');
  const onlineText = isGroup 
    ? `${onlineMembers.length} online`
    : onlineMembers.length > 0 ? 'online' : 'offline';
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={chatName} src={chatAvatar} status={isGroup ? undefined : members[0].status} />
          <div>
            <h2 className="font-semibold">{chatName}</h2>
            <p className="text-xs text-muted-foreground">{onlineText}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Image className="h-10 w-10 opacity-50" />
            </div>
            <h3 className="font-medium mb-1">No messages yet</h3>
            <p className="text-sm">Be the first to say hello!</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                showAvatar={index === 0 || messages[index - 1].sender.id !== msg.sender.id}
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-4 pt-2 pb-0 flex gap-2 overflow-x-auto">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
              {attachment.type === 'image' ? (
                <img src={attachment.url} alt="Attachment" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-xs p-1 text-center">
                  {attachment.fileName}
                </div>
              )}
              <button 
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className="p-3 border-t mt-auto">
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-2">
          <button 
            className="p-2 rounded-full hover:bg-background transition-colors"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-background transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </button>
          
          <textarea
            className="flex-1 bg-transparent resize-none outline-none max-h-24"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          
          {message.trim() ? (
            <button 
              className="p-2 bg-chat-primary text-white rounded-full hover:bg-chat-primary/90 transition-colors"
              onClick={handleSendMessage}
            >
              <Send className="h-5 w-5" />
            </button>
          ) : (
            <button className="p-2 bg-chat-primary text-white rounded-full hover:bg-chat-primary/90 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
