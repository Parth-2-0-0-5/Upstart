import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Rocket, ArrowRight, Link, GitBranch, Activity } from 'lucide-react';
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Form schema for business validation
const businessFormSchema = z.object({
  businessIdea: z.string({
    required_error: "Please describe your business idea",
  }).min(10, {
    message: "Business idea should be at least 10 characters",
  }),
  stage: z.string({
    required_error: "Please select your progress stage",
  }),
  budget: z.coerce.number({
    required_error: "Please enter your budget",
    invalid_type_error: "Please enter a valid number",
  }).min(0, {
    message: "Budget must be a positive number",
  }),
  industry: z.string({
    required_error: "Please select an industry",
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

// Stages
const stages = [
  { id: "ideation", name: "Ideation" },
  { id: "prototype", name: "Prototype" },
  { id: "mvp", name: "MVP" },
  { id: "scaling", name: "Scaling" },
  { id: "established", name: "Established" },
];

// Hardcoded business validation results
const hardcodedResults = {
  "Recommended_Roadmap": [
    {
      "Step_Name": "Market Research",
      "Step_Description": "Identify target customers, competitors, and trends.",
      "Sequence_Order": 1,
      "Dependencies": []
    },
    {
      "Step_Name": "Prototype Development",
      "Step_Description": "Build an MVP for testing.",
      "Sequence_Order": 2,
      "Dependencies": ["Market Research"]
    },
    {
      "Step_Name": "Seek Funding",
      "Step_Description": "Pitch to investors.",
      "Sequence_Order": 3,
      "Dependencies": ["Prototype Development"]
    }
  ],
  "Confidence_Score": 0.8564548228499196
};

// Mock API function to validate business - now returns hardcoded results
const validateBusiness = async (data: z.infer<typeof businessFormSchema>) => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Convert hardcoded results to the format expected by the UI
  const confidenceScore = Math.round(hardcodedResults.Confidence_Score * 100);
  
  return {
    confidenceScore,
    roadmap: hardcodedResults.Recommended_Roadmap.map((step, index) => ({
      id: (index + 1).toString(),
      title: step.Step_Name,
      description: step.Step_Description,
      timeframe: `${2 + index}-${4 + index} weeks`,
      completed: index === 0 // First step is completed
    })),
    dependencies: [
      {
        id: "1",
        from: "1",
        to: "2",
        description: "Market research must inform prototype development"
      },
      {
        id: "2",
        from: "2",
        to: "3",
        description: "Prototype must be developed before seeking funding"
      }
    ],
  };
};

const BusinessValidator = () => {
  const [validationSubmitted, setValidationSubmitted] = React.useState(false);
  
  // Define form
  const form = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessIdea: "",
      stage: "",
      budget: 0,
      industry: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof businessFormSchema>) => {
    console.log(values);
    setValidationSubmitted(true);
    refetch();
  };
  
  // Query for validation data
  const { data: validationResults, isLoading, refetch } = useQuery({
    queryKey: ['businessValidation', form.getValues()],
    queryFn: () => validateBusiness(form.getValues()),
    enabled: false,
  });

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Business Validator</h1>
        <p className="text-muted-foreground">
          Validate your business idea and get a step-by-step roadmap to success. Our AI will analyze your startup
          and provide recommendations tailored to your specific industry and stage.
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
                    name="businessIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Idea</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your business idea in detail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a clear description of your business idea
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your current stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage.id} value={stage.id}>
                                {stage.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Your startup's current development stage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number" 
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your available budget in dollars
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
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>Validating...</>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4 mr-2" />
                        Validate My Business
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!validationSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <Rocket className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Validate Your Business Idea</h3>
              <p className="text-muted-foreground max-w-md">
                Fill out the form to receive a personalized roadmap and validation of your business idea. 
                Our AI will analyze your inputs and provide strategic guidance.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your Business</h3>
              <p className="text-muted-foreground">
                Our AI is evaluating your business idea and creating a personalized roadmap...
              </p>
            </div>
          ) : validationResults ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Business Validation Results</span>
                    <div className="inline-flex items-center p-1 px-3 bg-blue-50 text-blue-700 rounded-full text-sm">
                      <Activity className="h-4 w-4 mr-2" />
                      Confidence Score: {validationResults.confidenceScore}%
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Based on your inputs, our AI has analyzed your business idea and created the following recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Overall Confidence Score</div>
                    <div className="relative pt-1">
                      <Progress value={validationResults.confidenceScore} className="h-4" />
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span>Low Viability</span>
                        <span>High Viability</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="roadmap" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="roadmap" className="flex-1">Recommended Roadmap</TabsTrigger>
                  <TabsTrigger value="dependencies" className="flex-1">Dependencies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roadmap" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Step-by-Step Roadmap</CardTitle>
                      <CardDescription>
                        Follow this roadmap to develop and grow your business successfully.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {validationResults.roadmap.map((step, index) => (
                          <div 
                            key={step.id}
                            className={`relative pl-10 pb-8 ${
                              index === validationResults.roadmap.length - 1 ? 'pb-0' : ''
                            }`}
                          >
                            {index !== validationResults.roadmap.length - 1 && (
                              <div className="absolute left-4 top-10 h-full w-0.5 -ml-px bg-muted"></div>
                            )}
                            
                            <div className={`absolute left-0 rounded-full w-8 h-8 flex items-center justify-center ${
                              step.completed 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {step.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            
                            <div className="bg-accent/20 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-base">{step.title}</h3>
                                <span className="text-xs bg-accent/30 rounded-full px-2 py-1">
                                  {step.timeframe}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="dependencies" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dependencies & Relationships</CardTitle>
                      <CardDescription>
                        Understanding how different steps depend on each other is crucial for planning.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dependency</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {validationResults.dependencies.map((dependency) => {
                            const fromStep = validationResults.roadmap.find(step => step.id === dependency.from);
                            const toStep = validationResults.roadmap.find(step => step.id === dependency.to);
                            
                            return (
                              <TableRow key={dependency.id}>
                                <TableCell className="font-medium">
                                  <div className="inline-flex items-center">
                                    <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {`DEP-${dependency.id}`}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex items-center">
                                    <GitBranch className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {fromStep?.title}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex items-center">
                                    <ArrowRight className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {toStep?.title}
                                  </div>
                                </TableCell>
                                <TableCell>{dependency.description}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setValidationSubmitted(false)}>
                  Edit Business Details
                </Button>
                <Button className="ml-2">
                  <span>Download Report</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="text-muted-foreground mb-4 rounded-full bg-secondary p-4">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Results</h3>
              <p className="text-muted-foreground max-w-md">
                Please fill out the form to receive a business validation and roadmap.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessValidator;
