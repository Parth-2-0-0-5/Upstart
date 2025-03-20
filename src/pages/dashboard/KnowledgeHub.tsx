
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Download, PlusCircle, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BlogCard } from '@/components/knowledge-hub/BlogCard';
import { ResourceCard } from '@/components/knowledge-hub/ResourceCard';
import { BlogSuggestionForm } from '@/components/knowledge-hub/BlogSuggestionForm';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'How to Secure Seed Funding for Your Startup',
    description: 'Learn the essential strategies to attract seed investors and make your startup stand out.',
    author: 'Sarah Johnson',
    date: 'Oct 15, 2023',
    readTime: '8 min read',
    category: 'Funding',
    image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    trending: true
  },
  {
    id: 2,
    title: 'Building a Minimum Viable Product That Investors Love',
    description: 'Discover the key elements that make an MVP attractive to potential investors.',
    author: 'Michael Chen',
    date: 'Sep 28, 2023',
    readTime: '6 min read',
    category: 'Product Development',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    trending: true
  },
  {
    id: 3,
    title: 'Market Research Techniques for Early-Stage Startups',
    description: 'Effective methods to understand your market without breaking the bank.',
    author: 'Jennifer Lee',
    date: 'Oct 5, 2023',
    readTime: '10 min read',
    category: 'Market Research',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    trending: false
  },
  {
    id: 4,
    title: 'The Psychology of Successful Entrepreneurs',
    description: 'Understanding the mindset that drives successful startup founders.',
    author: 'David Williams',
    date: 'Oct 10, 2023',
    readTime: '7 min read',
    category: 'Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    trending: false
  },
];

// Mock data for resources
const resources = [
  {
    id: 1,
    title: 'Business Model Canvas Template',
    description: 'A comprehensive template to map out your business model effectively.',
    category: 'Business Planning',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    date: 'Oct 2, 2023',
    new: true
  },
  {
    id: 2,
    title: 'Pitch Deck Framework',
    description: 'A structured framework for creating compelling investor pitch decks.',
    category: 'Investor Relations',
    fileType: 'PPTX',
    fileSize: '5.1 MB',
    date: 'Sep 20, 2023',
    new: true
  },
  {
    id: 3,
    title: 'Financial Projections Spreadsheet',
    description: 'Excel template for creating 3-year financial projections for your startup.',
    category: 'Finance',
    fileType: 'XLSX',
    fileSize: '1.8 MB',
    date: 'Sep 15, 2023',
    new: false
  },
  {
    id: 4,
    title: 'Market Size Calculator',
    description: 'Tool for estimating your total addressable market (TAM), serviceable available market (SAM), and serviceable obtainable market (SOM).',
    category: 'Market Research',
    fileType: 'XLSX',
    fileSize: '1.2 MB',
    date: 'Aug 28, 2023',
    new: false
  },
];

const KnowledgeHub = () => {
  const [isAdmin] = useState(false); // In a real app, this would be determined by user role
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter resources based on search query
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get trending blogs
  const trendingBlogs = blogPosts.filter(blog => blog.trending);
  
  // Get new resources
  const newResources = resources.filter(resource => resource.new);

  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Hub</h1>
          <p className="text-muted-foreground mt-1">
            Discover insights, resources, and knowledge to help your startup thrive
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            type="search"
            placeholder="Search blogs and resources..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {isAdmin && (
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Content
            </Button>
          )}

          {!isAdmin && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Suggest Topic
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Suggest a Blog Topic</SheetTitle>
                  <SheetDescription>
                    Your suggestion will be reviewed by our admin team.
                  </SheetDescription>
                </SheetHeader>
                <BlogSuggestionForm />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="new">
            <Clock className="mr-2 h-4 w-4" />
            New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="blogs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeHub;
