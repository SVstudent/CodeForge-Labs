import { DashboardContainer } from "@/components/experiment/DashboardContainer";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section Header */}
      <div className="relative z-10 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold neon-text mb-4 tracking-tight">
              ⚡ CodeForge Labs
            </h1>
            <p className="text-xl text-cyan-300/80 max-w-3xl mx-auto leading-relaxed">
              🚀 Revolutionary AI-Powered Experimental Testing Platform • Self-Improving Systems • Real-Time Optimization
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-400/40 rounded-full text-purple-300 text-sm">
                ✨ AI Agents
              </span>
              <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full text-cyan-300 text-sm">
                🎯 Continuous Optimization
              </span>
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 rounded-full text-blue-300 text-sm">
                ⚡ Real-Time Results
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <DashboardContainer />
    </div>
  );
}
