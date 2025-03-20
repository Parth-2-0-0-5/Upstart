
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Brain, Network, Zap } from 'lucide-react';

const HeroSection = () => {
  const icons = [
    { icon: Brain, delay: 0 },
    { icon: Network, delay: 0.2 },
    { icon: Zap, delay: 0.4 },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32" id="hero" ref={containerRef}>
      <div className="blur-background">
        <div
          className="relative left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-full max-w-3xl"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 translate-z-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-60 blur-3xl"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className="app-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-1 rounded-full px-3 py-1 text-sm font-medium bg-foreground/5 border border-foreground/10 mb-6 reveal">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse-subtle" />
            <span className="text-xs font-medium">Now in Open Beta</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight reveal">
            AI-Powered Growth for Entrepreneurs
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-shift">
              Build, Connect, and Scale Smarter
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-foreground/80 reveal">
            Leverage AI to find the perfect mentors and investors, validate your ideas,
            and scale your business with smart tools designed for modern entrepreneurs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
            <a href="#cta" className="btn-primary w-full sm:w-auto">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#features" className="btn-secondary w-full sm:w-auto">
              <span>Explore Features</span>
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden glass-dark shadow-xl reveal">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 mix-blend-overlay"></div>
            <div className="relative h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-6">
              <div className="flex flex-wrap justify-center gap-8">
                {icons.map(({ icon: Icon, delay }, i) => (
                  <div 
                    key={i} 
                    className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-[280px] reveal"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl transform scale-75 opacity-50"></div>
                      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-full">
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {i === 0 && "AI-Powered Insights"}
                      {i === 1 && "Intelligent Networking"}
                      {i === 2 && "Accelerated Growth"}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {i === 0 && "Get data-driven recommendations and insights tailored to your business goals"}
                      {i === 1 && "Connect with the perfect mentors and investors matched by our AI"}
                      {i === 2 && "Scale faster with smart tools designed for modern entrepreneurs"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
