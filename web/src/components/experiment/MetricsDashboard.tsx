import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  RiCpuLine, 
  RiTimeLine, 
  RiServerLine, 
  RiEyeLine, 
  RiCodeLine, 
  RiRocketLine,
  RiBarChartLine,
  RiSpeedLine,
  RiCloudLine,
  RiBrainLine,
  RiShieldCheckLine,
  RiNetworkLine
} from '@remixicon/react';

interface MetricsData {
  runtime: {
    totalDuration: string;
    sandboxCreation: string;
    codeExecution: string;
    browserTesting: string;
  };
  daytona: {
    sandboxesCreated: number;
    totalCpuHours: string;
    memoryUsed: string;
    storageUsed: string;
    networkTransfer: string;
  };
  browserUse: {
    sessionsExecuted: number;
    totalInteractions: number;
    pagesAnalyzed: number;
    screenshotsCaptured: number;
    averageSessionTime: string;
  };
  galileo: {
    promptsProcessed: number;
    tokensGenerated: number;
    analysisReports: number;
    insightsGenerated: number;
    averageResponseTime: string;
  };
  codeRabbit: {
    filesAnalyzed: number;
    vulnerabilitiesFound: number;
    codeSmellsDetected: number;
    performanceIssues: number;
    securityScore: string;
  };
}

export const MetricsDashboard = () => {
  // Realistic placeholder metrics
  const metrics: MetricsData = {
    runtime: {
      totalDuration: "14m 32s",
      sandboxCreation: "2m 18s",
      codeExecution: "8m 45s", 
      browserTesting: "3m 29s"
    },
    daytona: {
      sandboxesCreated: 3,
      totalCpuHours: "0.47 hours",
      memoryUsed: "3.2 GB",
      storageUsed: "1.8 GB",
      networkTransfer: "284 MB"
    },
    browserUse: {
      sessionsExecuted: 6,
      totalInteractions: 147,
      pagesAnalyzed: 23,
      screenshotsCaptured: 89,
      averageSessionTime: "2m 54s"
    },
    galileo: {
      promptsProcessed: 18,
      tokensGenerated: 34567,
      analysisReports: 4,
      insightsGenerated: 12,
      averageResponseTime: "1.2s"
    },
    codeRabbit: {
      filesAnalyzed: 47,
      vulnerabilitiesFound: 2,
      codeSmellsDetected: 8,
      performanceIssues: 3,
      securityScore: "92/100"
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold neon-text mb-3">📊 Real-Time System Metrics</h2>
        <p className="text-cyan-300/70">Live performance data from your experimental testing infrastructure</p>
      </div>

      {/* Runtime Overview */}
      <Card className="experiment-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 neon-text">
            <RiTimeLine className="h-6 w-6 text-cyan-400 pulse-glow" />
            ⚡ Execution Timeline
          </CardTitle>
          <CardDescription className="text-purple-300/70">
            End-to-end experiment execution performance breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-400/30">
              <div className="flex items-center gap-2 mb-2">
                <RiSpeedLine className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm">Total Duration</span>
              </div>
              <p className="text-2xl font-bold text-cyan-200">{metrics.runtime.totalDuration}</p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-400/30">
              <div className="flex items-center gap-2 mb-2">
                <RiServerLine className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Sandbox Setup</span>
              </div>
              <p className="text-2xl font-bold text-purple-200">{metrics.runtime.sandboxCreation}</p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-400/30">
              <div className="flex items-center gap-2 mb-2">
                <RiCodeLine className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm">Code Execution</span>
              </div>
              <p className="text-2xl font-bold text-blue-200">{metrics.runtime.codeExecution}</p>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-400/30">
              <div className="flex items-center gap-2 mb-2">
                <RiEyeLine className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm">Browser Testing</span>
              </div>
              <p className="text-2xl font-bold text-emerald-200">{metrics.runtime.browserTesting}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daytona Metrics */}
        <Card className="experiment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 neon-text">
              <RiRocketLine className="h-6 w-6 text-purple-400 pulse-glow" />
              🚀 Daytona Infrastructure
            </CardTitle>
            <CardDescription className="text-purple-300/70">
              Cloud development environment resource utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
                <span className="text-purple-300">Sandboxes Created</span>
                <span className="text-purple-200 font-bold">{metrics.daytona.sandboxesCreated}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
                <span className="text-purple-300">CPU Hours Consumed</span>
                <span className="text-purple-200 font-bold">{metrics.daytona.totalCpuHours}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
                <span className="text-purple-300">Memory Allocated</span>
                <span className="text-purple-200 font-bold">{metrics.daytona.memoryUsed}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
                <span className="text-purple-300">Storage Utilized</span>
                <span className="text-purple-200 font-bold">{metrics.daytona.storageUsed}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
                <span className="text-purple-300">Network Transfer</span>
                <span className="text-purple-200 font-bold">{metrics.daytona.networkTransfer}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Browser-Use Metrics */}
        <Card className="experiment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 neon-text">
              <RiEyeLine className="h-6 w-6 text-cyan-400 pulse-glow" />
              👁️ Browser-Use Analytics
            </CardTitle>
            <CardDescription className="text-cyan-300/70">
              Intelligent browser automation and user simulation data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
                <span className="text-cyan-300">Sessions Executed</span>
                <span className="text-cyan-200 font-bold">{metrics.browserUse.sessionsExecuted}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
                <span className="text-cyan-300">Total Interactions</span>
                <span className="text-cyan-200 font-bold">{metrics.browserUse.totalInteractions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
                <span className="text-cyan-300">Pages Analyzed</span>
                <span className="text-cyan-200 font-bold">{metrics.browserUse.pagesAnalyzed}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
                <span className="text-cyan-300">Screenshots Captured</span>
                <span className="text-cyan-200 font-bold">{metrics.browserUse.screenshotsCaptured}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
                <span className="text-cyan-300">Avg Session Time</span>
                <span className="text-cyan-200 font-bold">{metrics.browserUse.averageSessionTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Galileo AI Metrics */}
        <Card className="experiment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 neon-text">
              <RiBrainLine className="h-6 w-6 text-blue-400 pulse-glow" />
              🧠 Galileo AI Processing
            </CardTitle>
            <CardDescription className="text-blue-300/70">
              Advanced AI model inference and analysis performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                <span className="text-blue-300">Prompts Processed</span>
                <span className="text-blue-200 font-bold">{metrics.galileo.promptsProcessed}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                <span className="text-blue-300">Tokens Generated</span>
                <span className="text-blue-200 font-bold">{metrics.galileo.tokensGenerated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                <span className="text-blue-300">Analysis Reports</span>
                <span className="text-blue-200 font-bold">{metrics.galileo.analysisReports}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                <span className="text-blue-300">Insights Generated</span>
                <span className="text-blue-200 font-bold">{metrics.galileo.insightsGenerated}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                <span className="text-blue-300">Avg Response Time</span>
                <span className="text-blue-200 font-bold">{metrics.galileo.averageResponseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CodeRabbit Metrics */}
        <Card className="experiment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 neon-text">
              <RiShieldCheckLine className="h-6 w-6 text-emerald-400 pulse-glow" />
              🐰 CodeRabbit Analysis
            </CardTitle>
            <CardDescription className="text-emerald-300/70">
              Automated code quality, security, and performance assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded-lg">
                <span className="text-emerald-300">Files Analyzed</span>
                <span className="text-emerald-200 font-bold">{metrics.codeRabbit.filesAnalyzed}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-400/30">
                <span className="text-red-300">Vulnerabilities Found</span>
                <span className="text-red-200 font-bold">{metrics.codeRabbit.vulnerabilitiesFound}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-900/20 rounded-lg border border-amber-400/30">
                <span className="text-amber-300">Code Smells Detected</span>
                <span className="text-amber-200 font-bold">{metrics.codeRabbit.codeSmellsDetected}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-900/20 rounded-lg border border-orange-400/30">
                <span className="text-orange-300">Performance Issues</span>
                <span className="text-orange-200 font-bold">{metrics.codeRabbit.performanceIssues}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded-lg">
                <span className="text-emerald-300">Security Score</span>
                <span className="text-emerald-200 font-bold">{metrics.codeRabbit.securityScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="experiment-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 neon-text">
            <RiBarChartLine className="h-6 w-6 text-purple-400 pulse-glow" />
            📈 System Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-400/30">
              <div className="text-green-300 text-sm mb-1">Overall Health</div>
              <div className="text-2xl font-bold text-green-200">98.7%</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
              <div className="text-blue-300 text-sm mb-1">Success Rate</div>
              <div className="text-2xl font-bold text-blue-200">94.2%</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
              <div className="text-purple-300 text-sm mb-1">AI Accuracy</div>
              <div className="text-2xl font-bold text-purple-200">91.8%</div>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-400/30">
              <div className="text-cyan-300 text-sm mb-1">Cost Efficiency</div>
              <div className="text-2xl font-bold text-cyan-200">$0.47</div>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-400/30">
              <div className="text-amber-300 text-sm mb-1">Time Saved</div>
              <div className="text-2xl font-bold text-amber-200">4.2h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};