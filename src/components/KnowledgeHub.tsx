
import React, { useEffect, useRef } from 'react';
import { BookOpen, ArrowRight, ThumbsUp, FileText, BarChart } from 'lucide-react';

const KnowledgeHub = () => {
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

  const resources = [
    {
      icon: FileText,
      title: "Growth Strategy Guide",
      category: "Strategy",
      reads: "4.5k",
      rating: 4.8
    },
    {
      icon: BarChart,
      title: "Market Analysis Framework",
      category: "Market Research",
      reads: "3.2k",
      rating: 4.7
    },
    {
      icon: ThumbsUp,
      title: "Investor Pitch Masterclass",
      category: "Fundraising",
      reads: "6.1k",
      rating: 4.9
    }
  ];

  return (
    <section className="section-padding" id="knowledge" ref={sectionRef}>
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative reveal">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
            <div className="relative glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI-Curated Resources</h3>
              </div>

              <div className="space-y-4">
                {resources.map((resource, i) => (
                  <div key={i} className="bg-white/70 rounded-xl p-4 transition-all duration-300 hover:shadow-sm">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                        <resource.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{resource.title}</h4>
                        <div className="flex items-center text-xs text-foreground/70 mb-3">
                          <span className="pill bg-secondary text-foreground/70 mr-2">
                            {resource.category}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {resource.reads} reads
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {resource.rating}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                            style={{ width: `${(resource.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                <div className="text-sm text-foreground/70">Personalized for your business stage</div>
                <button className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  <span>View Library</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="pill bg-primary/10 text-primary mb-4 reveal">Knowledge Hub</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
              AI-Curated Learning Resources
            </h2>
            <p className="text-lg text-foreground/70 mb-6 reveal">
              Access a personalized library of business guides, case studies, and 
              courses tailored to your specific industry and growth stage.
            </p>
            <ul className="space-y-4 mb-8 reveal">
              {[
                "Personalized learning paths based on your business goals",
                "Industry-specific case studies and best practices",
                "Expert-led masterclasses on key business topics",
                "AI-generated summaries of the latest research and trends"
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
              <span>Explore Library</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
