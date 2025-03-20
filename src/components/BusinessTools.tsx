import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, FileCheck, CreditCard, BarChart, Target, LineChart } from 'lucide-react';

const ToolCard = ({ icon: Icon, title, description, active }: {
  icon: React.ElementType;
  title: string;
  description: string;
  active: boolean;
}) => {
  return (
    <div 
      className={`rounded-xl p-4 cursor-pointer transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
          : 'bg-white/70 hover:bg-white hover:shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg ${active ? 'bg-white/20' : 'bg-primary/10'} flex items-center justify-center shrink-0`}>
          <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-primary'}`} />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className={`text-xs mt-0.5 ${active ? 'text-white/80' : 'text-foreground/70'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ToolDemo = ({ activeIndex }: { activeIndex: number }) => {
  const tools = [
    {
      title: "Business Model Validator",
      description: "Analyzes your business model against market data",
      icon: FileCheck
    },
    {
      title: "Investor Sentiment Analysis",
      description: "Analyzes feedback from investor pitches",
      icon: CreditCard
    },
    {
      title: "Competitive Analysis",
      description: "Maps your position against competitors",
      icon: BarChart
    },
    {
      title: "Pitch Deck Evaluator",
      description: "AI feedback on your investor presentations",
      icon: Target
    },
    {
      title: "Startup Valuation Calculator",
      description: "Estimates your company's current value",
      icon: LineChart
    },
  ];

  const tool = tools[activeIndex];

  return (
    <div className="glass rounded-2xl p-6 h-[340px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <tool.icon className="h-5 w-5 text-primary" />
          <h3 className="font-medium">{tool.title}</h3>
        </div>
        <div className="pill bg-green-100 text-green-700">Preview</div>
      </div>

      <div className="h-[220px] bg-white/70 rounded-xl p-4 relative overflow-hidden">
        {activeIndex === 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Business Model Validator</h4>
            <div className="space-y-2">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium">Market Fit</div>
                  <div className="text-xs font-medium">78%</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium">Revenue Potential</div>
                  <div className="text-xs font-medium">85%</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium">Scalability</div>
                  <div className="text-xs font-medium">62%</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
            <div className="text-sm p-2 bg-secondary/50 rounded-lg mt-4">
              <span className="font-medium">AI Insight:</span> Your model shows strong revenue potential but consider improving scalability.
            </div>
          </div>
        )}
        
        {activeIndex === 1 && (
          <div className="space-y-4">
            <h4 className="font-medium">Investor Sentiment Analysis</h4>
            <div className="flex gap-3">
              <div className="flex-1 bg-green-100 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-600">72%</div>
                <div className="text-xs text-green-700">Positive</div>
              </div>
              <div className="flex-1 bg-yellow-100 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-600">18%</div>
                <div className="text-xs text-yellow-700">Neutral</div>
              </div>
              <div className="flex-1 bg-red-100 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-red-600">10%</div>
                <div className="text-xs text-red-700">Negative</div>
              </div>
            </div>
            <div className="text-sm p-2 bg-secondary/50 rounded-lg">
              <span className="font-medium">Top Concerns:</span> Revenue projections, market entry strategy
            </div>
            <div className="text-sm p-2 bg-secondary/50 rounded-lg">
              <span className="font-medium">Top Strengths:</span> Team experience, product innovation
            </div>
          </div>
        )}
        
        {activeIndex === 2 && (
          <div className="space-y-3">
            <h4 className="font-medium">Competitive Analysis</h4>
            <div className="relative h-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNFQkVDRjAiPjxwYXRoIGQ9Ik0yNzUgNzVIMjV2MTUwaDI1MFY3NXoiLz48cGF0aCBkPSJNMjc1IDE1MEgyNSIvPjxwYXRoIGQ9Ik0xNTAgMjI1VjsIvPjwvZz48L3N2Zz4=')] rounded-lg p-2">
              <div className="absolute left-1/4 top-1/4 w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-xs font-medium">
                Your Company
              </div>
              <div className="absolute right-1/4 top-2/3 w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-xs font-medium">
                Competitor A
              </div>
              <div className="absolute right-1/3 top-1/3 w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-xs font-medium">
                Competitor B
              </div>
            </div>
          </div>
        )}
        
        {activeIndex === 3 && (
          <div className="space-y-3">
            <h4 className="font-medium">Pitch Deck Evaluator</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>Problem Statement</span>
                <span className="pill bg-green-100 text-green-700">Strong</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Solution Clarity</span>
                <span className="pill bg-green-100 text-green-700">Strong</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Market Size</span>
                <span className="pill bg-yellow-100 text-yellow-700">Needs Detail</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Business Model</span>
                <span className="pill bg-green-100 text-green-700">Strong</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Competition</span>
                <span className="pill bg-red-100 text-red-700">Weak</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Team</span>
                <span className="pill bg-green-100 text-green-700">Strong</span>
              </div>
            </div>
          </div>
        )}
        
        {activeIndex === 4 && (
          <div className="space-y-3">
            <h4 className="font-medium">Startup Valuation Calculator</h4>
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-primary">$2.4M - $3.2M</div>
              <div className="text-xs text-foreground/70">Estimated Valuation Range</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm flex justify-between">
                <span>Revenue Multiple:</span>
                <span className="font-medium">5.3x</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>User Growth Rate:</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Market Comparables:</span>
                <span className="font-medium">3 companies</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BusinessTools = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const tools = [
    {
      title: "Business Model Validator",
      description: "Analyzes your business model against market data",
      icon: FileCheck
    },
    {
      title: "Investor Sentiment Analysis",
      description: "Analyzes feedback from investor pitches",
      icon: CreditCard
    },
    {
      title: "Competitive Analysis",
      description: "Maps your position against competitors",
      icon: BarChart
    },
    {
      title: "Pitch Deck Evaluator",
      description: "AI feedback on your investor presentations",
      icon: Target
    },
    {
      title: "Startup Valuation Calculator",
      description: "Estimates your company's current value",
      icon: LineChart
    },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('reveal-visible');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-secondary/30" id="tools" ref={sectionRef}>
      <div className="app-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill bg-primary/10 text-primary mb-4 reveal">AI-Powered Tools</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
            Smart Tools for Entrepreneurs
          </h2>
          <p className="text-lg text-foreground/70 reveal">
            Our suite of AI-powered business tools helps you make data-driven decisions,
            validate your ideas, and accelerate your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <ToolDemo activeIndex={activeToolIndex} />
          </div>
          <div className="space-y-4 reveal">
            {tools.map((tool, i) => (
              <div key={i} onClick={() => setActiveToolIndex(i)}>
                <ToolCard
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  active={i === activeToolIndex}
                />
              </div>
            ))}
            <div className="pt-4">
              <a href="#cta" className="btn-primary">
                <span>Try All Tools</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessTools;
