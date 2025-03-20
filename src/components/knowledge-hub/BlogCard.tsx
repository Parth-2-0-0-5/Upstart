
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  trending: boolean;
}

interface BlogCardProps {
  blog: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 w-full">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="h-full w-full object-cover" 
        />
        {blog.trending && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </div>
        )}
        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-medium">
          {blog.category}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
        <CardDescription className="text-xs flex items-center justify-between mt-1">
          <span>By {blog.author}</span>
          <span>{blog.date}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <BookOpen className="w-3 h-3 mr-1" />
          {blog.readTime}
        </div>
        <Button variant="link" className="p-0 h-auto">Read More</Button>
      </CardFooter>
    </Card>
  );
};
