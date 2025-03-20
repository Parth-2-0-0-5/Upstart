import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, BarChart2, ArrowRight, HelpCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ValuationFormValues {
  industry: string;
  revenue: number;
  fundingStage: string;
  investorsCount: number;
  fundingReceived: number;
}

const ValuationCalculator = () => {
  const { toast } = useToast();
  const [valuation, setValuation] = useState<number | null>(null);
  const [multiplierFactors, setMultiplierFactors] = useState<Record<string, number>>({
    'SaaS': 10,
    'FinTech': 8,
    'E-commerce': 4,
    'Healthcare': 7,
    'CleanTech': 6,
    'AI & ML': 12,
    'Consumer Products': 3,
    'Marketplace': 5,
    'EdTech': 5,
    'Other': 4,
  });
  
  const form = useForm<ValuationFormValues>({
    defaultValues: {
      industry: '',
      revenue: 0,
      fundingStage: '',
      investorsCount: 0,
      fundingReceived: 0,
    },
  });
  
  // Hardcoded valuation result
  const hardcodedValuation = 3500000;
  
  const onSubmit = (data: ValuationFormValues) => {
    // Use hardcoded valuation instead of calculating
    setValuation(hardcodedValuation);
    
    // Show success toast
    toast({
      title: 'Valuation Calculated',
      description: `Your startup's estimated valuation is $${hardcodedValuation.toLocaleString()}.`,
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container py-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Valuation Calculator</h1>
          <p className="text-muted-foreground mt-1">
            Estimate your startup's valuation based on key metrics
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Valuation Inputs
            </CardTitle>
            <CardDescription>
              Enter your startup's information to calculate an estimated valuation
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="CleanTech">CleanTech</SelectItem>
                          <SelectItem value="AI & ML">AI & Machine Learning</SelectItem>
                          <SelectItem value="Consumer Products">Consumer Products</SelectItem>
                          <SelectItem value="Marketplace">Marketplace</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Different industries have different valuation multipliers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue ($)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            placeholder="0" 
                            className="pl-9"
                            min={0}
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your annual revenue is a key factor in determining valuation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fundingStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current funding stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="series-b">Series B</SelectItem>
                          <SelectItem value="series-c-plus">Series C or Later</SelectItem>
                          <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="investorsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Investors Count</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            min={0}
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fundingReceived"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Funding Received ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="number" 
                              placeholder="0" 
                              className="pl-9"
                              min={0}
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Calculate Valuation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              Valuation Result
            </CardTitle>
            <CardDescription>
              Your startup's estimated valuation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center justify-center py-8">
            {valuation === null ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground mb-2">
                  Fill in the form and click "Calculate Valuation" to see your startup's estimated value.
                </p>
                <div className="text-3xl font-bold">N/A</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-3">Estimated Valuation</div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(valuation)}
                </div>
                <p className="text-sm text-muted-foreground">
                  This estimate is based on your inputs and industry standards
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full p-4 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">How is this calculated?</p>
                  <p className="text-muted-foreground">
                    This valuation is based on industry multipliers, your growth stage, revenue, funding history, and other factors that typically influence startup valuations.
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => form.reset()}>
              Reset Calculator
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Valuation Factors</CardTitle>
          <CardDescription>
            Understanding how different factors affect your startup's valuation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                Industry Multipliers
              </h3>
              <div className="text-sm text-muted-foreground">
                Different industries command different revenue multiples. Tech and SaaS companies typically have higher multiples compared to more traditional businesses.
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                {Object.entries(multiplierFactors).map(([industry, multiplier]) => (
                  <div 
                    key={industry} 
                    className={cn(
                      "py-1 px-2 rounded flex justify-between",
                      multiplier > 7 ? "bg-primary/10" : "bg-muted"
                    )}
                  >
                    <span>{industry}</span>
                    <span className="font-semibold">{multiplier}x</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                Funding Stage Impact
              </h3>
              <div className="text-sm text-muted-foreground">
                As your startup progresses through funding stages, valuation typically increases to reflect reduced risk and validated growth.
              </div>
              <div className="space-y-1 mt-2">
                {[
                  { stage: 'Pre-Seed', factor: '0.8x', description: 'Idea stage with minimal validation' },
                  { stage: 'Seed', factor: '1x', description: 'Working prototype with some traction' },
                  { stage: 'Series A', factor: '1.5x', description: 'Proven business model and growth' },
                  { stage: 'Series B', factor: '2x', description: 'Scaling operations and revenue' },
                  { stage: 'Series C+', factor: '2.5x', description: 'Established growth and market position' },
                ].map(item => (
                  <div key={item.stage} className="text-sm flex justify-between">
                    <div>
                      <span className="font-medium">{item.stage}</span>
                      <span className="text-muted-foreground ml-2">({item.description})</span>
                    </div>
                    <span className="font-semibold">{item.factor}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                Other Valuation Factors
              </h3>
              <div className="text-sm text-muted-foreground">
                Beyond revenue and industry, these factors can significantly impact your valuation:
              </div>
              <ul className="space-y-2 mt-2 text-sm">
                <li className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">1</span>
                  </div>
                  <span><span className="font-medium">Growth Rate</span>: Faster growing startups command higher multiples</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">2</span>
                  </div>
                  <span><span className="font-medium">Unit Economics</span>: Profitability per user/customer</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">3</span>
                  </div>
                  <span><span className="font-medium">Market Size</span>: Total addressable market potential</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">4</span>
                  </div>
                  <span><span className="font-medium">Team Strength</span>: Experience and track record of founders</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">5</span>
                  </div>
                  <span><span className="font-medium">Intellectual Property</span>: Patents, proprietary technology</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuationCalculator;
