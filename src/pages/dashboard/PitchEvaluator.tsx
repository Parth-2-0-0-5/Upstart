
import React, { useState } from 'react';
import { Upload, BarChart2, FileText, Info, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const PitchEvaluator = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pitch Deck Evaluator</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered analysis and feedback on your pitch deck to improve your chances of securing investment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Card className="shadow-md mb-6 overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-3 flex items-center gap-2 font-medium ${
                  activeTab === 'upload' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <Upload size={18} />
                <span>Upload Deck</span>
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-4 py-3 flex items-center gap-2 font-medium ${
                  activeTab === 'analysis' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <BarChart2 size={18} />
                <span>Deck Analysis</span>
              </button>
              <button
                onClick={() => setActiveTab('samples')}
                className={`px-4 py-3 flex items-center gap-2 font-medium ${
                  activeTab === 'samples' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <FileText size={18} />
                <span>Sample Results</span>
              </button>
            </div>
            <CardContent className="p-6">
              {activeTab === 'upload' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-full max-w-md border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Upload your pitch deck</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop your PDF or PowerPoint file here, or click to browse
                    </p>
                    <Button className="mt-6">Select File</Button>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Supported formats: PDF, PPT, PPTX (Max 20MB)
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'analysis' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Deck Analysis</h3>
                  <p className="mt-2 text-muted-foreground max-w-md">
                    Upload your pitch deck first to see AI-powered analysis and recommendations
                  </p>
                </div>
              )}
              
              {activeTab === 'samples' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Sample Results</h3>
                  <p className="mt-2 text-muted-foreground max-w-md">
                    Check out sample reports to see what kind of feedback you'll receive
                  </p>
                  <Button variant="outline" className="mt-6">View Sample Report</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <Card className="shadow-md sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
              <CardDescription>Understanding the evaluation process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">1</div>
                <div>
                  <h4 className="font-medium">Upload Your Deck</h4>
                  <p className="text-sm text-muted-foreground">Share your pitch deck in PDF or PowerPoint format</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">2</div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Our AI reviews and scores each section of your deck</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">3</div>
                <div>
                  <h4 className="font-medium">Receive Feedback</h4>
                  <p className="text-sm text-muted-foreground">Get detailed recommendations to improve your pitch</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm">
                <Info className="h-4 w-4" />
                <p>Need help? Contact our support team for assistance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PitchEvaluator;
