'use client';

import { useExperimentDetailQuery } from '@/query/experiment.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ControlVariantCard } from './ControlVariantCard';
import { VariantCard } from './VariantCard';
import { MetricsDashboard } from './MetricsDashboard';
import {
  RiFlaskLine,
  RiArrowLeftLine,
  RiGitRepositoryLine,
  RiTargetLine,
  RiRocketLine,
  RiLoader4Line,
  RiSparklingLine,
} from '@remixicon/react';
import Link from 'next/link';
import { useState } from 'react';

interface ExperimentDetailContainerProps {
  experimentId: string;
}

export const ExperimentDetailContainer = ({ experimentId }: ExperimentDetailContainerProps) => {
  const { experiment, isLoading, isError, refetch } = useExperimentDetailQuery(experimentId);
  const [isCompletingDemo, setIsCompletingDemo] = useState(false);

  const handleCompleteDemo = async () => {
    setIsCompletingDemo(true);
    try {
      const response = await fetch(`http://localhost:8000/demo/experiment/${experimentId}/fast-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        // Quick refetch since we're using existing deployment
        setTimeout(() => {
          refetch();
          setIsCompletingDemo(false);
        }, 1000);
      } else {
        console.error('Demo completion failed');
        setIsCompletingDemo(false);
      }
    } catch (error) {
      console.error('Demo completion error:', error);
      setIsCompletingDemo(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RiFlaskLine size={64} className="mx-auto mb-6 text-cyan-400 pulse-glow animate-pulse" />
          <p className="text-xl neon-text">Scanning experiment matrix...</p>
          <p className="text-cyan-300/60 mt-2">Analyzing AI agent data streams</p>
        </div>
      </div>
    );
  }

  if (isError || !experiment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md experiment-card">
          <CardHeader className="text-center">
            <CardTitle className="neon-text">⚠️ Experiment Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-purple-300/80 mb-6">
              The experiment matrix you're looking for doesn't exist or has been archived.
            </p>
            <Link href="/">
              <Button className="gradient-button gap-2">
                <RiArrowLeftLine size={16} />
                Return to Command Center
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = {
    pending: { label: '⏳ Pending', color: 'text-amber-300' },
    running: { label: '🚀 Running', color: 'text-cyan-300' },
    completed: { label: '✅ Completed', color: 'text-emerald-300' },
    failed: { label: '❌ Failed', color: 'text-red-300' },
  };

  const statusInfo = statusConfig[experiment.status] || { label: experiment.status, color: 'text-purple-300' };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-purple-900/30 border-purple-400/40 text-purple-300 hover:bg-purple-800/40">
                <RiArrowLeftLine size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold neon-text">🔬 Experiment</h1>
              <span className="text-purple-400/40">•</span>
              <span className={`text-lg font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
            </div>
          </div>
          
          {/* Demo Complete Button */}
          {experiment.status === 'pending' && (
            <Button 
              onClick={handleCompleteDemo}
              disabled={isCompletingDemo}
              className="gradient-button gap-3 px-6 py-3 text-lg"
            >
              {isCompletingDemo ? (
                <>
                  <RiLoader4Line size={20} className="animate-spin" />
                  Executing Demo Protocol...
                </>
              ) : (
                <>
                  <RiRocketLine size={20} />
                  Complete Demo Instantly
                  <RiSparklingLine size={16} className="animate-pulse" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Experiment Info */}
        <Card className="experiment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl neon-text">
              <RiTargetLine size={24} className="text-cyan-400" />
              🎯 Experiment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <RiGitRepositoryLine size={20} className="text-purple-400" />
                <p className="text-lg font-semibold text-purple-300">📁 Repository</p>
              </div>
              <p className="text-cyan-200 font-mono bg-purple-900/20 p-4 rounded-xl border border-purple-400/30">
                {experiment.repoUrl}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <RiTargetLine size={20} className="text-cyan-400" />
                <p className="text-lg font-semibold text-cyan-300">🎯 Goal</p>
              </div>
              <p className="text-purple-200 bg-cyan-900/20 p-4 rounded-xl border border-cyan-400/30">
                {experiment.goal}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-400/30">
                <p className="text-purple-300/70 mb-1">Created</p>
                <p className="font-medium text-purple-200">
                  {new Date(experiment.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-400/30">
                <p className="text-cyan-300/70 mb-1">Last Updated</p>
                <p className="font-medium text-cyan-200">
                  {new Date(experiment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {experiment.variantSuggestions && experiment.variantSuggestions.length > 0 && (
              <div className="pt-6 border-t border-purple-400/30">
                <p className="text-lg font-semibold text-cyan-300 mb-4">🧠 AI Variant Suggestions</p>
                <ul className="space-y-2">
                  {experiment.variantSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-purple-200 bg-purple-900/20 p-3 rounded-lg border border-purple-400/20">
                      💡 {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Control Variant Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold neon-text">🎮 Control Variant</h2>
          {experiment.controlVariant ? (
            <ControlVariantCard controlVariant={experiment.controlVariant} />
          ) : (
            <Card className="experiment-card">
              <CardContent className="py-12 text-center">
                <RiLoader4Line size={48} className="mx-auto mb-4 text-purple-400 animate-spin pulse-glow" />
                <p className="text-lg neon-text">Initializing control variant...</p>
                <p className="text-purple-300/60 mt-2">Setting up baseline configuration</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Variants Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold neon-text">
            🧪 Experimental Variants
            {experiment.experimentalVariants && (
              <span className="text-purple-300/70 font-normal ml-2">
                ({experiment.experimentalVariants.length})
              </span>
            )}
          </h2>
          {experiment.experimentalVariants && experiment.experimentalVariants.length > 0 ? (
            <div className="space-y-6">
              {experiment.experimentalVariants.map((variant, index) => (
                <div 
                  key={variant.id} 
                  className="floating-element" 
                  style={{animationDelay: `${index * 0.3}s`}}
                >
                  <VariantCard
                    variant={variant}
                    index={index}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="experiment-card">
              <CardContent className="py-12 text-center">
                <RiFlaskLine size={48} className="mx-auto mb-4 text-cyan-400 pulse-glow animate-pulse" />
                <p className="text-lg neon-text">Generating experimental variants...</p>
                <p className="text-cyan-300/60 mt-2">AI agents analyzing optimization opportunities</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comprehensive Metrics Dashboard */}
        {experiment.status === 'completed' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold neon-text">📊 Experiment Performance Analytics</h2>
            <MetricsDashboard />
          </div>
        )}
      </div>
    </div>
  );
};
