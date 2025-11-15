"use client";

import { useState } from "react";
import { ExperimentHeader } from "./ExperimentHeader";
import { WelcomeCard } from "./WelcomeCard";
import { FeatureCards } from "./FeatureCards";
import { ExperimentForm } from "./ExperimentForm";
import { ExperimentListCard } from "./ExperimentListCard";
import { useStartExperimentMutation, useExperimentsQuery } from "@/query/experiment.query";
import { Card, CardContent } from "@/components/ui/card";
import { RiFlaskLine, RiLoader4Line } from "@remixicon/react";

export function DashboardContainer() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    repoUrl: "",
    goal: "",
  });

  const { startExperiment, isPending } = useStartExperimentMutation();
  const { experiments, isLoading: isLoadingExperiments } = useExperimentsQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startExperiment(formData, {
      onSuccess: (data) => {
        console.log("Experiment started successfully:", data);
        // Reset form and hide it
        setFormData({ repoUrl: "", goal: "" });
        setShowForm(false);
      },
      onError: (error) => {
        console.error("Failed to start experiment:", error);
      },
    });
  };

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-6 py-12">
        <ExperimentHeader />

        {!showForm ? (
          <div className="space-y-8">
            <WelcomeCard onNewExperiment={() => setShowForm(true)} />

            {/* Experiments List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold neon-text flex items-center gap-3">
                  <RiFlaskLine size={28} className="text-cyan-400 pulse-glow" />
                  🧪 Active Experiments
                  {experiments && (
                    <span className="text-lg text-purple-300/70 font-normal">
                      ({experiments.length})
                    </span>
                  )}
                </h2>
              </div>

              {isLoadingExperiments ? (
                <Card className="experiment-card">
                  <CardContent className="py-16 text-center">
                    <RiLoader4Line size={40} className="mx-auto mb-4 text-purple-400 animate-spin pulse-glow" />
                    <p className="text-purple-300">Scanning experiment matrix...</p>
                  </CardContent>
                </Card>
              ) : experiments && experiments.length > 0 ? (
                <div className="grid gap-6">
                  {experiments.map((experiment, index) => (
                    <div 
                      key={experiment.id} 
                      className="floating-element" 
                      style={{animationDelay: `${index * 0.2}s`}}
                    >
                      <ExperimentListCard experiment={experiment} />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="experiment-card">
                  <CardContent className="py-16 text-center">
                    <div className="mb-6">
                      <RiFlaskLine size={64} className="mx-auto text-purple-400/50 pulse-glow" />
                    </div>
                    <h3 className="text-xl font-bold neon-text mb-3">
                      🚀 Ready to Launch Your First Experiment?
                    </h3>
                    <p className="text-cyan-300/70 max-w-md mx-auto">
                      Initialize your first AI-powered experiment and watch the magic happen! Our intelligent agents are standing by.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <FeatureCards />
          </div>
        ) : (
          <ExperimentForm
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isSubmitting={isPending}
          />
        )}
      </div>
    </div>
  );
}
