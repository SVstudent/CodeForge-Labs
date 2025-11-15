import { RiFlaskLine, RiGitBranchLine, RiTargetLine, RiRocketLine, RiLoader4Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperimentFormData {
  repoUrl: string;
  goal: string;
}

interface ExperimentFormProps {
  formData: ExperimentFormData;
  onFormDataChange: (data: ExperimentFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ExperimentForm({ formData, onFormDataChange, onSubmit, onCancel, isSubmitting = false }: ExperimentFormProps) {
  return (
    <Card className="max-w-3xl mx-auto cyber-border experiment-card">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <RiFlaskLine className="h-12 w-12 text-cyan-400 pulse-glow" />
        </div>
        <CardTitle className="text-3xl font-bold neon-text">
          🔬 Configure Experiment Parameters
        </CardTitle>
        <CardDescription className="text-lg text-cyan-300/80">
          Set up your AI-powered optimization experiment with precise targeting parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Git Repository URL */}
          <div className="space-y-3">
            <Label htmlFor="repoUrl" className="text-lg font-semibold flex items-center gap-3 neon-text">
              <RiGitBranchLine className="h-5 w-5 text-purple-400" />
              🔗 Target Repository URL
            </Label>
            <Input
              id="repoUrl"
              type="url"
              placeholder="https://github.com/username/repository"
              value={formData.repoUrl}
              onChange={(e) => onFormDataChange({ ...formData, repoUrl: e.target.value })}
              required
              className="h-12 bg-purple-900/20 border-purple-400/30 text-cyan-200 placeholder-purple-300/50 rounded-xl backdrop-blur-sm"
            />
            <p className="text-purple-300/70">
              📁 Source code repository that will be analyzed and optimized by our AI agents
            </p>
          </div>

          {/* Task / Prompt */}
          <div className="space-y-3">
            <Label htmlFor="goal" className="text-lg font-semibold flex items-center gap-3 neon-text">
              <RiTargetLine className="h-5 w-5 text-cyan-400" />
              🎯 Optimization Objective
            </Label>
            <Textarea
              id="goal"
              placeholder="Define your optimization goals... e.g., 'Increase signup conversion rate', 'Improve mobile user experience', 'Optimize page load performance', 'Enhance navigation usability'"
              value={formData.goal}
              onChange={(e) => onFormDataChange({ ...formData, goal: e.target.value })}
              required
              className="min-h-[180px] resize-y bg-cyan-900/20 border-cyan-400/30 text-cyan-200 placeholder-cyan-300/50 rounded-xl backdrop-blur-sm"
            />
            <p className="text-cyan-300/70">
              🚀 Describe what you want our AI agents to optimize or improve in your application
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button 
              type="submit" 
              size="lg" 
              className="flex-1 gradient-button gap-3 h-14 text-lg font-semibold rounded-xl" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RiLoader4Line className="h-6 w-6 animate-spin" />
                  Initializing AI Agents...
                </>
              ) : (
                <>
                  <RiRocketLine className="h-6 w-6" />
                  🚀 Launch Experiment
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              disabled={isSubmitting}
              className="bg-purple-900/20 border-purple-400/30 text-purple-300 hover:bg-purple-800/30 h-14 px-8 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
