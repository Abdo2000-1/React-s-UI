import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  text?: string;
  subtitle?: string;
  fullHeight?: boolean;
  rowCount?: number;
  showRows?: boolean;
}

export function LoadingState({
  message,
  text = 'Loading Dental Workspace...',
  subtitle = 'Please wait while we retrieve and synchronize the latest records',
  fullHeight = false,
  rowCount = 8,
  showRows = true,
}: LoadingStateProps) {
  const displayMsg = message || text;
  const rows = Array.from({ length: rowCount });

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-3 sm:p-5 select-none ${
        fullHeight ? 'min-h-[500px]' : ''
      }`}
    >
      {/* 1. Sleek Minimalist Medical Spinner & Status Header */}
      <div className="w-full flex flex-col items-center text-center mb-5">
        <div className="relative w-12 h-12 mb-2.5 flex items-center justify-center">
          {/* Soft Glow */}
          <div className="absolute inset-0 bg-cyan-500/20 dark:bg-cyan-500/30 rounded-full blur-lg animate-pulse pointer-events-none" />

          {/* Outer Track */}
          <div className="w-11 h-11 rounded-full border-2 border-slate-200 dark:border-slate-800" />

          {/* Rotating Spinner */}
          <motion.div
            className="absolute w-11 h-11 rounded-full border-2 border-transparent border-t-cyan-500 border-r-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner Medical Tooth Icon */}
          <div className="absolute flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.5 2 6 4 6 7.5C6 9.5 6.8 11.5 7.5 13.5C8.2 15.5 8.5 17.5 8 21.5C9.5 20.5 10.8 19 12 19C13.2 19 14.5 20.5 16 21.5C15.5 17.5 15.8 15.5 16.5 13.5C17.2 11.5 18 9.5 18 7.5C18 4 15.5 2 12 2Z" />
            </svg>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          {displayMsg}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Smooth Minimal Progress Bar */}
        <div className="w-48 sm:w-72 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative mt-2.5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"
            animate={{
              x: ['-100%', '160%'],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ width: '65%' }}
          />
        </div>
      </div>

      {/* 2. Full-Width Shimmering Skeleton Bars (Matching Image 3 & Table in Image 2) */}
      {showRows && (
        <div className="w-full space-y-2.5">
          {rows.map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group relative w-full h-11 sm:h-12 rounded-xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50 overflow-hidden flex items-center px-4 justify-between shadow-2xs"
            >
              {/* Continuous Smooth Wave Shimmer Effect sweeping across the row */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent animate-shimmer-sweep pointer-events-none"
                style={{ width: '200%' }}
              />

              {/* Realistic Table Column Placeholders matching Image 2 */}
              <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                {/* Col 1: Case # */}
                <div 
                  className="h-3.5 bg-slate-200/90 dark:bg-slate-700/70 rounded-md shrink-0 animate-pulse"
                  style={{ width: `${65 + (idx % 3) * 10}px` }}
                />
                
                {/* Col 2: Title */}
                <div 
                  className="h-3.5 bg-slate-200/80 dark:bg-slate-700/60 rounded-md shrink-0 hidden sm:block animate-pulse"
                  style={{ width: `${110 + (idx % 4) * 20}px` }}
                />

                {/* Col 3: Patient / Doctor */}
                <div 
                  className="h-3.5 bg-slate-200/80 dark:bg-slate-700/60 rounded-md shrink-0 hidden md:block animate-pulse"
                  style={{ width: `${90 + (idx % 2) * 25}px` }}
                />

                {/* Col 4: Clinic */}
                <div 
                  className="h-3.5 bg-slate-200/80 dark:bg-slate-700/60 rounded-md shrink-0 hidden lg:block animate-pulse"
                  style={{ width: `${100 + (idx % 3) * 15}px` }}
                />
              </div>

              {/* Right Column Badges */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Status Pill */}
                <div className="w-14 h-5 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/20 animate-pulse" />
                {/* Priority Dot */}
                <div className="w-12 h-3.5 rounded-md bg-slate-200/90 dark:bg-slate-700/70 hidden sm:block animate-pulse" />
                {/* Updated timestamp */}
                <div className="w-10 h-3 rounded bg-slate-200/70 dark:bg-slate-800 hidden sm:block animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
