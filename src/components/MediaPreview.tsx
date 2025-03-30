
import React from 'react';
import { cn } from '@/lib/utils';
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react';

interface MediaPreviewProps {
  media: {
    type: 'image' | 'video' | 'file';
    url: string;
    thumbnailUrl?: string;
    fileName?: string;
    fileSize?: number;
  };
  className?: string;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ media, className }) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn(
      'max-w-xs rounded-lg overflow-hidden mb-1',
      className
    )}>
      {media.type === 'image' && (
        <div className="relative bg-secondary/50 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          <img 
            src={media.url} 
            alt={media.fileName || 'Image'} 
            className="w-full h-auto max-h-64 object-cover rounded-lg"
          />
        </div>
      )}
      
      {media.type === 'video' && (
        <div className="relative bg-secondary/50 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          {media.thumbnailUrl ? (
            <img 
              src={media.thumbnailUrl} 
              alt={media.fileName || 'Video thumbnail'} 
              className="w-full h-auto max-h-64 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-36 flex items-center justify-center bg-secondary/50 rounded-lg">
              <VideoIcon className="h-12 w-12 text-foreground/50" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-chat-primary ml-1" />
            </div>
          </div>
        </div>
      )}
      
      {media.type === 'file' && (
        <div className="bg-secondary rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-secondary/80 transition-colors">
          <div className="p-2 bg-background rounded">
            <FileIcon className="h-6 w-6 text-chat-primary" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate font-medium">{media.fileName || 'File'}</div>
            {media.fileSize && (
              <div className="text-xs text-foreground/50">{formatFileSize(media.fileSize)}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPreview;
