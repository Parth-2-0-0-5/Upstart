
import React, { useEffect, useRef } from 'react';
import { Shield, Lock, Key } from 'lucide-react';

const SecuritySection = () => {
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
    <section className="section-padding bg-gradient-to-b from-white to-secondary/30" ref={sectionRef}>
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3 text-center max-w-3xl mx-auto mb-8">
            <div className="pill bg-primary/10 text-primary mb-4 reveal">Security & Privacy</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
              Your Data Security Is Our Priority
            </h2>
            <p className="text-lg text-foreground/70 reveal">
              We implement industry-leading security practices to ensure your business
              information and communications are always protected.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Enterprise-Grade Security</h3>
            <p className="text-foreground/70 mb-4">
              Our platform uses the same security standards trusted by global financial institutions.
            </p>
            <ul className="space-y-2">
              {[
                "SOC 2 Type II certified",
                "Regular security audits",
                "24/7 monitoring systems"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">End-to-End Encryption</h3>
            <p className="text-foreground/70 mb-4">
              All communications and data transfers are secured with advanced encryption protocols.
            </p>
            <ul className="space-y-2">
              {[
                "256-bit AES encryption",
                "Encrypted data storage",
                "Secure API endpoints"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 reveal">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
              <Key className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Data Privacy Compliance</h3>
            <p className="text-foreground/70 mb-4">
              Our platform is fully compliant with global data protection regulations.
            </p>
            <ul className="space-y-2">
              {[
                "GDPR compliant",
                "CCPA compliant",
                "Data minimization principles"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
