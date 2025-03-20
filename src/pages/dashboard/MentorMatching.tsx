
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, User, Briefcase, DollarSign, Clock, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Form schema for mentor matching
const mentorFormSchema = z.object({
  role: z.string({
    required_error: "Please select your role",
  }),
  industry: z.string({
    required_error: "Please select an industry",
  }),
  experience: z.coerce.number({
    required_error: "Please enter minimum experience required",
    invalid_type_error: "Please enter a valid number",
  }).min(0, {
    message: "Experience must be a positive number",
  }).max(50, {
    message: "Experience must be less than 50 years",
  }),
  funding: z.coerce.number({
    required_error: "Please enter minimum funding amount",
    invalid_type_error: "Please enter a valid number",
  }).min(0, {
    message: "Funding must be a positive number",
  }),
});

// Industry options
const industries = [
  { id: "tech", name: "Technology" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "energy", name: "Energy" },
  { id: "transportation", name: "Transportation" },
];

// Role options
const roles = [
  { id: "newbie", name: "Newbie" },
  { id: "intermediate", name: "Intermediate" },
  { id: "expert", name: "Expert" },
];

// Mock API function to fetch mentors
const fetchMentors = async (filters: z.infer<typeof mentorFormSchema>) => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data
  return [
    {
      id: "1",
      name: "Sarah Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&h=128&auto=format&fit=crop",
      experienceYears: 12,
      industry: "tech",
      matchScore: 92,
      description: "Former CTO at a unicorn startup with expertise in scaling technology teams.",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&h=128&auto=format&fit=crop",
      experienceYears: 8,
      industry: "finance",
      matchScore: 87,
      description: "Venture capitalist with extensive portfolio in fintech and blockchain startups.",
    },
    {
      id: "3",
      name: "Priya Patel",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=128&h=128&auto=format&fit=crop",
      experienceYears: 15,
      industry: "healthcare",
      matchScore: 95,
      description: "Healthcare innovator who has launched three successful medtech companies.",
    },
  ].filter(mentor => {
    // Apply filters
    return (
      mentor.experienceYears >= filters.experience &&
      (filters.industry === 'all' || mentor.industry === filters.industry)
    );
  });
};

const MentorMatching = () => {
  const [searchSubmitted, setSearchSubmitted] = React.useState(false);
  
  // Define form
  const form = useForm<z.infer<typeof mentorFormSchema>>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      role: "",
      industry: "",
      experience: 0,
      funding: 0,
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof mentorFormSchema>) => {
    console.log(values);
    setSearchSubmitted(true);
    refetch();
  };
  
  // Query for mentor data
  const { data: mentors, isLoading, refetch } = useQuery({
    queryKey: ['mentors', form.getValues()],
    queryFn: () => fetchMentors(form.getValues()),
    enabled: false,
  });

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Mentor Matching</h1>
        <p className="text-muted-foreground">
          Find the perfect mentor based on your startup's needs and goals. Our AI will match you with experienced
          professionals who can guide your journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card rounded-lg shadow-sm border p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps match you with an appropriate mentor
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Industries</SelectItem>
                            {industries.map((industry) => (
                              <SelectItem key={industry.id} value={industry.id}>
                                {industry.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The industry your startup operates in
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Experience (years)</FormLabel>
                        <FormControl>
                          <Input
                            type="number" 
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The minimum years of experience you're looking for
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="funding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Funding History ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum funding raised/managed in dollars
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>Searching...</>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Find My Mentor
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!searchSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <User className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Find Your Perfect Mentor</h3>
              <p className="text-muted-foreground max-w-md">
                Fill out the form to find mentors that match your needs. Our AI will analyze your requirements
                and connect you with experienced professionals.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Finding Your Matches</h3>
              <p className="text-muted-foreground">
                Our AI is analyzing your requirements to find the perfect mentors...
              </p>
            </div>
          ) : mentors && mentors.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                {mentors.length} Mentor{mentors.length === 1 ? '' : 's'} Found
              </h2>
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:bg-accent/5 transition-colors">
                  <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border flex-shrink-0">
                      <img 
                        src={mentor.avatarUrl} 
                        alt={mentor.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{mentor.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {industries.find(i => i.id === mentor.industry)?.name || mentor.industry}
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        {mentor.experienceYears} years experience
                      </CardDescription>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-sm font-medium mb-1">Match Score</div>
                      <div className="inline-flex items-center p-1 px-2 bg-green-50 text-green-700 rounded-full">
                        <Award className="h-3.5 w-3.5 mr-1" />
                        {mentor.matchScore}%
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{mentor.description}</p>
                    <div className="mt-4">
                      <div className="text-xs text-muted-foreground mb-1">Expertise Match</div>
                      <Progress value={mentor.matchScore} className="h-2" />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Profile</Button>
                    <Button className="w-full ml-2">Contact Mentor</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="text-muted-foreground mb-4 rounded-full bg-secondary p-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Mentors Found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find mentors matching your criteria. Try adjusting your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => form.reset()}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorMatching;
