
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const [step, setStep] = useState(1);
  
  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          {step === 1 ? "Join our community of entrepreneurs" : "Tell us about your role"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <form className="space-y-4" onSubmit={handleNextStep}>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Startup name</Label>
              <Input id="company" placeholder="Your company" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="e.g. Fintech, Healthcare" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full"
            >
              Continue
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <div className="space-y-4">
              <Label className="text-base">I am a: (select all that apply)</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="entrepreneur" />
                  <Label htmlFor="entrepreneur" className="font-normal">Entrepreneur / Founder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="investor" />
                  <Label htmlFor="investor" className="font-normal">Investor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mentor" />
                  <Label htmlFor="mentor" className="font-normal">Mentor / Advisor</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="linkedinProfile">LinkedIn Profile (optional)</Label>
              <Input 
                id="linkedinProfile" 
                type="url" 
                placeholder="https://linkedin.com/in/yourprofile" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Adding your LinkedIn profile helps with networking and verification
              </p>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button 
                type="button" 
                onClick={handlePrevStep}
                className="btn-secondary"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn-primary sm:flex-1"
              >
                Create Account
              </button>
            </div>
          </form>
        )}
        
        {step === 1 && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-secondary flex justify-center items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span>Google</span>
              </button>
              <button className="btn-secondary flex justify-center items-center gap-2">
                <svg className="h-4 w-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </button>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
