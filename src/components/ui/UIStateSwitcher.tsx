import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Inbox, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '@/utils/sound';

export type UIStateType = 'normal' | 'loading' | 'empty' | 'error';

interface UIStateSwitcherProps {
  state: UIStateType;
  onChange: (newState: UIStateType) => void;
  className?: string;
  label?: string;
}

export function UIStateSwitcher({
  state,
  onChange,
  className = '',
  label = 'Simulate View State'
}: UIStateSwitcherProps) {
  const options: { id: UIStateType; label: string; icon: React.ReactNode; activeClass: string }[] = [
    {
      id: 'normal',
      label: 'Normal Live',
      icon: <CheckCircle2 size={13} />,
      activeClass: 'bg-emerald-500 text-white shadow-xs',
    },
    {
      id: 'loading',
      label: 'Loading Status',
      icon: <Activity size={13} className="animate-pulse" />,
      activeClass: 'bg-cyan-500 text-slate-950 font-bold shadow-xs',
    },
    {
      id: 'empty',
      label: 'Empty Status',
      icon: <Inbox size={13} />,
      activeClass: 'bg-purple-600 text-white shadow-xs',
    },
    {
      id: 'error',
      label: 'Error Status',
      icon: <AlertTriangle size={13} />,
      activeClass: 'bg-rose-600 text-white shadow-xs',
    },
  ];

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs backdrop-blur-xs select-none ${className}`}>
      {label && (
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 hidden sm:inline">
          {label}:
        </span>
      )}

      <div className="flex items-center gap-1">
        {options.map((opt) => {
          const isActive = state === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                sound.playClick();
                onChange(opt.id);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? opt.activeClass
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
