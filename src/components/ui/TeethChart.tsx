import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, RotateCcw, Smile, Zap, Info, X, Activity
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
  // --- UPPER ARCH (Maxillary Arch) ---
  // Patient Right (UR: 1 to 8) - Displayed on Viewer's Left
  { universal: 1,  fdi: 18, code: '18', name: 'Upper Right 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 2,  fdi: 17, code: '17', name: 'Upper Right 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 3,  fdi: 16, code: '16', name: 'Upper Right 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 4,  fdi: 15, code: '15', name: 'Upper Right 2nd Premolar (Bicuspid)', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 5,  fdi: 14, code: '14', name: 'Upper Right 1st Premolar (2 Roots)', category: 'premolar', arch: 'upper', quadrant: 'UR', isAnterior: false },
  { universal: 6,  fdi: 13, code: '13', name: 'Upper Right Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 7,  fdi: 12, code: '12', name: 'Upper Right Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UR', isAnterior: true },
  { universal: 8,  fdi: 11, code: '11', name: 'Upper Right Central Incisor (Midline)', category: 'incisor_cen', arch: 'upper', quadrant: 'UR', isAnterior: true },

  // Patient Left (UL: 9 to 16) - Displayed on Viewer's Right
  { universal: 9,  fdi: 21, code: '21', name: 'Upper Left Central Incisor (Midline)', category: 'incisor_cen', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 10, fdi: 22, code: '22', name: 'Upper Left Lateral Incisor', category: 'incisor_lat', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 11, fdi: 23, code: '23', name: 'Upper Left Canine (Cuspid)', category: 'canine', arch: 'upper', quadrant: 'UL', isAnterior: true },
  { universal: 12, fdi: 24, code: '24', name: 'Upper Left 1st Premolar (2 Roots)', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 13, fdi: 25, code: '25', name: 'Upper Left 2nd Premolar (Bicuspid)', category: 'premolar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 14, fdi: 26, code: '26', name: 'Upper Left 1st Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 15, fdi: 27, code: '27', name: 'Upper Left 2nd Molar', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },
  { universal: 16, fdi: 28, code: '28', name: 'Upper Left 3rd Molar (Wisdom)', category: 'molar', arch: 'upper', quadrant: 'UL', isAnterior: false },

  // --- LOWER ARCH (Mandibular Arch) ---
  // Patient Right (LR: 32 to 25) - Displayed on Viewer's Left
  { universal: 32, fdi: 48, code: '48', name: 'Lower Right 3rd Molar (Wisdom)', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 31, fdi: 47, code: '47', name: 'Lower Right 2nd Molar', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 30, fdi: 46, code: '46', name: 'Lower Right 1st Molar (2 Roots)', category: 'molar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 29, fdi: 45, code: '45', name: 'Lower Right 2nd Premolar (1 Root)', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 28, fdi: 44, code: '44', name: 'Lower Right 1st Premolar (1 Root)', category: 'premolar', arch: 'lower', quadrant: 'LR', isAnterior: false },
  { universal: 27, fdi: 43, code: '43', name: 'Lower Right Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 26, fdi: 42, code: '42', name: 'Lower Right Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LR', isAnterior: true },
  { universal: 25, fdi: 41, code: '41', name: 'Lower Right Central Incisor (Midline)', category: 'incisor_cen', arch: 'lower', quadrant: 'LR', isAnterior: true },

  // Patient Left (LL: 24 to 17) - Displayed on Viewer's Right
  { universal: 24, fdi: 31, code: '31', name: 'Lower Left Central Incisor (Midline)', category: 'incisor_cen', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 23, fdi: 32, code: '32', name: 'Lower Left Lateral Incisor', category: 'incisor_lat', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 22, fdi: 33, code: '33', name: 'Lower Left Canine (Cuspid)', category: 'canine', arch: 'lower', quadrant: 'LL', isAnterior: true },
  { universal: 21, fdi: 34, code: '34', name: 'Lower Left 1st Premolar (1 Root)', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 20, fdi: 35, code: '35', name: 'Lower Left 2nd Premolar (1 Root)', category: 'premolar', arch: 'lower', quadrant: 'LL', isAnterior: false },
  { universal: 19, fdi: 36, code: '36', name: 'Lower Left 1st Molar (2 Roots)', category: 'molar', arch: 'lower', quadrant: 'LL', isAnterior: false },
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
 * Anatomically authentic facial profile sketch:
 * - Upper Arch: Roots reach UP, Crown points DOWN towards occlusal line
 *   * Upper Molars (1, 2, 3, 14, 15, 16): Exactly 3 roots (Mesiobuccal, Distobuccal, Palatal)
 *   * Upper 1st Premolars (5, 12): Bifurcated 2 roots (Buccal & Palatal)
 *   * Upper 2nd Premolars (4, 13): 1 single tapered root
 *   * Upper Canines (6, 11): 1 massive long root
 *   * Upper Incisors (7, 8, 9, 10): 1 single straight conical root
 * - Lower Arch: Crown points UP towards occlusal line, Roots reach DOWN
 *   * Lower Molars (17, 18, 19, 30, 31, 32): Exactly 2 roots (Mesial & Distal) - NEVER 3!
 *   * Lower Premolars (20, 21, 28, 29): 1 single root
 *   * Lower Canines & Incisors (22-27): 1 single root
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
  
  // Strictly prevent restoration styles when unselected
  const effectiveRestoration = isSelected ? restoration : undefined;
  const strokeColor = isSelected ? (resInfo?.color || '#00d8fe') : 'currentColor';
  const fillColor = isSelected ? (resInfo ? `${resInfo.color}25` : 'rgba(0,216,254,0.18)') : 'transparent';
  
  const isImplant = Boolean(isSelected && effectiveRestoration === 'implant');
  const isExtraction = Boolean(isSelected && effectiveRestoration === 'extraction');

  // Upper 1st Premolar (teeth 5 & 12) uniquely has 2 roots
  const isUpper1stPremolar = isUpper && (tooth.universal === 5 || tooth.universal === 12);

  return (
    <svg viewBox="0 0 34 84" className="w-full h-full overflow-visible drop-shadow-xs" fill="none">
      {/* ============================================================ */}
      {/* 1. UPPER TEETH: Roots reach UP, Crown points DOWN (to y=76)  */}
      {/* ============================================================ */}
      {isUpper ? (
        <g opacity={isExtraction ? 0.35 : 1}>
          {/* ROOTS (Pointing Upwards towards Maxillary Sinus) */}
          {isImplant ? (
            /* Titanium Implant Screw Fixture */
            <g stroke="#f59e0b" strokeWidth="1.4">
              <line x1="17" y1="8" x2="17" y2="44" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="12" y1="14" x2="22" y2="16" />
              <line x1="12" y1="20" x2="22" y2="22" />
              <line x1="12" y1="26" x2="22" y2="28" />
              <line x1="12" y1="32" x2="22" y2="34" />
              <line x1="12" y1="38" x2="22" y2="40" />
              <polygon points="17,6 13,11 21,11" fill="#f59e0b" />
            </g>
          ) : tooth.category === 'molar' ? (
            /* Upper Molar: STRICTLY 3 ROOTS (Mesiobuccal, Palatal, Distobuccal) */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              {/* Mesiobuccal Root (curving left) */}
              <path d="M 8 46 C 7 32, 7 18, 9 7 C 11 14, 13 28, 14 44" />
              {/* Palatal Root (longest, central) */}
              <path d="M 14 44 C 15 28, 16 14, 17 5 C 18 14, 19 28, 20 44" />
              {/* Distobuccal Root (curving right) */}
              <path d="M 20 44 C 21 28, 23 18, 25 7 C 27 18, 27 32, 26 46" />
            </g>
          ) : isUpper1stPremolar ? (
            /* Upper 1st Premolar (Teeth 5, 12): STRICTLY 2 ROOTS (Bifurcated) */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              <path d="M 9 46 C 8 32, 10 18, 12 8 C 14 18, 15 32, 16 45" />
              <path d="M 18 45 C 19 32, 20 18, 22 8 C 24 18, 26 32, 25 46" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Upper 2nd Premolar (Teeth 4, 13): 1 SINGLE TAPERED ROOT */
            <path
              d="M 10 46 C 9 32, 12 16, 17 8 C 22 16, 25 32, 24 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : tooth.category === 'canine' ? (
            /* Upper Canine: 1 Massive Long Root (Longest in the mouth) */
            <path
              d="M 9 46 C 8 30, 13 12, 17 4 C 21 12, 26 30, 25 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : tooth.category === 'incisor_cen' ? (
            /* Central Incisor: Straight wide root */
            <path
              d="M 9 46 C 8 32, 12 16, 17 7 C 22 16, 26 32, 25 46 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : (
            /* Lateral Incisor: Slender root */
            <path
              d="M 11 46 C 10 32, 13 18, 17 9 C 21 18, 24 32, 23 46 Z"
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

          {/* CROWN (Pointing Down towards Occlusal Line) */}
          {tooth.category === 'molar' ? (
            /* Upper Molar Crown: Multi-cusped */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 6 46 C 5 56, 6 68, 9 73 C 13 77, 21 77, 25 73 C 28 68, 29 56, 28 46 C 22 45, 12 45, 6 46 Z" />
              <path d="M 11 72 C 14 74, 20 74, 23 72" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Upper Premolar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 46 C 7 56, 8 68, 11 73 C 14 76, 20 76, 23 73 C 26 68, 27 56, 26 46 Z" />
              <path d="M 13 72 C 15 74, 19 74, 21 72" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Upper Canine Crown: Pointed Cusp Apex */
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
        /* ============================================================ */
        /* 2. LOWER TEETH: Crown points UP, Roots reach DOWN (to y=78)  */
        /* ============================================================ */
        <g opacity={isExtraction ? 0.35 : 1}>
          {/* CROWN (Pointing Upwards towards Occlusal Line) */}
          {tooth.category === 'molar' ? (
            /* Lower Molar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 6 38 C 5 28, 6 16, 9 11 C 13 7, 21 7, 25 11 C 28 16, 29 28, 28 38 C 22 39, 12 39, 6 38 Z" />
              <path d="M 11 12 C 14 10, 20 10, 23 12" strokeWidth="1" strokeLinecap="round" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Lower Premolar Crown */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 38 C 7 28, 8 16, 11 11 C 14 8, 20 8, 23 11 C 26 16, 27 28, 26 38 Z" />
            </g>
          ) : tooth.category === 'canine' ? (
            /* Lower Canine Crown: Pointed apex */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 38 C 7 29, 9 18, 17 8 C 25 18, 27 29, 26 38 Z" />
              <line x1="17" y1="36" x2="17" y2="12" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </g>
          ) : (
            /* Lower Incisor Crown: Slender chisel edge */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2.2' : '1.5'} fill={fillColor}>
              <path d="M 8 38 C 8 28, 9 16, 11 9 C 13 7, 21 7, 23 9 C 25 16, 26 28, 26 38 Z" />
            </g>
          )}

          {/* CEJ Cervical Line */}
          <path
            d="M 7 38 C 12 41, 22 41, 27 38"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* ROOTS (Pointing Downwards into Mandible) */}
          {isImplant ? (
            /* Titanium Implant Screw Fixture */
            <g stroke="#f59e0b" strokeWidth="1.4">
              <line x1="17" y1="40" x2="17" y2="76" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="12" y1="46" x2="22" y2="44" />
              <line x1="12" y1="52" x2="22" y2="50" />
              <line x1="12" y1="58" x2="22" y2="56" />
              <line x1="12" y1="64" x2="22" y2="62" />
              <line x1="12" y1="70" x2="22" y2="68" />
              <polygon points="17,78 13,73 21,73" fill="#f59e0b" />
            </g>
          ) : tooth.category === 'molar' ? (
            /* Lower Molar: STRICTLY 2 DISTINCT SEPARATE ROOTS (Mesial & Distal) - NEVER 3 */
            <g stroke={strokeColor} strokeWidth={isSelected ? '2' : '1.4'} fill={fillColor}>
              {/* Mesial Root (Left) */}
              <path d="M 7 38 C 6 50, 7 66, 10 78 C 12 78, 13.5 74, 14.5 62 C 15 54, 15 44, 14 38 Z" />
              {/* Distal Root (Right) */}
              <path d="M 20 38 C 19 44, 19 54, 19.5 62 C 20 74, 22 78, 24 76 C 27 66, 28 50, 27 38 Z" />
            </g>
          ) : tooth.category === 'premolar' ? (
            /* Lower Premolars (20, 21, 28, 29): STRICTLY 1 SINGLE TAPERED ROOT */
            <path
              d="M 10 38 C 9 50, 13 68, 17 76 C 21 68, 25 50, 24 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : tooth.category === 'canine' ? (
            /* Lower Canine: Long single root */
            <path
              d="M 9 38 C 8 50, 13 70, 17 80 C 21 70, 26 50, 25 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          ) : (
            /* Lower Incisor: Slender single root */
            <path
              d="M 11 38 C 10 50, 13 68, 17 76 C 21 68, 24 50, 23 38 Z"
              stroke={strokeColor}
              strokeWidth={isSelected ? '2' : '1.4'}
              fill={fillColor}
            />
          )}
        </g>
      )}

      {/* Extraction Cross Indicator (Only when selected and procedure is extraction) */}
      {isExtraction && (
        <g stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="29" y2="72" />
          <line x1="29" y1="12" x2="5" y2="72" />
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

  // Grouped into the standard 4 quadrants
  // Viewer Left (Patient Right):
  const upperRight = ODONTO_DATABASE.filter(t => t.quadrant === 'UR'); // 1 to 8 (Left to Right: 1 at far left, 8 at midline)
  const lowerRight = ODONTO_DATABASE.filter(t => t.quadrant === 'LR'); // 32 to 25 (Left to Right: 32 at far left, 25 at midline)
  
  // Viewer Right (Patient Left):
  const upperLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'UL'); // 9 to 16 (Left to Right: 9 at midline, 16 at far right)
  const lowerLeft  = ODONTO_DATABASE.filter(t => t.quadrant === 'LL'); // 24 to 17 (Left to Right: 24 at midline, 17 at far right)

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
        [...activeSelected].forEach(num => handleToggle(num));
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
              Universal Numbering System • Anatomically verified roots (2 roots for lower molars, 3 roots for upper molars).
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

      {/* ODONTOGRAM CROSS GRID (UNIVERSAL NUMBERING & QUADRANTS) */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[660px] max-w-4xl mx-auto space-y-3">
          
          {/* 1. UPPER QUADRANTS LABEL STRIP */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-xs">
            {/* Upper Right Quadrant (Patient Right, Viewer Left) */}
            <div className="flex items-center justify-between pb-1.5 px-1 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-extrabold text-[11px] border border-cyan-500/20">
                  UR
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Maxillary Right (يمين المريض العلوي)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">#1 ➔ #8</span>
            </div>

            {/* Midline Spacer */}
            <div className="w-12 flex justify-center text-[10px] font-mono text-slate-400 font-bold shrink-0">
              |
            </div>

            {/* Upper Left Quadrant (Patient Left, Viewer Right) */}
            <div className="flex items-center justify-between pb-1.5 px-1 border-b border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 font-bold">#9 ➔ #16</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Maxillary Left (يسار المريض العلوي)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-extrabold text-[11px] border border-blue-500/20">
                  UL
                </span>
              </div>
            </div>
          </div>

          {/* 2. UPPER JAW (MAXILLA) - ROOTS POINT UP */}
          <div className="relative">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end">
              {/* Upper Right (UR 1 to 8: left to right) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {upperRight.map(renderToothUnit)}
              </div>

              {/* Central Vertical Midline Axis Separator */}
              <div className="w-12 h-full relative flex items-center justify-center shrink-0">
                <div className="absolute inset-y-0 w-px bg-slate-300 dark:bg-slate-700" />
                <span className="relative z-10 whitespace-nowrap px-1.5 py-0.5 text-[10px] font-mono font-black tracking-tight text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs select-none">
                  8 | 9
                </span>
              </div>

              {/* Upper Left (UL 9 to 16: left to right) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {upperLeft.map(renderToothUnit)}
              </div>
            </div>
          </div>

          {/* 3. CENTRAL OCCLUSAL CROSS AXIS (Patient Right ---------|--------- Patient Left) */}
          <div className="relative flex items-center justify-between py-2 my-1">
            <div className="flex items-center gap-2 pl-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                PATIENT RIGHT (يمين المريض)
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500/40 via-slate-300 dark:via-slate-700 to-blue-500/40 mx-4 relative flex items-center justify-center">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shadow-2xs">
                MIDLINE • خط المنتصف
              </span>
            </div>

            <div className="flex items-center gap-2 pr-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                PATIENT LEFT (يسار المريض)
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
            </div>
          </div>

          {/* 4. LOWER JAW (MANDIBLE) - CROWNS POINT UP, ROOTS POINT DOWN */}
          <div className="relative">
            <div className="grid grid-cols-[1fr_auto_1fr] items-start">
              {/* Lower Right (LR 32 to 25: left to right, 25 at midline) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {lowerRight.map(renderToothUnit)}
              </div>

              {/* Central Vertical Midline Axis Separator */}
              <div className="w-12 h-full relative flex items-center justify-center shrink-0">
                <div className="absolute inset-y-0 w-px bg-slate-300 dark:bg-slate-700" />
                <span className="relative z-10 whitespace-nowrap px-1.5 py-0.5 text-[10px] font-mono font-black tracking-tight text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs select-none">
                  25 | 24
                </span>
              </div>

              {/* Lower Left (LL 24 to 17: left to right, 24 at midline) */}
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {lowerLeft.map(renderToothUnit)}
              </div>
            </div>
          </div>

          {/* 5. LOWER QUADRANTS LABEL STRIP */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-xs">
            {/* Lower Right Quadrant (Patient Right, Viewer Left) */}
            <div className="flex items-center justify-between pt-1.5 px-1 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-extrabold text-[11px] border border-indigo-500/20">
                  LR
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Mandibular Right (يمين المريض السفلي)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">#32 ➔ #25</span>
            </div>

            {/* Midline Spacer */}
            <div className="w-12 flex justify-center text-[10px] font-mono text-slate-400 font-bold shrink-0">
              |
            </div>

            {/* Lower Left Quadrant (Patient Left, Viewer Right) */}
            <div className="flex items-center justify-between pt-1.5 px-1 border-t border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 font-bold">#24 ➔ #17</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Mandibular Left (يسار المريض السفلي)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-extrabold text-[11px] border border-purple-500/20">
                  LL
                </span>
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
            Hover over any tooth to view anatomical root structure, quadrant alignment, and clinical specs
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
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 font-mono font-bold border border-cyan-200 dark:border-cyan-800 shadow-2xs"
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
