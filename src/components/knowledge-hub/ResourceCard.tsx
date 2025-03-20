
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Download, FileType } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  date: string;
  new: boolean;
}

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  // Function to determine icon based on file type
  const getFileIcon = (fileType: string) => {
    return <FileType className="h-10 w-10 text-primary" />;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          {getFileIcon(resource.fileType)}
          {resource.new && (
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              New
            </div>
          )}
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="text-xs mt-1">
          {resource.category} • {resource.fileType} • {resource.fileSize}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Added: {resource.date}
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};
