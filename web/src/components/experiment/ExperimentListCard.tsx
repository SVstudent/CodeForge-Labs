import { Card, CardContent } from '@/components/ui/card';
import {
  RiTimeLine,
  RiArrowRightLine,
  RiCheckLine,
  RiLoader4Line,
} from '@remixicon/react';
import Link from 'next/link';

interface ExperimentListCardProps {
  experiment: {
    id: string;
    repoUrl: string;
    goal: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
    updatedAt: string;
  };
}

export const ExperimentListCard = ({ experiment }: ExperimentListCardProps) => {
  const statusConfig = {
    pending: {
      icon: <RiTimeLine size={14} className="text-amber-400" />,
      label: '⏳ Pending',
      color: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    },
    running: {
      icon: <RiLoader4Line size={14} className="animate-spin text-cyan-400" />,
      label: '🚀 Running',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    },
    completed: {
      icon: <RiCheckLine size={14} className="text-emerald-400" />,
      label: '✅ Completed',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    },
    failed: {
      icon: <RiTimeLine size={14} className="text-red-400" />,
      label: '❌ Failed',
      color: 'bg-red-500/20 text-red-300 border-red-400/40',
    },
  };

  const config = statusConfig[experiment.status];
  const repoName = experiment.repoUrl.split('/').slice(-2).join('/');

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Link href={`/experiments/${experiment.id}`}>
      <Card className="experiment-card group cursor-pointer">
        <CardContent className="py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-purple-300/80 font-mono bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/30">
                  📁 {repoName}
                </span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${config.color}`}>
                  {config.icon}
                  <span>{config.label}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-cyan-200 mb-4 line-clamp-2 group-hover:text-cyan-100 transition-colors">
                🎯 {experiment.goal}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-purple-300/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full pulse-glow"></span>
                  Started {getTimeAgo(experiment.createdAt)}
                </span>
                <span className="text-purple-400/40">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Updated {getTimeAgo(experiment.updatedAt)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <span className="text-sm font-medium">Launch</span>
              <RiArrowRightLine size={20} className="group-hover:translate-x-1 transition-transform pulse-glow" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
