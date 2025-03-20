
import React, { useState } from 'react';
import { BarChart2, FileText, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PitchEvaluator = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [pitchText, setPitchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Hardcoded analysis results
  const analysisResults = {
    "Overall Score": 85,
    "Section Feedback": {
      "Problem Statement": "Strong",
      "Solution Clarity": "Strong",
      "Market Size": "Needs Detail",
      "Business Model": "Strong",
      "Competition": "Weak",
      "Team": "Strong"
    }
  };

  const handleAnalyze = () => {
    if (pitchText.trim().length > 0) {
      setShowResults(true);
      setActiveTab('analysis');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getFeedbackColor = (feedback) => {
    if (feedback === "Strong") return "text-green-500";
    if (feedback === "Needs Detail") return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pitch Deck Evaluator</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered analysis and feedback on your pitch to improve your chances of securing investment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Card className="shadow-md mb-6 overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('input')}
                className={`px-4 py-3 flex items-center gap-2 font-medium ${
                  activeTab === 'input' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <FileText size={18} />
                <span>Input Pitch</span>
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
                <span>Analysis Results</span>
              </button>
            </div>
            <CardContent className="p-6">
              {activeTab === 'input' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your pitch text below to receive AI-powered analysis and feedback.
                  </p>
                  <Textarea 
                    placeholder="Paste your pitch text here..." 
                    className="min-h-[250px]"
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                  />
                  <Button 
                    onClick={handleAnalyze}
                    disabled={pitchText.trim().length === 0}
                    className="w-full sm:w-auto"
                  >
                    Analyze Pitch
                  </Button>
                </div>
              )}
              
              {activeTab === 'analysis' && showResults ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">Analysis Results</h3>
                      <p className="text-sm text-muted-foreground">AI-powered pitch evaluation</p>
                    </div>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-primary/20">
                      <span className={`text-2xl font-bold ${getScoreColor(analysisResults["Overall Score"])}`}>
                        {analysisResults["Overall Score"]}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">Section Feedback</h4>
                    <div className="space-y-3">
                      {Object.entries(analysisResults["Section Feedback"]).map(([section, feedback]) => (
                        <div key={section} className="flex justify-between p-2 rounded bg-muted/30">
                          <span className="font-medium">{section}</span>
                          <span className={`${getFeedbackColor(feedback)}`}>{feedback}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 bg-muted/10">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Next Steps</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your analysis, consider strengthening your competition section and providing more details about market size to improve your overall pitch quality.
                    </p>
                  </div>
                </div>
              ) : (
                activeTab === 'analysis' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No Analysis Available</h3>
                    <p className="mt-2 text-muted-foreground max-w-md">
                      Please enter your pitch text and click "Analyze Pitch" to see AI-powered results
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => setActiveTab('input')}
                    >
                      Enter Pitch Text
                    </Button>
                  </div>
                )
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
                  <h4 className="font-medium">Enter Your Pitch</h4>
                  <p className="text-sm text-muted-foreground">Share your pitch text in the input area</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">2</div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Our AI reviews and scores each section of your pitch</p>
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
