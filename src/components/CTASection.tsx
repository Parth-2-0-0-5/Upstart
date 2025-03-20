
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    <section className="section-padding bg-gradient-to-b from-primary/10 to-primary/5" id="cta" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 reveal">
          Join the Future of AI-Powered Entrepreneurship
        </h2>
        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto reveal">
          Connect with mentors, tap into AI insights, and scale your business faster. 
          Our platform provides everything you need to succeed in today's competitive landscape.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 reveal">
          <Link to="/register" className="btn-primary">
            <span>Sign Up Now</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/login" className="btn-secondary">
            <span>Book a Demo</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 reveal">
          {[
            { number: '10,000+', label: 'Entrepreneurs' },
            { number: '2,500+', label: 'Mentors & Investors' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
