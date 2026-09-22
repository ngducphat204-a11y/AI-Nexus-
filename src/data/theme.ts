import { WorkspaceTheme } from '../types';

export interface ThemeConfig {
  id: WorkspaceTheme;
  name: string;
  tagline: string;
  badge: string;
  badgeBg: string;
  iconColor: string;
  activeIndicator: string;
  
  // Base Canvas & Grid
  bgCanvas: string;
  gridStroke: string;
  gridPatternColor: string;
  
  // Accents & Borders
  accentText: string;
  accentBadgeBg: string;
  accentBorder: string;
  accentIconBg: string;
  cardBg: string;
  
  // Primary CTA Buttons
  primaryBtn: string;
  primaryBtnHover: string;
  secondaryBtn: string;
  stepperActive: string;
  navActive: string;
  
  // CAD Blueprint Specifics
  cadOuterWall: string;
  cadInnerWall: string;
  cadLabelText: string;
  cadToolActive: string;
  cadDropzone: string;
  cadCloudIcon: string;
  roomColors: {
    room1: { fill: string; stroke: string };
    room2: { fill: string; stroke: string };
    room3: { fill: string; stroke: string };
    room4: { fill: string; stroke: string };
  };
}

export const WORKSPACE_THEMES: Record<WorkspaceTheme, ThemeConfig> = {
  'steel-blue': {
    id: 'steel-blue',
    name: 'Xanh Thép & Lam Hồ',
    tagline: 'Dịu mắt, chuẩn CAD / Revit, giảm căng thẳng thị giác',
    badge: 'Khuyên dùng',
    badgeBg: 'bg-sky-500/15',
    iconColor: '#38bdf8',
    activeIndicator: 'bg-sky-400',
    
    bgCanvas: '#090e1a',
    cardBg: 'bg-[#0e1628]',
    gridStroke: 'rgba(56, 189, 248, 0.06)',
    gridPatternColor: '#38bdf8',
    
    accentText: 'text-sky-400',
    accentBadgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    accentBorder: 'border-sky-500/25',
    accentIconBg: 'bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    
    primaryBtn: 'bg-sky-600 hover:bg-sky-500 text-white font-semibold border border-sky-400/30 shadow-[0_2px_12px_rgba(2,132,199,0.3)]',
    primaryBtnHover: 'hover:bg-sky-500',
    secondaryBtn: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold',
    stepperActive: 'bg-sky-600 text-white font-bold shadow-sm border border-sky-400/40',
    navActive: 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#38bdf8',
    cadInnerWall: '#0284c7',
    cadLabelText: '#7dd3fc',
    cadToolActive: 'bg-sky-600 text-white font-bold shadow-sm border border-sky-400/40',
    cadDropzone: 'border-sky-500/35 hover:border-sky-400 bg-sky-950/15 hover:bg-sky-950/25',
    cadCloudIcon: 'bg-sky-500/15 border-sky-500/30 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(56, 189, 248, 0.18)', stroke: '#38bdf8' },
      room2: { fill: 'rgba(14, 165, 233, 0.18)', stroke: '#0ea5e9' },
      room3: { fill: 'rgba(99, 102, 241, 0.18)', stroke: '#818cf8' },
      room4: { fill: 'rgba(20, 184, 166, 0.18)', stroke: '#2dd4bf' },
    }
  },
  
  'sage-green': {
    id: 'sage-green',
    name: 'Xanh Xô Thơm & Bạc Hà',
    tagline: 'Êm dịu nhất cho mắt người, tối ưu làm việc ca đêm',
    badge: 'Êm dịu',
    badgeBg: 'bg-emerald-500/15',
    iconColor: '#34d399',
    activeIndicator: 'bg-emerald-400',
    
    bgCanvas: '#081210',
    cardBg: 'bg-[#0b1a16]',
    gridStroke: 'rgba(52, 211, 153, 0.06)',
    gridPatternColor: '#34d399',
    
    accentText: 'text-emerald-400',
    accentBadgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    accentBorder: 'border-emerald-500/25',
    accentIconBg: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border border-emerald-400/30 shadow-[0_2px_12px_rgba(16,185,129,0.3)]',
    primaryBtnHover: 'hover:bg-emerald-500',
    secondaryBtn: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold',
    stepperActive: 'bg-emerald-600 text-white font-bold shadow-sm border border-emerald-400/40',
    navActive: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#34d399',
    cadInnerWall: '#059669',
    cadLabelText: '#6ee7b7',
    cadToolActive: 'bg-emerald-600 text-white font-bold shadow-sm border border-emerald-400/40',
    cadDropzone: 'border-emerald-500/35 hover:border-emerald-400 bg-emerald-950/15 hover:bg-emerald-950/25',
    cadCloudIcon: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(52, 211, 153, 0.18)', stroke: '#34d399' },
      room2: { fill: 'rgba(16, 185, 129, 0.18)', stroke: '#10b981' },
      room3: { fill: 'rgba(20, 184, 166, 0.18)', stroke: '#14b8a6' },
      room4: { fill: 'rgba(101, 163, 13, 0.18)', stroke: '#84cc16' },
    }
  },
  
  'muted-sand': {
    id: 'muted-sand',
    name: 'Cát Ấm & Than Trầm',
    tagline: 'Tone ấm tự nhiên, đã hạ bão hòa 60% không gây chói',
    badge: 'Ấm mờ',
    badgeBg: 'bg-amber-500/15',
    iconColor: '#f59e0b',
    activeIndicator: 'bg-amber-400',
    
    bgCanvas: '#111114',
    cardBg: 'bg-[#18181c]',
    gridStroke: 'rgba(217, 119, 6, 0.05)',
    gridPatternColor: '#d97706',
    
    accentText: 'text-amber-400',
    accentBadgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    accentBorder: 'border-amber-500/25',
    accentIconBg: 'bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    
    primaryBtn: 'bg-amber-700/90 hover:bg-amber-600 text-amber-50 font-semibold border border-amber-500/30 shadow-[0_2px_12px_rgba(217,119,6,0.25)]',
    primaryBtnHover: 'hover:bg-amber-600',
    secondaryBtn: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold',
    stepperActive: 'bg-amber-700 text-amber-50 font-bold shadow-sm border border-amber-500/40',
    navActive: 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
    
    cadOuterWall: '#d97706',
    cadInnerWall: '#b45309',
    cadLabelText: '#fcd34d',
    cadToolActive: 'bg-amber-700 text-amber-50 font-bold shadow-sm border border-amber-500/40',
    cadDropzone: 'border-amber-500/35 hover:border-amber-400 bg-amber-950/15 hover:bg-amber-950/25',
    cadCloudIcon: 'bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    roomColors: {
      room1: { fill: 'rgba(217, 119, 6, 0.18)', stroke: '#d97706' },
      room2: { fill: 'rgba(180, 83, 9, 0.18)', stroke: '#b45309' },
      room3: { fill: 'rgba(161, 98, 7, 0.18)', stroke: '#a16207' },
      room4: { fill: 'rgba(202, 138, 4, 0.18)', stroke: '#ca8a04' },
    }
  }
};
