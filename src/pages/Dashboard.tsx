import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { LoadingState } from '@/components/ui/LoadingState';
import { formatDate, timeAgo, formatCurrency } from '@/utils/format';
import { api } from '@/services/api';
import { useFetch } from '@/hooks/useFetch';
import { sound } from '@/utils/sound';
import { 
  Plus, Calendar, AlertCircle, FileText, ClipboardList, CheckCircle, 
  Activity, ArrowUpRight, DollarSign, Clock, RefreshCw, ChevronRight, ChevronLeft, Bell,
  TrendingUp, BarChart3, LineChart as LineChartIcon, ScanLine, ShieldAlert, Sparkles
} from 'lucide-react';

import { useStore } from '@/hooks/useStore';

const WORKFLOW_STAGES = [
  { name: 'New', color: 'bg-slate-400' },
  { name: 'Review', color: 'bg-amber-500' },
  { name: 'Design', color: 'bg-cyan-500' },
  { name: 'Production', color: 'bg-blue-600' },
  { name: 'Quality Check', color: 'bg-purple-500' },
  { name: 'Ready', color: 'bg-emerald-500' },
];

// Custom World-Class Glassmorphic Tooltip
const CustomDashboardTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 dark:bg-black/95 text-white p-3.5 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 text-xs min-w-[170px] space-y-2">
        <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
          <span className="font-semibold text-gray-300">{label}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">Live</span>
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-bold font-mono text-white text-sm">
              {entry.value} orders
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [chartView, setChartView] = useState<'area' | 'bar'>('area');
  const [weekRange, setWeekRange] = useState<number>(8);
  const [refreshing, setRefreshing] = useState(false);
  const urgentScrollRef = useRef<HTMLDivElement>(null);

  const allOrders = useStore(s => s.getOrders());
  const allCases = useStore(s => s.getCases());
  const allNotifs = useStore(s => s.getNotifications());
  const changeRequests = useStore(s => s.getChangeRequests());
  const { data: volume, loading: volumeLoading } = useFetch(api.getDashboardVolume);

  const handleRefresh = () => {
    setRefreshing(true);
    sound.playPop();
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const scrollUrgent = (dir: 'left' | 'right') => {
    if (urgentScrollRef.current) {
      urgentScrollRef.current.scrollBy({
        left: dir === 'left' ? -320 : 320,
        behavior: 'smooth'
      });
      sound.playClick();
    }
  };

  if (volumeLoading && allOrders.length === 0) {
    return <LoadingState text="Loading dashboard metrics..." />;
  }

  const urgentOrders = allOrders.filter(o => o.priority === 'Urgent');
  const recentOrders = [...allOrders].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 7);

  const stats = {
    totalOrders: allOrders.length,
    activeCases: allCases.filter(c => c.status !== 'Closed').length,
    pendingReview: allOrders.filter(o => o.status === 'Review').length,
    completedToday: allOrders.filter(o => o.status === 'Completed').length,
  };

  const workflowCounts = WORKFLOW_STAGES.map(stage => ({
    name: stage.name,
    count: allOrders.filter(o => o.status === stage.name).length,
    color: stage.color,
  }));

  const weeksList = (volume as any)?.weeks || (Array.isArray(volume) ? volume : []);
  const chartData = weeksList.slice(-weekRange).map((w: any) => ({
    week: w.weekLabel || w.week || 'Week',
    received: w.days ? w.days.reduce((s: number, d: any) => s + (d.orders || 0), 0) : (w.received || 0),
    completed: w.days ? w.days.reduce((s: number, d: any) => s + (d.completed || 0), 0) : (w.completed || 0),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header with Purposeful Operations Toolbar (No Duplicate + New Order) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Good morning, Jessica</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            {formatDate(new Date().toISOString())} • Lab Overview
          </p>
        </div>

        {/* Studio Operations Toolbar */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CAD Pipeline Live</span>
          </div>

          <button
            onClick={() => { sound.playClick(); navigate('/scan-center'); }}
            className="inline-flex items-center justify-center px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-1.5"
          >
            <ScanLine className="w-4 h-4 text-cyan-500" />
            <span>Intake Scans</span>
          </button>

          <button
            onClick={handleRefresh}
            className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Urgent Orders Alert Bar - Ultra-Slim Compact Executive Ticker */}
      {urgentOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 dark:bg-rose-950/30 px-3.5 py-2 flex items-center justify-between gap-3 shadow-xs"
        >
          {/* Left badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-rose-500" />
                <span className="hidden sm:inline">Critical Rush:</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-xs">
                {urgentOrders.length} Urgent
              </span>
            </div>
          </div>

          {/* Center: Scrollable compact pills */}
          <div 
            ref={urgentScrollRef}
            className="flex-1 flex items-center gap-2 overflow-x-auto scroll-smooth py-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {urgentOrders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => { sound.playClick(); navigate(`/orders/${order.id}`); }}
                className="shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-rose-200/80 dark:border-rose-900/60 hover:border-rose-400 text-xs transition-all shadow-xs group cursor-pointer"
              >
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px] group-hover:text-rose-600 dark:group-hover:text-rose-400">
                  {order.orderNumber}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px] truncate max-w-[110px]">
                  {order.patientName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
                  Due {formatDate(order.dueDate)}
                </span>
                <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollUrgent('left')}
              className="p-1 rounded-md border border-rose-200 dark:border-rose-900 bg-white/60 dark:bg-slate-900/60 hover:bg-rose-50 text-rose-700 dark:text-rose-300 transition-colors cursor-pointer"
              title="Previous"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => scrollUrgent('right')}
              className="p-1 rounded-md border border-rose-200 dark:border-rose-900 bg-white/60 dark:bg-slate-900/60 hover:bg-rose-50 text-rose-700 dark:text-rose-300 transition-colors cursor-pointer"
              title="Next"
            >
              <ChevronRight size={13} />
            </button>
            <button
              type="button"
              onClick={() => { sound.playClick(); navigate('/workflow-board'); }}
              className="hidden md:flex text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 items-center gap-1 px-2.5 py-1 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-rose-200 dark:border-rose-900 transition-colors cursor-pointer"
            >
              <span>Board</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Stat Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/orders')}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</span>
            <span className="ml-2 text-xs font-semibold text-green-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8.4%
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/cases')}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Cases</span>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeCases}</span>
            <span className="ml-2 text-xs text-gray-500">Across clinics</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/orders')}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Review</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingReview}</span>
            <span className="ml-2 text-xs text-amber-600 font-medium">Needs technician check</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/orders')}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Today</span>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completedToday}</span>
            <span className="ml-2 text-xs text-green-600 font-medium">Ready for shipment</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Volume Chart with Top 50 UI Finish */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Order Volume Analytics
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  High-resolution production throughput & delivery volume
                </p>
              </div>

              {/* Chart Mode & Range Controls */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                {/* 4w vs 8w */}
                <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700/60 p-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => setWeekRange(4)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${weekRange === 4 ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-xs' : 'hover:text-gray-900'}`}
                  >
                    4 Weeks
                  </button>
                  <button
                    onClick={() => setWeekRange(8)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${weekRange === 8 ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-xs' : 'hover:text-gray-900'}`}
                  >
                    8 Weeks
                  </button>
                </div>

                {/* Area vs Bar Toggle */}
                <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700/60 p-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => setChartView('area')}
                    className={`p-1 rounded-md transition-colors ${chartView === 'area' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'hover:text-gray-900'}`}
                    title="Smooth Spline Area"
                  >
                    <LineChartIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setChartView('bar')}
                    className={`p-1 rounded-md transition-colors ${chartView === 'bar' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'hover:text-gray-900'}`}
                    title="Rounded Precision Bars"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartView === 'area' ? (
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <Tooltip content={<CustomDashboardTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="received" 
                      name="Received" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorReceived)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      name="Completed" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorCompleted)" 
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <Tooltip content={<CustomDashboardTooltip />} />
                    <Bar dataKey="received" name="Received" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center items-center gap-6 pt-3 mt-1 border-t border-gray-100 dark:border-gray-700/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">Orders Received</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">Completed Restorations</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Latest prescription updates</p>
              </div>
              <button 
                onClick={() => navigate('/orders')}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                View all orders <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <div className="w-full">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restoration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                  {recentOrders.map(order => (
                    <tr 
                      key={order.id} 
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 dark:text-blue-400">{order.orderNumber}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{order.patientName}</td>
                      <td className="hidden sm:table-cell px-4 py-3 text-gray-500 dark:text-gray-400">{order.restoration}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="hidden md:table-cell px-4 py-3"><PriorityBadge priority={order.priority} /></td>
                      <td className="hidden lg:table-cell px-4 py-3 text-gray-500 text-right">{timeAgo(order.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Workflow Status Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Workflow Status</h2>
            <div className="space-y-4">
              {workflowCounts.map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>{item.name}</span>
                    <span>{item.count} orders</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${item.color}`} 
                      style={{ width: `${Math.min((item.count / (allOrders.length || 1)) * 250, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-5">
              {allNotifs.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex relative">
                  {index !== Math.min(allNotifs.length, 5) - 1 && (
                    <div className="absolute top-8 left-4 bottom-[-20px] w-0.5 bg-gray-200 dark:bg-gray-700" />
                  )}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0 mr-3">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.message}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{timeAgo(item.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/notifications')}
              className="w-full mt-6 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border dark:border-gray-700">
          <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-xl mr-4">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Estimated Revenue</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(allOrders.reduce((s, o) => s + o.amount, 0))}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border dark:border-gray-700">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl mr-4">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Avg. Turnaround</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">2.4 Days</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border dark:border-gray-700">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl mr-4">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Change Requests</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{changeRequests?.length || 4} Open</p>
          </div>
        </div>
      </div>
    </div>
  );
}
