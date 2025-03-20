
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompetitorInputs {
  industry: string;
  location: string;
  pricingModel: string;
  marketPosition: string;
  revenue: string;
  employeeCount: string;
}

interface CompetitorData {
  "Business Name": string;
  "Industry": string;
  "Location": string;
  "Website": string;
  "Social Media Followers": number;
  "Avg Customer Rating": number;
  "Sentiment Score": number;
  "Pricing Model": string;
  "Market Position": string;
  "Revenue": number;
  "Employee Count": number;
}

const initialInputs: CompetitorInputs = {
  industry: '',
  location: '',
  pricingModel: '',
  marketPosition: '',
  revenue: '',
  employeeCount: ''
};

// Mock data for the competitor analysis
const generateMockCompetitors = (inputs: CompetitorInputs): CompetitorData[] => {
  // Generate random but somewhat realistic data based on inputs
  const competitors: CompetitorData[] = [];
  
  const businessNames = [
    'Healthwave Solutions', 'MedTech Innovations', 'Vitality Care', 
    'Wellness Frontier', 'CuraHealth', 'MediNova', 'LifeSpan Health',
    'RegenMed', 'BioCura', 'NexusHealth', 'PrimeVital', 'OptimaCare'
  ];
  
  const websites = [
    'healthwave.io', 'medtechinno.com', 'vitalitycare.co', 
    'wellnessfrontier.com', 'curahealth.org', 'medinova.health', 
    'lifespanhealth.net', 'regenmed.co', 'biocura.health', 
    'nexushealth.com', 'primevital.org', 'optimacare.health'
  ];
  
  const locations = [
    'San Francisco, CA', 'Boston, MA', 'New York, NY', 
    'Austin, TX', 'Seattle, WA', 'Chicago, IL', 
    'Los Angeles, CA', 'Denver, CO', 'Miami, FL',
    'Nashville, TN', 'Portland, OR', 'Atlanta, GA'
  ];
  
  const pricingModels = [
    'Subscription', 'Freemium', 'Per User', 'Tiered', 
    'Usage-Based', 'One-Time Purchase', 'Enterprise'
  ];
  
  const marketPositions = [
    'Market Leader', 'Fast-Growing', 'Innovator', 'Niche Player',
    'Challenger', 'Emerging', 'Established'
  ];
  
  // Use the inputs to generate somewhat tailored results
  const inputIndustry = inputs.industry || 'Healthcare';
  const inputLocation = inputs.location || '';
  const inputPricingModel = inputs.pricingModel || '';
  const inputMarketPosition = inputs.marketPosition || '';
  const inputRevenue = inputs.revenue ? parseInt(inputs.revenue, 10) : 0;
  const inputEmployeeCount = inputs.employeeCount ? parseInt(inputs.employeeCount, 10) : 0;
  
  for (let i = 0; i < 6; i++) {
    const revenueMultiplier = 0.7 + Math.random() * 0.6; // 70% to 130% of input
    const employeeMultiplier = 0.8 + Math.random() * 0.4; // 80% to 120% of input
    
    // Determine revenue based on input or default range
    const revenue = inputRevenue 
      ? Math.round(inputRevenue * revenueMultiplier) 
      : Math.round((5 + Math.random() * 20) * 1000000); // $5M-$25M
    
    // Determine employee count based on input or default range
    const employeeCount = inputEmployeeCount 
      ? Math.round(inputEmployeeCount * employeeMultiplier) 
      : Math.round(20 + Math.random() * 180); // 20-200 employees
    
    competitors.push({
      "Business Name": businessNames[i],
      "Industry": inputIndustry,
      "Location": inputLocation || locations[i % locations.length],
      "Website": websites[i],
      "Social Media Followers": Math.round(1000 + Math.random() * 99000),
      "Avg Customer Rating": 3.0 + Math.random() * 2.0, // 3.0-5.0
      "Sentiment Score": 0.5 + Math.random() * 0.5, // 0.5-1.0
      "Pricing Model": inputPricingModel || pricingModels[i % pricingModels.length],
      "Market Position": inputMarketPosition || marketPositions[i % marketPositions.length],
      "Revenue": revenue,
      "Employee Count": employeeCount
    });
  }
  
  return competitors;
};

const CompetitorAnalysis = () => {
  const [inputs, setInputs] = useState<CompetitorInputs>(initialInputs);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CompetitorInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const results = generateMockCompetitors(inputs);
        setCompetitors(results);
        setHasSearched(true);
        setIsLoading(false);
        
        toast({
          title: "Analysis Complete",
          description: `Found ${results.length} competitors matching your criteria.`,
        });
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing competitors. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="container py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Competitor Analysis</h1>
        <p className="text-muted-foreground">
          Compare your startup against competitors in your industry
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Analysis Parameters</CardTitle>
            <CardDescription>
              Enter details about your business to find relevant competitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                placeholder="e.g. Healthcare" 
                value={inputs.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="e.g. San Francisco, CA" 
                value={inputs.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pricingModel">Pricing Model</Label>
              <Select 
                value={inputs.pricingModel} 
                onValueChange={(value) => handleInputChange('pricingModel', value)}
              >
                <SelectTrigger id="pricingModel">
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Subscription">Subscription</SelectItem>
                  <SelectItem value="Freemium">Freemium</SelectItem>
                  <SelectItem value="Per User">Per User</SelectItem>
                  <SelectItem value="Tiered">Tiered</SelectItem>
                  <SelectItem value="Usage-Based">Usage-Based</SelectItem>
                  <SelectItem value="One-Time Purchase">One-Time Purchase</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marketPosition">Market Position</Label>
              <Select 
                value={inputs.marketPosition} 
                onValueChange={(value) => handleInputChange('marketPosition', value)}
              >
                <SelectTrigger id="marketPosition">
                  <SelectValue placeholder="Select market position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market Leader">Market Leader</SelectItem>
                  <SelectItem value="Fast-Growing">Fast-Growing</SelectItem>
                  <SelectItem value="Innovator">Innovator</SelectItem>
                  <SelectItem value="Niche Player">Niche Player</SelectItem>
                  <SelectItem value="Challenger">Challenger</SelectItem>
                  <SelectItem value="Emerging">Emerging</SelectItem>
                  <SelectItem value="Established">Established</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue ($)</Label>
              <Input 
                id="revenue" 
                placeholder="e.g. 2000000" 
                type="number"
                value={inputs.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input 
                id="employeeCount" 
                placeholder="e.g. 50" 
                type="number"
                value={inputs.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Competitors
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {!hasSearched ? (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="pt-12 pb-12 text-center">
                <BarChart2 className="mx-auto h-16 w-16 text-muted-foreground/60 mb-6" />
                <CardTitle className="text-xl mb-2">No Analysis Results Yet</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                  Fill in the analysis parameters and click "Analyze Competitors" to generate insights
                </CardDescription>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Key Metrics Overview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Competitor Metrics Overview</CardTitle>
                  <CardDescription>
                    Summary of key metrics across identified competitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Avg. Annual Revenue</div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(
                          competitors.reduce((sum, comp) => sum + comp.Revenue, 0) / competitors.length
                        )}
                      </div>
                      <div className="text-xs flex items-center mt-2 text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        <span>12% yearly growth</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Avg. Employee Count</div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          competitors.reduce((sum, comp) => sum + comp["Employee Count"], 0) / competitors.length
                        )}
                      </div>
                      <div className="text-xs flex items-center mt-2 text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        <span>8% yearly growth</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Avg. Customer Rating</div>
                      <div className="text-2xl font-bold">
                        {(
                          competitors.reduce((sum, comp) => sum + comp["Avg Customer Rating"], 0) / competitors.length
                        ).toFixed(1)}
                      </div>
                      <div className="text-xs flex items-center mt-2 text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        <span>4% improvement</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Competitor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competitors.map((competitor, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{competitor["Business Name"]}</CardTitle>
                          <CardDescription>{competitor["Market Position"]} • {competitor["Industry"]}</CardDescription>
                        </div>
                        <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {competitor["Pricing Model"]}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Location</div>
                          <div>{competitor["Location"]}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Website</div>
                          <div className="truncate">{competitor["Website"]}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Social Media</div>
                          <div>{competitor["Social Media Followers"].toLocaleString()} followers</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Customer Rating</div>
                          <div className="flex items-center">
                            {competitor["Avg Customer Rating"].toFixed(1)}
                            <span className="text-xs text-muted-foreground ml-1">/5.0</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Revenue</div>
                          <div className="flex items-center">
                            {formatCurrency(competitor["Revenue"])}
                            <div className={`text-xs ml-2 flex items-center ${
                              Math.random() > 0.4 ? "text-emerald-600" : "text-rose-600"
                            }`}>
                              {Math.random() > 0.4 ? (
                                <>
                                  <TrendingUp className="h-3 w-3 mr-0.5" />
                                  <span>{Math.floor(Math.random() * 20) + 5}%</span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-3 w-3 mr-0.5" />
                                  <span>{Math.floor(Math.random() * 10) + 1}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Employees</div>
                          <div className="flex items-center">
                            {competitor["Employee Count"]}
                            <div className={`text-xs ml-2 flex items-center ${
                              Math.random() > 0.3 ? "text-emerald-600" : "text-rose-600"
                            }`}>
                              {Math.random() > 0.3 ? (
                                <>
                                  <TrendingUp className="h-3 w-3 mr-0.5" />
                                  <span>{Math.floor(Math.random() * 15) + 5}%</span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-3 w-3 mr-0.5" />
                                  <span>{Math.floor(Math.random() * 10) + 1}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-xs text-muted-foreground mb-1">Sentiment Analysis</div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full" 
                            style={{ width: `${competitor["Sentiment Score"] * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Negative</span>
                          <span>Positive</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
