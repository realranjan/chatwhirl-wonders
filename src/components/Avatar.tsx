
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 'md', 
  status,
  className 
}) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base'
  };
  
  return (
    <div className="relative">
      <div className={cn(
        'rounded-full flex items-center justify-center font-medium bg-gradient-to-br from-chat-primary to-chat-secondary text-white',
        sizeClasses[size],
        className
      )}>
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <div className={cn(
          'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
          {
            'bg-green-500': status === 'online',
            'bg-red-500': status === 'busy',
            'bg-yellow-500': status === 'away',
            'bg-gray-500': status === 'offline'
          }
        )} />
      )}
    </div>
  );
};

export default Avatar;
