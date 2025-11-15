import { RiFlaskLine, RiRocketLine, RiSparklingLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeCardProps {
  onNewExperiment: () => void;
}

export function WelcomeCard({ onNewExperiment }: WelcomeCardProps) {
  return (
    <Card className="cyber-border experiment-card">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <RiFlaskLine className="h-16 w-16 text-cyan-400 pulse-glow" />
            <RiSparklingLine className="absolute -top-2 -right-2 h-6 w-6 text-purple-400 animate-pulse" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold neon-text mb-3">
          🚀 Launch Your Next Experiment
        </CardTitle>
        <CardDescription className="text-lg text-cyan-300/80 max-w-2xl mx-auto leading-relaxed">
          Deploy AI-powered autonomous testing agents that continuously optimize your application. 
          Watch real-time performance improvements as our intelligent systems learn and adapt.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button 
          onClick={onNewExperiment} 
          size="lg" 
          className="gradient-button gap-3 px-8 py-4 text-lg font-semibold rounded-xl h-auto"
        >
          <RiRocketLine className="h-6 w-6" />
          Initialize Experiment
          <RiSparklingLine className="h-5 w-5 animate-pulse" />
        </Button>
        <p className="text-purple-300/60 text-sm mt-4">
          ⚡ Powered by Advanced AI Agents • 🎯 Real-Time Optimization • 📊 Instant Analytics
        </p>
      </CardContent>
    </Card>
  );
}
