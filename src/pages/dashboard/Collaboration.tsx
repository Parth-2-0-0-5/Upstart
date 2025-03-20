
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { Filter, Search, Users, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

// Mock data for collaborators
const mockCollaborators = [
  {
    id: 1,
    name: 'Emily Johnson',
    roles: ['Entrepreneur'],
    industry: 'SaaS',
    expertise: ['Product Development', 'UX Design'],
    location: 'San Francisco, CA',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    roles: ['Entrepreneur', 'Mentor'],
    industry: 'FinTech',
    expertise: ['Financial Modeling', 'Fundraising'],
    location: 'New York, NY',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    roles: ['Investor'],
    industry: 'Healthcare',
    expertise: ['Angel Investing', 'MedTech'],
    location: 'Boston, MA',
    profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'James Rodriguez',
    roles: ['Entrepreneur', 'Mentor'],
    industry: 'E-commerce',
    expertise: ['Marketing', 'Supply Chain'],
    location: 'Austin, TX',
    profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 5,
    name: 'Alex Thompson',
    roles: ['Entrepreneur'],
    industry: 'CleanTech',
    expertise: ['Sustainability', 'Operations'],
    location: 'Portland, OR',
    profilePic: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 6,
    name: 'Lisa Wong',
    roles: ['Investor', 'Mentor'],
    industry: 'AI & Machine Learning',
    expertise: ['VC Funding', 'Technical Mentorship'],
    location: 'Seattle, WA',
    profilePic: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
];

interface Collaborator {
  id: number;
  name: string;
  roles: string[];
  industry: string;
  expertise: string[];
  location: string;
  profilePic: string;
}

const Collaboration = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  
  // Filter collaborators based on search and filters
  const filteredCollaborators = mockCollaborators.filter(collaborator => {
    const matchesSearch = 
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      collaborator.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = !industryFilter || collaborator.industry === industryFilter;
    const matchesRole = !roleFilter || collaborator.roles.includes(roleFilter);
    
    return matchesSearch && matchesIndustry && matchesRole;
  });
  
  const handleConnect = (collaborator: Collaborator) => {
    toast({
      title: `Connection Request Sent`,
      description: `Your request to connect with ${collaborator.name} has been sent.`,
    });
  };

  // Get unique industries and roles for filters
  const industries = Array.from(new Set(mockCollaborators.map(c => c.industry)));
  const roles = Array.from(new Set(mockCollaborators.flatMap(c => c.roles)));

  return (
    <div className="container py-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
          <p className="text-muted-foreground mt-1">
            Find and connect with potential collaborators in your industry
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search collaborators..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filters:</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-grow">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredCollaborators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-1">No matches found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Try adjusting your search or filters to find potential collaborators.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborators.map(collaborator => (
            <Card key={collaborator.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="p-4 pb-2">
                <div className="flex gap-4">
                  <UserAvatar user={collaborator} />
                  <div>
                    <CardTitle className="text-lg">{collaborator.name}</CardTitle>
                    <CardDescription className="flex flex-wrap gap-1 mt-1">
                      {collaborator.roles.map(role => (
                        <Badge key={role} variant="outline">{role}</Badge>
                      ))}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                  <span className="text-muted-foreground font-medium">Industry:</span>
                  <span>{collaborator.industry}</span>
                  
                  <span className="text-muted-foreground font-medium">Expertise:</span>
                  <span>{collaborator.expertise.join(', ')}</span>
                  
                  <span className="text-muted-foreground font-medium">Location:</span>
                  <span>{collaborator.location}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleConnect(collaborator)}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collaboration;
