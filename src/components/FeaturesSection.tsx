
import React, { useEffect, useRef } from 'react';
import { Brain, Users, Book, Rocket, Lock, Network, Lightbulb, FileCheck, Zap, Server, Sliders } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  index: number;
}) => {
  return (
    <div 
      className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-md reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Mentor Matching",
      description: "Find the perfect mentors based on your industry, goals, and learning style."
    },
    {
      icon: Users,
      title: "Investor Connect",
      description: "Get matched with investors who have funded similar businesses in your space."
    },
    {
      icon: Book,
      title: "Knowledge Hub",
      description: "Access AI-curated resources, guides, and case studies tailored to your business."
    },
    {
      icon: Lightbulb,
      title: "Idea Validation",
      description: "Test your business concepts against market data and get AI feedback."
    },
    {
      icon: FileCheck,
      title: "Pitch Deck Analyzer",
      description: "Receive instant feedback on your investor presentations before the big meeting."
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with entrepreneurs from around the world in your industry."
    },
    {
      icon: Sliders,
      title: "Business Analytics",
      description: "Track key metrics and get AI insights on improving performance."
    },
    {
      icon: Server,
      title: "Competitor Analysis",
      description: "Understand market positioning with AI-powered competitive intelligence."
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "End-to-end encryption and enterprise-grade security for your sensitive data."
    },
    {
      icon: Zap,
      title: "Growth Tools",
      description: "Access specialized tools designed to accelerate your business growth."
    },
    {
      icon: Rocket,
      title: "Launch Support",
      description: "Get specialized guidance for your startup's critical launch phase."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('reveal-visible');
              }, i * 80);
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
    <section className="section-padding bg-gradient-to-b from-white to-secondary/30" id="features" ref={sectionRef}>
      <div className="app-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill bg-primary/10 text-primary mb-4 reveal">Key Platform Features</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-foreground/70 reveal">
            Our AI-powered platform provides all the tools, connections, and insights entrepreneurs
            need to build and scale successful businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
