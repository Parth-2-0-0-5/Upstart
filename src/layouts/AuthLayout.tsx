
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground p-8 flex-col justify-between">
        <div>
          <a href="/" className="flex items-center text-xl font-medium text-white">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Upstart</span>
          </a>
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Growth for Entrepreneurs</h1>
          <p className="text-lg opacity-90">Join our community of innovators and access cutting-edge AI tools to build, connect, and scale smarter.</p>
        </div>
        <div className="space-y-8">
          <div className="glass-dark p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">
              "Upstart helped me connect with the perfect mentor who transformed my business strategy. The AI tools provided insights I never would have discovered on my own."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 mr-3"></div>
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-xs opacity-75">Founder, FinTech Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
