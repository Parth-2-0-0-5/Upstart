
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full",
        scrolled ? "bg-white/80 backdrop-blur-lg border-b border-border/50 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="app-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-medium text-foreground">
            NexusAI
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          {[
            { name: 'Features', href: '#features' },
            { name: 'Network', href: '#network' },
            { name: 'Tools', href: '#tools' },
            { name: 'Knowledge Hub', href: '#knowledge' },
            { name: 'Success Stories', href: '#testimonials' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-foreground/80 hover:text-foreground">
            Sign In
          </Link>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={cn(
                "absolute block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out",
                mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out",
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out",
                mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              )}
            />
          </div>
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col p-8 pt-24 space-y-8">
            {[
              { name: 'Features', href: '#features' },
              { name: 'Network', href: '#network' },
              { name: 'Tools', href: '#tools' },
              { name: 'Knowledge Hub', href: '#knowledge' },
              { name: 'Success Stories', href: '#testimonials' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-6 space-y-4">
              <Link
                to="/login"
                className="block w-full text-center text-foreground font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
