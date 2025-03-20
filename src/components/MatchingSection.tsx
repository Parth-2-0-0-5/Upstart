
import React, { useEffect, useRef, useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';

const AIMatchingSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const matches = [
    {
      entrepreneur: {
        name: "Sarah Chen",
        role: "Fintech Startup Founder",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&h=256&auto=format&fit=crop"
      },
      mentor: {
        name: "David Park",
        role: "Former VP at Square",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
      },
      match: 92,
      desc: "AI matched Sarah with David based on industry expertise, scaling experience, and complementary skill sets."
    },
    {
      entrepreneur: {
        name: "Marcus Johnson",
        role: "E-commerce Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"
      },
      mentor: {
        name: "Lisa Wong",
        role: "Former COO at Shopify",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop"
      },
      match: 89,
      desc: "AI identified Lisa's operational experience as the perfect complement to Marcus's product vision."
    },
    {
      entrepreneur: {
        name: "Elena Rodriguez",
        role: "Health Tech Innovator",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop"
      },
      mentor: {
        name: "Dr. Michael Chen",
        role: "Healthcare VC Partner",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop"
      },
      match: 94,
      desc: "Elena's innovative technology paired with Dr. Chen's healthcare market expertise created an ideal partnership."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matches.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [matches.length]);

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
    <section className="section-padding bg-gradient-to-b from-secondary/30 to-white" id="network" ref={sectionRef}>
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="pill bg-primary/10 text-primary mb-4 reveal">AI-Powered Matching</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
              Find Your Perfect Mentors & Investors
            </h2>
            <p className="text-lg text-foreground/70 mb-6 reveal">
              Our advanced AI analyzes thousands of data points to match you with mentors
              and investors who align with your industry, goals, and growth stage.
            </p>
            <ul className="space-y-4 mb-8 reveal">
              {[
                "Personalized matches based on your specific needs",
                "Filter by industry, expertise, investment history",
                "AI learns from your feedback to improve future matches",
                "Connect directly with verified industry experts"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5 mr-3">
                    <svg className="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#cta" className="btn-primary reveal">
              <span>Start Matching</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="relative reveal">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
            <div className="relative glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">AI Match Preview</h3>
                </div>
                <div className="pill bg-green-100 text-green-700">
                  {matches[currentIndex].match}% Match
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/70 rounded-xl p-4">
                  <div className="font-medium mb-1 text-sm">Entrepreneur</div>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-border">
                      <img 
                        src={matches[currentIndex].entrepreneur.image} 
                        alt={matches[currentIndex].entrepreneur.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{matches[currentIndex].entrepreneur.name}</div>
                      <div className="text-sm text-foreground/70">{matches[currentIndex].entrepreneur.role}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 rounded-xl p-4">
                  <div className="font-medium mb-1 text-sm">Mentor</div>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-border">
                      <img 
                        src={matches[currentIndex].mentor.image} 
                        alt={matches[currentIndex].mentor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{matches[currentIndex].mentor.name}</div>
                      <div className="text-sm text-foreground/70">{matches[currentIndex].mentor.role}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-4">
                <div className="font-medium mb-1 text-sm">Match Insights</div>
                <p className="text-sm text-foreground/70">{matches[currentIndex].desc}</p>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  {matches.map((_, i) => (
                    <button
                      key={i}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        i === currentIndex ? 'bg-primary w-6' : 'bg-primary/30'
                      }`}
                      onClick={() => setCurrentIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMatchingSection;
