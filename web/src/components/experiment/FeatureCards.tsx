import { RiGitBranchLine, RiTargetLine, RiLineChartLine, RiBarChartLine, RiRocketLine, RiBrainLine } from "@remixicon/react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsDashboard } from "./MetricsDashboard";

export function FeatureCards() {
  return (
    <div className="space-y-8">
      {/* Feature Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiGitBranchLine className="h-12 w-12 mx-auto mb-3 text-purple-400 pulse-glow" />
            <CardTitle className="text-xl neon-text">🔗 Repository Integration</CardTitle>
            <CardDescription className="text-purple-300/70">
              Connect your GitHub repository and let AI generate optimized variants automatically
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiTargetLine className="h-12 w-12 mx-auto mb-3 text-cyan-400 pulse-glow" />
            <CardTitle className="text-xl neon-text">🎯 Goal-Driven Testing</CardTitle>
            <CardDescription className="text-cyan-300/70">
              Define your objectives and let AI optimize for your specific performance goals
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiLineChartLine className="h-12 w-12 mx-auto mb-3 text-blue-400 pulse-glow" />
            <CardTitle className="text-xl neon-text">⚡ Automated Optimization</CardTitle>
            <CardDescription className="text-blue-300/70">
              Browser agents test variants and merge winning changes automatically
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Comprehensive Metrics Dashboard */}
      <MetricsDashboard />

      {/* Technology Stack Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiRocketLine className="h-10 w-10 mx-auto mb-3 text-purple-400 pulse-glow" />
            <CardTitle className="text-lg neon-text">🚀 Daytona</CardTitle>
            <CardDescription className="text-purple-300/70">
              Cloud development environments for instant sandbox provisioning
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiLineChartLine className="h-10 w-10 mx-auto mb-3 text-cyan-400 pulse-glow" />
            <CardTitle className="text-lg neon-text">👁️ Browser-Use</CardTitle>
            <CardDescription className="text-cyan-300/70">
              Intelligent browser automation for realistic user simulation
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiBrainLine className="h-10 w-10 mx-auto mb-3 text-blue-400 pulse-glow" />
            <CardTitle className="text-lg neon-text">🧠 Galileo AI</CardTitle>
            <CardDescription className="text-blue-300/70">
              Advanced AI models for intelligent analysis and optimization
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="experiment-card">
          <CardHeader className="text-center">
            <RiBarChartLine className="h-10 w-10 mx-auto mb-3 text-emerald-400 pulse-glow" />
            <CardTitle className="text-lg neon-text">🐰 CodeRabbit</CardTitle>
            <CardDescription className="text-emerald-300/70">
              Automated code review and quality assessment platform
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
