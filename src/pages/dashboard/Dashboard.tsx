
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Users, FileCheck, BarChart2, Search, Calculator, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [valuation, setValuation] = useState<number | null>(null);
  
  // Simulating loading a saved valuation
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    const savedValuation = 2400000; // $2.4M for demo
    setValuation(savedValuation);
  }, []);
  
  const tools = [
    { name: 'AI Mentor Matching', description: 'Find the perfect mentor for your startup', icon: Users, href: '/matching' },
    { name: 'Knowledge Hub', description: 'Access curated learning resources', icon: BookOpen, href: '/knowledge-hub' },
    { name: 'Business Validator', description: 'Validate your business model with AI', icon: FileCheck, href: '/business-validator' },
    { name: 'Pitch Evaluator', description: 'Get AI feedback on your pitch deck', icon: BarChart2, href: '/pitch-evaluator' },
    { name: 'Competitor Analysis', description: 'Compare your startup against competitors', icon: Search, href: '/competitor-benchmarking' },
    { name: 'Valuation Calculator', description: 'Estimate your startup\'s valuation', icon: Calculator, href: '/valuation-calculator' },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Upstart! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your startup today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Startup Valuation</CardTitle>
            <CardDescription>Estimated value based on metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{valuation ? formatCurrency(valuation) : "N/A"}</div>
            <div className="text-xs flex items-center mt-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Investor Interest</CardTitle>
            <CardDescription>Based on pitch deck analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <div className="text-xs flex items-center mt-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>3 new investor views</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mentor Match</CardTitle>
            <CardDescription>AI-suggested mentors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 New</div>
            <div className="text-xs flex items-center mt-1 text-rose-600">
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
              <span>2 pending connections</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">AI-Powered Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <Card key={i} className="hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-md bg-primary/10">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <a href={tool.href} className="text-primary hover:text-primary/80">
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
              <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-6 border rounded-lg bg-card/50">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <p className="text-muted-foreground text-sm">Your recent activity will appear here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
