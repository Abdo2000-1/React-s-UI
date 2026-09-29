import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Activity, Star } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('jessica.ruiz@dentalab.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('dentalab-auth', 'true');
      navigate('/dashboard');
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 font-sans">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562330743-fbc6ef07ca78?w=1200&h=1600&fit=crop&auto=format&q=80" 
            alt="Dental Lab" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-cyan-950/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12 h-full">
          {/* Logo & Tagline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 text-2xl font-extrabold mb-4 text-white">
              <Activity className="w-8 h-8 text-cyan-400" />
              <span>DentaLab <span className="text-cyan-400 font-mono text-sm px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30">React</span></span>
            </div>
            <p className="text-xl font-light text-cyan-100 max-w-md">
              From scan to delivery — all in one modern reactive platform
            </p>
          </motion.div>

          {/* Testimonial & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex text-amber-400 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg italic mb-4 text-white/90">
                "DentaLab's platform has completely transformed our workflow. 
                We've reduced turnaround times by 30% and eliminated communication errors."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  AP
                </div>
                <div>
                  <div className="font-semibold text-white">Dr. Allison Park</div>
                  <div className="text-sm text-cyan-200">Park Dental Associates</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950/60 backdrop-blur rounded-xl p-4 border border-cyan-500/20">
                <div className="text-2xl font-bold text-white mb-1">1,200+</div>
                <div className="text-xs text-cyan-200 uppercase tracking-wider font-mono">Orders/month</div>
              </div>
              <div className="bg-slate-950/60 backdrop-blur rounded-xl p-4 border border-cyan-500/20">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-cyan-200 uppercase tracking-wider font-mono">On-time delivery</div>
              </div>
              <div className="bg-slate-950/60 backdrop-blur rounded-xl p-4 border border-cyan-500/20">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-xs text-cyan-200 uppercase tracking-wider font-mono">Partner clinics</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-24 bg-white dark:bg-[#0b1120] relative transition-colors duration-200">
        <motion.div 
          className="max-w-md w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center space-x-2 text-2xl font-bold mb-12 text-slate-900 dark:text-white">
            <Activity className="w-8 h-8 text-cyan-500" />
            <span>DentaLab</span>
          </div>

          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 dark:text-slate-400">Sign in to manage your orders and dental lab workflow.</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 dark:border-slate-700 rounded cursor-pointer"
                defaultChecked
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                Remember me for 30 days
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md shadow-cyan-500/20 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </motion.div>
          </form>
          
          <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:underline">Privacy Policy</a>.
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Version */}
        <div className="absolute bottom-6 w-full text-center left-0 text-xs text-slate-400 font-mono">
          DentaLab OS v2.4.1 • React 19 Core
        </div>
      </div>
    </div>
  );
}
