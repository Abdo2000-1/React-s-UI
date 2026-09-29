import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Check, RotateCcw, Crown, Shield, Layers, 
  Smile, Zap, Info, X, ChevronRight, Activity
} from 'lucide-react';

export type ToothSystem = 'universal' | 'fdi';
export type RestorationType = 'crown' | 'bridge' | 'veneer' | 'implant' | 'inlay' | 'extraction';

export interface ToothOdontoData {
  universal: number;
  fdi: number;
  code: string;
  name: string;
  category: 'molar' | 'premolar' | 'canine' | 'incisor_lat' | 'incisor_cen';
  arch: 'upper' | 'lower';
  quadrant: 'UR' | 'UL' | 'LL' | 'LR';
  isAnterior: boolean;
}

export const ODONTO_DATABASE: ToothOdontoData[] = [
  // --- UPPER ARCH (Right to Left: 1 to 16) ---
  // Right side (UR 1-8)
  { universal: 1,  fdi: 18, code: '18', name: 'Upper Right 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 2,  fdi: 17, code: '17', name: 'Upper Right 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 3,  fdi: 16, code: '16', name: 'Upper Right 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 4,  fdi: 15, code: '15', name: 'Upper Right 2nd Premolar', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 5,  fdi: 14, code: '14', name: 'Upper Right 1st Premolar', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 6,  fdi: 13, code: '13', name: 'Upper Right Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 7,  fdi: 12, code: '12', name: 'Upper Right Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 8,  fdi: 11, code: '11', name: 'Upper Right Central Incisor', category: 'incisor_cen', arch: 'upper', quadrant: 'UR', isAnterior: true },

  // Left side (UL 9-16)
  { universal: 9,  fdi: 21, code: '21', name: 'Upper Left Central Incisor', category: 'incisor_cen', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 10, fdi: 22, code: '22', name: 'Upper Left Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 11, fdi: 23, code: '23', name: 'Upper Left Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 12, fdi: 24, code: '24', name: 'Upper Left 1st Premolar', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 13, fdi: 25, code: '25', name: 'Upper Left 2nd Premolar', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 14, fdi: 26, code: '26', name: 'Upper Left 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 15, fdi: 27, code: '27', name: 'Upper Left 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 16, fdi: 28, code: '28', name: 'Upper Left 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },

  // --- LOWER ARCH (Right to Left: 32 to 17) ---
  // Right side (LR 32-25)
  { universal: 32, fdi: 48, code: '48', name: 'Lower Right 3rd Molar (Wisdom)', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 31, fdi: 47, code: '47', name: 'Lower Right 2nd Molar', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 30, fdi: 46, code: '46', name: 'Lower Right 1st Molar', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 29, fdi: 45, code: '45', name: 'Lower Right 2nd Premolar', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 28, fdi: 44, code: '44', name: 'Lower Right 1st Premolar', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 27, fdi: 43, code: '43', name: 'Lower Right Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 26, fdi: 42, code: '42', name: 'Lower Right Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 25, fdi: 41, code: '41', name: 'Lower Right Central Incisor', category: 'incisor_cen', arch: 'lower', quadrant: 'LR', isAnterior: true },

  // Left side (LL 24-17)
  { universal: 24, fdi: 31, code: '31', name: 'Lower Left Central Incisor', category: 'incisor_cen', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 23, fdi: 32, code: '32', name: 'Lower Left Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 22, fdi: 33, code: '33', name: 'Lower Left Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 21, fdi: 34, code: '34', name: 'Lower Left 1st Premolar', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 20, fdi: 35, code: '35', name: 'Lower Left 2nd Premolar', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 19, fdi: 36, code: '36', name: 'Lower Left 1st Molar', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 18, fdi: 37, code: '37', name: 'Lower Left 2nd Molar', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 17, fdi: 38, code: '38', name: 'Lower Left 3rd Molar (Wisdom)', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
];

export const TOOTH_DATABASE = ODONTO_DATABASE;

export const RESTORATION_TYPES: {
  id: RestorationType;
  label: string;
  icon: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}[] = [
  { id: 'crown', label: 'Crown', icon: '👑', color: '#00d8fe', textColor: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-50 dark:bg-cyan-950/40', borderColor: 'border-cyan-500' },
  { id: 'bridge', label: 'Bridge Unit', icon: '🌉', color: '#6366f1', textColor: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-50 dark:bg-indigo-950/40', borderColor: 'border-indigo-500' },
  { id: 'veneer', label: 'Veneer', icon: '✨', color: '#a855f7', textColor: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-950/40', borderColor: 'border-purple-500' },
  { id: 'implant', label: 'Implant', icon: '🔩', color: '#f59e0b', textColor: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-950/40', borderColor: 'border-amber-500' },
  { id: 'inlay', label: 'Inlay / Onlay', icon: '💎', color: '#10b981', textColor: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/40', borderColor: 'border-emerald-500' },
  { id: 'extraction', label: 'Missing / Pontic', icon: '❌', color: '#f43f5e', textColor: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-50 dark:bg-rose-950/40', borderColor: 'border-rose-500' },
];

/**
 * High-definition anatomical rendering of Crown + Root (Facial / Buccal profile)
 * Exactly as requested in the reference sketch (Image 2), but modern, shaded, and aesthetic!
 */
function AnatomicalToothSketch({
  tooth,
  isSelected,
  restoration,
}: {
  tooth: ToothOdontoData;
  isSelected: boolean;
  restoration?: RestorationType;
}) {
  const isUpper = tooth.arch === 'upper';
  const resInfo = RESTORATION_TYPES.find(r => r.id === restoration);
  const strokeColor = isSelected ? (resInfo?.color || '#00d8fe') : 'currentColor';
  const fillColor = isSelected ? (resInfo ? `${resInfo.color}25` : 'rgba(0,216,254,0.18)') : 'transparent';
  const isImplant = isSelected && restoration === 'implant';
  const isExtraction = isSelected && restoration === 'extraction';

  return (
    <svg viewBox="0 0 34 82" className="w-full h-full overflow-visible drop-shadow-xs" fill="none">
      <defs>
        <linearGradient id={`grad-root-${tooth.universal}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isSelected ? strokeColor : '#94a3b8'} stopOpacity={isSelected ? 0.35 : 0.15} />
          <stop offset="100%" stopColor={isSelected ? strokeColor : '#cbd5e1'} stopOpacity={isSelected ? 0.6 : 0.3} />
        </linearGradient>
      </defs>

      {/* --- UPPER TEETH (Roots reach UP, Crown points DOWN) --- */}
      {isUpper ? (
        <g opacity={isExtraction ? 0.35 : 1}>
          {/* 1. ROOTS (Pointing Upwards) */}
          {isImplant ? (
            /* Titanium Implant Screw Fixture */
            <g stroke="#f59e0b" strokeWidth="1.4">
              <line x1="17" y1="8" x2="17" y2="44" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Thread ridges */}
              <line x1="12" y1="14" x2="22" y2="16" />
              <line x1="12" y1="20" x2="22" y2="22" />
              <line x1="12" y1="26" x2="22" y2="28" />
              <line x1="12" y1="32" x2="22" y2="34" />
              <line x1="12" y1="38" x2="22" y2="40" />
              {/* Implant Apex */}
              <polygon points="17,6 13,11 21,11" fill="#f59e0b" />
            </g>
          ) : tooth.category === 'molar' ? (
            /* 3 Roots: Mesiobuccal, Distobuccal, Palatal (convergent/spread) */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              <path d="M 8 46 C 7 30, 8 18, 9 8 C 11 14, 13 28, 14 44" />
              <path d="M 14 44 C 15 28, 16 16, 17 6 C 18 16, 19 28, 20 44" />
              <path d="M 20 44 C 21 28, 23 14, 25 8 C 26 18, 27 30, 26 46" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* 2 Roots pointing up */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              <path d="M 10 46 C 9 32, 11 18, 13 10 C 15 20, 16 35, 17 45" />
              <path d="M 17 45 C 18 35, 19 20, 21 10 C 23 18, 25 32, 24 46" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Canine: Longest single massive root */
            <path
              d="M 10 46 C 9 30, 14 12, 17 4 C 20 12, 25 30, 24 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : tooth.category === 'incisor_cen' ? (
            /* Central Incisor: Straight wide root */
            <path
              d="M 9 46 C 8 32, 13 16, 17 7 C 21 16, 26 32, 25 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : (
            /* Lateral Incisor: Delicate slender root */
            <path
              d="M 11 46 C 10 32, 14 18, 17 8 C 20 18, 24 32, 23 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          )}

          {/* CEJ Cervical Line (Gingival Margin) */}
          <path
            d="M 7 46 C 12 43, 22 43, 27 46"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 2. CROWN (Pointing Down towards Occlusal Line) */}
          {tooth.category === 'molar' ? (
            /* Upper Molar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 6 46 C 5 56, 6 68, 9 73 C 13 77, 21 77, 25 73 C 28 68, 29 56, 28 46 C 22 45, 12 45, 6 46 Z" />
              {/* Occlusal cusps groove */}
              <path d="M 11 72 C 14 74, 20 74, 23 72" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Upper Premolar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 46 C 7 56, 8 68, 11 73 C 14 76, 20 76, 23 73 C 26 68, 27 56, 26 46 Z" />
              <path d="M 13 72 C 15 74, 19 74, 21 72" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Upper Canine Crown: Pointed Apex */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 46 C 7 55, 9 66, 17 76 C 25 66, 27 55, 26 46 Z" />
              <line x1="17" y1="48" x2="17" y2="72" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </g>
          ) : (
            /* Upper Incisor Crown: Broad chisel incisal edge */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 7 46 C 7 56, 8 68, 10 75 C 13 77, 21 77, 24 75 C 26 68, 27 56, 27 46 Z" />
              <line x1="12" y1="60" x2="12" y2="74" strokeWidth="0.8" opacity="0.4" />
              <line x1="22" y1="60" x2="22" y2="74" strokeWidth="0.8" opacity="0.4" />
            </g>
          )}
        </g>
      ) : (
        /* --- LOWER TEETH (Crown points UP, Roots reach DOWN) --- */
        <g opacity={isExtraction ? 0.35 : 1}>
          {/* 1. CROWN (Pointing Upwards towards Occlusal Line) */}
          {tooth.category === 'molar' ? (
            /* Lower Molar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 6 36 C 5 26, 6 14, 9 9 C 13 5, 21 5, 25 9 C 28 14, 29 26, 28 36 C 22 37, 12 37, 6 36 Z" />
              <path d="M 11 10 C 14 8, 20 8, 23 10" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Lower Premolar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 36 C 7 26, 8 14, 11 9 C 14 6, 20 6, 23 9 C 26 14, 27 26, 26 36 Z" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Lower Canine Crown: Pointed apex */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 36 C 7 27, 9 16, 17 6 C 25 16, 27 27, 26 36 Z" />
              <line x1="17" y1="34" x2="17" y2="10" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </g>
          ) : (
            /* Lower Incisor Crown: Small chisel edge */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 36 C 8 26, 9 14, 11 7 C 13 5, 21 5, 23 7 C 25 14, 26 26, 26 36 Z" />
            </g>
          )}

          {/* CEJ Cervical Line */}
          <path
            d="M 7 36 C 12 39, 22 39, 27 36"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 2. ROOTS (Pointing Downwards towards the Mandible) */}
          {isImplant ? (
            /* Titanium Implant Screw Fixture */
            <g stroke="#f59e0b" strokeWidth="1.4">
              <line x1="17" y1="38" x2="17" y2="74" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="12" y1="44" x2="22" y2="42" />
              <line x1="12" y1="50" x2="22" y2="48" />
              <line x1="12" y1="56" x2="22" y2="54" />
              <line x1="12" y1="62" x2="22" y2="60" />
              <line x1="12" y1="68" x2="22" y2="66" />
              <polygon points="17,76 13,71 21,71" fill="#f59e0b" />
            </g>
          ) : tooth.category === 'molar' ? (
            /* Lower Molar: 2 Distinct Bifurcated Curved Roots */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              <path d="M 7 36 C 7 50, 8 64, 10 74 C 13 70, 15 54, 17 40 C 19 54, 21 70, 24 74 C 26 64, 27 50, 27 36" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Lower Canine: Long single root */
            <path
              d="M 9 36 C 8 50, 13 70, 17 78 C 21 70, 26 50, 25 36 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : tooth.category === 'premolar' ? (
            /* Lower Premolar: Tapered single root */
            <path
              d="M 10 36 C 9 48, 13 66, 17 74 C 21 66, 25 48, 24 36 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : (
            /* Lower Incisor: Slender single root */
            <path
              d="M 10 36 C 9 48, 13 65, 17 73 C 21 65, 25 48, 24 36 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          )}
        </g>
      )}

      {/* Extraction Cross Indicator */}
      {isExtraction && (
        <g stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="29" y2="70" />
          <line x1="29" y1="12" x2="5" y2="70" />
        </g>
      )}
    </svg>
  );
}

interface TeethChartProps {
  selected?: number[];
  selectedTeeth?: number[];
  onToggle?: (tooth: number) => void;
  onToggleTooth?: (tooth: number) => void;
  toothRestorations?: Record<number, RestorationType>;
  onAssignRestoration?: (tooth: number, type: RestorationType) => void;
  onClearAll?: () => void;
  readonly?: boolean;
  activeService?: string;
  showToolbar?: boolean;
  className?: string;
}

export function TeethChart({
  selected,
  selectedTeeth,
  onToggle,
  onToggleTooth,
  toothRestorations = {},
  onAssignRestoration,
  onClearAll,
  readonly = false,
  activeService,
  showToolbar = true,
  className = ''
}: TeethChartProps) {
  const activeSelected = selected ?? selectedTeeth ?? [];
  const handleToggle = onToggle ?? onToggleTooth;

  const [system, setSystem] = useState<ToothSystem>('universal');
  const [selectedTool, setSelectedTool] = useState<RestorationType>('crown');
  const [hoveredTooth, setHoveredTooth] = useState<ToothOdontoData | null>(null);

  // Grouped into standard 4 Quadrants
  const upperRight = ODONTO_DATABASE.filter(t => t.quadrant === 'UR'); // 1-8
  const upperLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'UL'); // 9-16
  const lowerRight = ODONTO_DATABASE.filter(t => t.quadrant === 'LR'); // 32-25
  const lowerLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'LL'); // 24-17

  const handleToothClick = (tooth: ToothOdontoData) => {
    if (readonly || !handleToggle) return;
    const num = tooth.universal;
    handleToggle(num);
    if (!activeSelected.includes(num) && onAssignRestoration) {
      onAssignRestoration(num, selectedTool);
    }
  };

  const handleSelectBatch = (type: 'all' | 'upper' | 'lower' | 'smile' | 'posteriors' | 'clear') => {
    if (readonly || (!handleToggle && !onClearAll)) return;
    if (type === 'clear') {
      if (onClearAll) {
        onClearAll();
      } else if (handleToggle) {
        activeSelected.forEach(num => handleToggle(num));
      }
      return;
    }

    let targets: ToothOdontoData[] = [];
    if (type === 'all') targets = ODONTO_DATABASE;
    if (type === 'upper') targets = ODONTO_DATABASE.filter(t => t.arch === 'upper');
    if (type === 'lower') targets = ODONTO_DATABASE.filter(t => t.arch === 'lower');
    if (type === 'smile') targets = ODONTO_DATABASE.filter(t => t.isAnterior);
    if (type === 'posteriors') targets = ODONTO_DATABASE.filter(t => !t.isAnterior);

    targets.forEach(t => {
      if (!activeSelected.includes(t.universal) && handleToggle) {
        handleToggle(t.universal);
        if (onAssignRestoration) {
          onAssignRestoration(t.universal, selectedTool);
        }
      }
    });
  };

  const renderToothUnit = (tooth: ToothOdontoData) => {
    const isSelected = activeSelected.includes(tooth.universal);
    const assignedRes = isSelected ? (toothRestorations[tooth.universal] || selectedTool) : undefined;
    const resInfo = RESTORATION_TYPES.find(r => r.id === assignedRes);
    const displayNum = system === 'universal' ? tooth.universal : tooth.fdi;

    return (
      <div
        key={tooth.universal}
        onClick={() => handleToothClick(tooth)}
        onMouseEnter={() => setHoveredTooth(tooth)}
        onMouseLeave={() => setHoveredTooth(null)}
        className={`group relative flex flex-col items-center justify-between p-1 rounded-xl cursor-pointer transition-all duration-150 select-none ${
          isSelected
            ? 'bg-cyan-500/10 dark:bg-cyan-500/15 ring-2 ring-cyan-400 shadow-md shadow-cyan-500/20'
            : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
        }`}
      >
        {/* Anatomical Sketch with Crown & Root */}
        <div className="w-7 sm:w-8 h-16 sm:h-20 flex items-center justify-center transition-transform group-hover:scale-105">
          <AnatomicalToothSketch
            tooth={tooth}
            isSelected={isSelected}
            restoration={assignedRes}
          />
        </div>

        {/* Tooth Number on the Occlusal Margin */}
        <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
          isSelected
            ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
            : 'text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
        }`}>
          {displayNum}
        </span>
      </div>
    );
  };

  return (
    <div className={`bg-white dark:bg-[#070b14] rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-lg shadow-cyan-950/5 select-none ${className}`}>
      {/* HEADER TOOLBAR */}
      {showToolbar && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
                <Activity className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                Anatomical Dental Odontogram (Universal 1–32)
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                {activeSelected.length} Selected
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Full anatomical facial view showing roots and crowns. Select teeth to prescribe clinical restorations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
            {/* Numbering System Switcher */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setSystem('universal')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  system === 'universal'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Universal (1-32)
              </button>
              <button
                type="button"
                onClick={() => setSystem('fdi')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  system === 'fdi'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                FDI (11-48)
              </button>
            </div>

            {/* Clear All */}
            {!readonly && activeSelected.length > 0 && (
              <button
                type="button"
                onClick={() => handleSelectBatch('clear')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900/30"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>
        </div>
      )}

      {/* RESTORATION PALETTE & QUICK ACTION BUTTONS */}
      {!readonly && showToolbar && (
        <div className="py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80">
          {/* Active Procedure Brush */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" /> Active Tool:
            </span>
            {RESTORATION_TYPES.map((res) => {
              const isCurrent = selectedTool === res.id;
              return (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setSelectedTool(res.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                    isCurrent
                      ? `${res.bgColor} ${res.borderColor} ${res.textColor} shadow-xs ring-1 ring-current`
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-sm">{res.icon}</span>
                  <span>{res.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Select Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleSelectBatch('upper')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              + Upper (1-16)
            </button>
            <button
              type="button"
              onClick={() => handleSelectBatch('lower')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              + Lower (17-32)
            </button>
            <button
              type="button"
              onClick={() => handleSelectBatch('smile')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800/40 transition-colors"
              title="Aesthetic Anterior Smile Zone (Canine to Canine)"
            >
              <Smile className="w-3.5 h-3.5" /> Smile Zone
            </button>
            <button
              type="button"
              onClick={() => handleSelectBatch('posteriors')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              + Posteriors
            </button>
          </div>
        </div>
      )}

      {/* ODONTOGRAM CROSS GRID (MATCHING IMAGE 2 EXACTLY) */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[620px] max-w-4xl mx-auto space-y-2">
          
          {/* 1. UPPER JAW (MAXILLA) - ROOTS POINT UP */}
          <div className="relative">
            {/* Upper Teeth Row */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-end">
              {/* Upper Right (UR 1 to 8) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {upperRight.map(renderToothUnit)}
              </div>

              {/* Central Vertical Midline Axis Separator */}
              <div className="w-px h-full bg-slate-300 dark:bg-slate-700 mx-2 relative flex items-center justify-center">
                <span className="absolute top-1 -translate-x-1/2 text-[9px] font-bold text-cyan-500 uppercase tracking-widest bg-white dark:bg-[#070b14] px-1">
                  UR | UL
                </span>
              </div>

              {/* Upper Left (UL 9 to 16) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {upperLeft.map(renderToothUnit)}
              </div>
            </div>
          </div>

          {/* 2. CENTRAL CROSS AXIS (Right ---------|--------- Left) */}
          <div className="relative flex items-center justify-between py-1 my-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 pl-2 shrink-0">
              Right
            </span>
            <div className="flex-1 h-0.5 bg-slate-300 dark:bg-slate-700 mx-3 relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-white dark:ring-[#070b14]" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 pr-2 shrink-0">
              Left
            </span>
          </div>

          {/* 3. LOWER JAW (MANDIBLE) - CROWNS POINT UP, ROOTS POINT DOWN */}
          <div className="relative">
            <div className="grid grid-cols-[1fr_auto_1fr] items-start">
              {/* Lower Right (LR 32 to 25) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {lowerRight.map(renderToothUnit)}
              </div>

              {/* Central Vertical Midline Axis */}
              <div className="w-px h-full bg-slate-300 dark:bg-slate-700 mx-2 relative flex items-center justify-center">
                <span className="absolute bottom-1 -translate-x-1/2 text-[9px] font-bold text-indigo-500 uppercase tracking-widest bg-white dark:bg-[#070b14] px-1">
                  LR | LL
                </span>
              </div>

              {/* Lower Left (LL 24 to 17) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {lowerLeft.map(renderToothUnit)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LIVE HOVER TOOTH INSPECTOR BAR */}
      <div className="h-9 flex items-center justify-between px-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800">
        {hoveredTooth ? (
          <div className="flex items-center gap-2 truncate">
            <span className="font-extrabold text-slate-900 dark:text-white">
              {hoveredTooth.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
              Universal #{hoveredTooth.universal} (FDI {hoveredTooth.fdi})
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Quadrant {hoveredTooth.quadrant} • {hoveredTooth.isAnterior ? 'Anterior Unit' : 'Posterior Unit'}
            </span>
          </div>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-500" />
            Hover over any tooth to view anatomical root structure and clinical position
          </span>
        )}

        {hoveredTooth && activeSelected.includes(hoveredTooth.universal) && (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 shrink-0">
            <Check className="w-4 h-4 stroke-[3]" /> Assigned: {toothRestorations[hoveredTooth.universal] || selectedTool}
          </span>
        )}
      </div>

      {/* SELECTED RESTORATION UNITS SUMMARY TAGS */}
      {activeSelected.length > 0 && (
        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-slate-700 dark:text-slate-300">Selected Units:</span>
            <div className="flex flex-wrap gap-1.5">
              {[...activeSelected].sort((a, b) => a - b).map((num) => {
                const t = ODONTO_DATABASE.find(item => item.universal === num);
                const display = system === 'universal' ? `#${num}` : `FDI ${t?.fdi || num}`;
                const res = toothRestorations[num] || selectedTool;
                const resInfo = RESTORATION_TYPES.find(r => r.id === res);

                return (
                  <span
                    key={num}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 font-mono font-bold border border-cyan-200 dark:border-cyan-800 shadow-xs"
                  >
                    <span>{display}</span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-sans font-medium">
                      ({resInfo?.label || res})
                    </span>
                    {!readonly && handleToggle && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(num);
                        }}
                        className="hover:text-rose-500 ml-1 transition-colors"
                        title="Remove selection"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="text-slate-500 font-medium font-mono text-xs">
            Total units for fabrication: <strong className="text-cyan-600 dark:text-cyan-400 font-black text-sm">{activeSelected.length}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
