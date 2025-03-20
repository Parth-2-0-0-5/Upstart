
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Rocket } from 'lucide-react';

const CTASection = () => {
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

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 to-white" id="cta" ref={sectionRef}>
      <div className="app-container">
        <div className="max-w-5xl mx-auto glass-dark rounded-2xl overflow-hidden">
          <div className="relative px-6 py-16 md:p-16">
            <div className="blur-gradient opacity-20 animate-pulse-subtle" aria-hidden="true">
              <div className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-20 blur-2xl"></div>
            </div>
            
            <div className="max-w-2xl mx-auto text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 reveal">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 reveal">
                Join the Future of 
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-shift">
                  AI-Powered Entrepreneurship
                </span>
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8 reveal">
                Start building your business with smart AI tools, connect with mentors and investors,
                and join a global community of forward-thinking entrepreneurs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
                <a href="#" className="btn-primary w-full sm:w-auto">
                  <span>Sign Up Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#" className="btn-secondary w-full sm:w-auto">
                  <span>Book a Demo</span>
                </a>
              </div>
              
              <p className="text-sm text-foreground/60 mt-6 reveal">
                No credit card required. Free 14-day trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
