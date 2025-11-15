import { RiFlaskLine, RiSparklingLine } from "@remixicon/react";

export function ExperimentHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <RiFlaskLine className="h-12 w-12 text-cyan-400 pulse-glow" />
        <h1 className="text-5xl font-bold neon-text tracking-tight">Experiment Command Center</h1>
        <RiSparklingLine className="h-8 w-8 text-purple-400 animate-pulse" />
      </div>
      <p className="text-xl text-cyan-300/80 max-w-3xl mx-auto">
        🚀 Self-Improving Experimental Testing System • Powered by Advanced AI Agents • Real-Time Optimization
      </p>
    </div>
  );
}
