import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Sparkles, 
  Cpu, 
  Layers, 
  Wifi, 
  CheckCircle2, 
  Scan,
  Database
} from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  text?: string;
  subtitle?: string;
  fullHeight?: boolean;
}

const CAD_PIPELINE_STAGES = [
  { step: '01', title: 'Reconstructing 3D DICOM Voxel Matrix', detail: 'Tessellating 2.4M point cloud vertices...', progress: 34 },
  { step: '02', title: 'Detecting Finish Line & Margin Contours', detail: 'AI subgingival margin trace active at 10μm tolerance...', progress: 68 },
  { step: '03', title: 'Virtual Articulator & Occlusal Clearance', detail: 'Dynamic antagonist collision check calibrated...', progress: 89 },
  { step: '04', title: 'Streaming CAD/CAM Production Assets', detail: 'Readying 5-axis milling machine nesting toolpath...', progress: 99 },
];

export function LoadingState({
  message,
  text = 'Dental CAD/CAM System Initializing...',
  subtitle = 'Synchronizing real-time intraoral scans, margin lines, and clinical cases',
  fullHeight = false,
}: LoadingStateProps) {
  const displayMsg = message || text;
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  // Cycle through pipeline milestones automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIdx((prev) => (prev + 1) % CAD_PIPELINE_STAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const currentStage = CAD_PIPELINE_STAGES[currentStageIdx];

  return (
    <div className={`flex flex-col items-center justify-center p-6 sm:p-10 select-none ${fullHeight ? 'min-h-[500px]' : 'py-12'}`}>
      {/* 1. Futuristic Holographic 3D Tooth & Scanner Canvas */}
      <div className="relative w-64 h-48 sm:w-80 sm:h-52 mb-6 flex items-center justify-center">
        {/* Ambient Radial Laser Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Outer Orbit Coordinates Ring */}
        <motion.div
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-cyan-500/30 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Counter-rotating Inner Ring */}
        <motion.div
          className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-transparent border-t-cyan-400 border-b-blue-500 opacity-60"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* 3D Anatomical Tooth Wireframe with Laser Scanner Sweep */}
        <div className="relative w-28 h-36 flex items-center justify-center">
          <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <defs>
              <linearGradient id="wireframeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d8fe" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="laserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Wireframe Tooth Contours (Crown + Roots) */}
            <g stroke="url(#wireframeGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
              {/* Outer Crown Perimeter */}
              <path d="M 22 55 C 16 75, 18 105, 30 120 C 40 128, 60 128, 70 120 C 82 105, 84 75, 78 55 C 72 38, 28 38, 22 55 Z" />
              {/* Occlusal Cusp Ridges */}
              <path d="M 30 115 C 42 110, 58 110, 70 115" strokeDasharray="3 3" />
              <path d="M 50 125 L 50 85" strokeDasharray="4 4" />
              <path d="M 32 90 C 45 80, 55 80, 68 90" />
              {/* Cervical Margin (CEJ) */}
              <path d="M 22 55 C 38 62, 62 62, 78 55" strokeWidth="2.4" stroke="#00e5ff" />
              {/* Dual Anatomical Roots */}
              <path d="M 24 55 C 22 35, 28 15, 36 6 C 42 16, 44 35, 48 55" />
              <path d="M 52 55 C 56 35, 58 16, 64 6 C 72 15, 78 35, 76 55" />
              {/* Transverse Cross Sections */}
              <line x1="28" y1="35" x2="42" y2="35" strokeDasharray="2 2" />
              <line x1="58" y1="35" x2="72" y2="35" strokeDasharray="2 2" />
              <circle cx="50" cy="95" r="3" fill="#00e5ff" />
            </g>

            {/* Sweeping Laser Plane Line */}
            <motion.rect
              x="0"
              width="100"
              height="8"
              fill="url(#laserBeam)"
              animate={{ y: [0, 125, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Floating Telemetry Coordinates */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
          VOXELS: 2.4M
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-purple-500/30 text-[10px] font-mono text-purple-400">
          MESH: 10μm
        </div>
      </div>

      {/* 2. Interactive Pipeline Milestone Progress Card */}
      <div className="w-full max-w-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md space-y-3.5">
        {/* Stage Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              STEP {currentStage.step} OF 04 • {currentStage.title}
            </span>
          </div>
          <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
            {currentStage.progress}%
          </span>
        </div>

        {/* High-tech Multi-Segment Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
            initial={{ width: '20%' }}
            animate={{ width: `${currentStage.progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Live Detail String */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStage.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-slate-600 dark:text-slate-300 font-mono truncate"
          >
            &gt; {currentStage.detail}
          </motion.p>
        </AnimatePresence>

        {/* Hardware Status Strip */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-500">
            <Cpu size={12} /> GPU ACCELERATED
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Wifi size={12} /> PACS SYNC: 14ms
          </span>
          <span className="flex items-center gap-1.5 text-purple-400">
            <Database size={12} /> CLOUD CACHE
          </span>
        </div>
      </div>

      {/* 3. Shimmer Skeleton Rows Preview */}
      <div className="w-full max-w-lg mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-70">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            <div className="flex items-center justify-between mb-2">
              <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="w-12 h-3 bg-cyan-500/20 rounded animate-pulse" />
            </div>
            <div className="w-28 h-4 bg-slate-300 dark:bg-slate-700 rounded animate-pulse mb-1.5" />
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
