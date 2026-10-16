import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Target,
  Clock3,
  CheckCircle2,
  Github,
  Award,
  Link2,
  BookOpen,
  MessageCircle,
  UserRound,
  Compass,
  AlertCircle,
  Play,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  UserProfile,
  ReadinessScore,
  SkillItem,
  Tab,
  ActivityFeedItem,
} from '../../types/career'

interface OverviewViewProps {
  profile: UserProfile
  score: ReadinessScore
  skills: SkillItem[]
  activity: ActivityFeedItem[]
  onSelectTab: (tab: Tab) => void
  onOpenAnalyze: () => void
  onOpenAddEvidence: () => void
  onOpenWatchIntro: () => void
}

type TimeRange = '6w' | '3m' | 'semester'

const trajectoryDataMap: Record<TimeRange, { week: string; score: number; coverage: number }[]> = {
  '6w': [
    { week: 'W1', score: 52, coverage: 45 },
    { week: 'W2', score: 55, coverage: 50 },
    { week: 'W3', score: 58, coverage: 58 },
    { week: 'W4', score: 62, coverage: 65 },
    { week: 'W5', score: 67, coverage: 72 },
    { week: 'W6', score: 74, coverage: 81 },
  ],
  '3m': [
    { week: 'Aug W1', score: 44, coverage: 38 },
    { week: 'Aug W3', score: 48, coverage: 42 },
    { week: 'Sep W1', score: 53, coverage: 49 },
    { week: 'Sep W3', score: 59, coverage: 58 },
    { week: 'Oct W1', score: 66, coverage: 70 },
    { week: 'Oct W3', score: 74, coverage: 81 },
  ],
  semester: [
    { week: 'Jun', score: 38, coverage: 30 },
    { week: 'Jul', score: 45, coverage: 40 },
    { week: 'Aug', score: 51, coverage: 48 },
    { week: 'Sep', score: 60, coverage: 62 },
    { week: 'Oct', score: 74, coverage: 81 },
  ],
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  profile,
  score,
  activity,
  onSelectTab,
  onOpenAnalyze,
  onOpenAddEvidence,
  onOpenWatchIntro,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('6w')
  const chartData = trajectoryDataMap[timeRange]

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          HERO SECTION — CINEMATIC MOUNTAIN LANDSCAPE (Apple Design Direction)
         ========================================================================= */}
      <section className="mountain-hero-container min-h-[460px] sm:min-h-[500px] flex items-center p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Cinematic Mountain Sunrise Image Background */}
        <div className="mountain-hero-bg" />

        {/* Ambient Gradient Blend (Smoothly dissolving mountain into pale canvas) */}
        <div className="mountain-hero-overlay" />

        {/* Hero Content Grid: Left Editorial Copy, Right Frosted Glass Score Panel */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Supporting Text, and Action Buttons (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-slate-800 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono uppercase text-[10.5px] tracking-wide">
                Provenix AI Intelligence Brief
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.12]">
              Making your potential{' '}
              <span className="italic font-serif font-normal text-blue-700">
                undeniably verifiable.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-normal">
              Provenix analyzes your skills, projects, and evidence to give you a clear, data-driven view of your career readiness — and a roadmap to get you there.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('Profile & evidence')}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold tracking-tight transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center gap-2 group"
              >
                <span>Explore Your Profile</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenWatchIntro}
                className="px-5 py-3 rounded-2xl bg-white/80 hover:bg-white text-slate-800 border border-slate-200/80 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Play size={10} className="ml-0.5 fill-blue-600" />
                </div>
                <span>Watch Introduction</span>
              </button>
            </div>
          </div>

          {/* Right Column: Prominent Frosted-Glass Readiness Index Panel (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-hero-card rounded-3xl p-6 sm:p-7 space-y-5 transition-transform duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Readiness Index
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <TrendingUp size={12} className="text-emerald-600" />
                  +{score.trend.change} points
                </span>
              </div>

              {/* Score Display Row */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-extrabold text-5xl sm:text-6xl text-slate-900 tracking-tight">
                      {score.overall}
                    </span>
                    <span className="text-sm font-mono text-slate-400 font-medium">/ 100</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium block mt-1">
                    Calibrated against <strong>{profile.targetRole}</strong> rubric
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">
                    {score.confidenceLevel} Confidence
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {score.confidence}% evidence coverage
                  </div>
                </div>
              </div>

              {/* Refined Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${score.overall}%` }}
                />
              </div>

              {/* Status and Action Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck size={14} className="text-blue-600" />
                  <span>14 verified code & credential artifacts</span>
                </div>
                <button
                  onClick={onOpenAnalyze}
                  className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Recalibrate</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="text-[10px] font-mono text-slate-400 text-center">
                Demo score model calibrated from active profile state
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUMMARY CARDS (Below Hero)
         ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Readiness Diagnostics
          </span>
          <span className="text-[10.5px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
            Demonstration Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Evidence Confidence */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-apple hover:shadow-apple-hover transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Evidence Confidence
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={17} />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                81%
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                14 verifiable code, commit, and credential artifacts ground this score.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('ProofGraph')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between w-full"
            >
              <span>Inspect Sources</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: Proof Completeness */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-apple hover:shadow-apple-hover transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Proof Completeness
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={17} />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                78%
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Resume parsed, GitHub connected, and 2 certificates validated.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('Profile & evidence')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between w-full"
            >
              <span>Complete Profile</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3: Target Role Match */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-apple hover:shadow-apple-hover transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Target Role Match
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Target size={17} />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
                82%
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Matches current industry benchmarks for Junior Frontend Engineer.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('Career intelligence')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between w-full"
            >
              <span>Compare Target Roles</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 4: Skill Gaps Identified */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-apple hover:shadow-apple-hover transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">
                Skill Gaps Identified
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle size={17} />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-amber-600 tracking-tight">
                5
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                System Design & testing require verifiable case study documentation.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('Roadmap')}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center justify-between w-full"
            >
              <span>View Roadmap Gaps</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION A & B: READINESS TRAJECTORY & FOCUS AREAS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* A. Readiness Trajectory Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-apple flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Historical Calibration
                </span>
                <h2 className="font-display font-bold text-lg text-slate-900 mt-0.5">
                  Readiness Trajectory
                </h2>
              </div>

              {/* Time-Range Selector Buttons (Interactive: 6 Weeks, 3 Months, 1 Semester) */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-medium self-start sm:self-auto">
                <button
                  onClick={() => setTimeRange('6w')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timeRange === '6w'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  6 Weeks
                </button>
                <button
                  onClick={() => setTimeRange('3m')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timeRange === '3m'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  3 Months
                </button>
                <button
                  onClick={() => setTimeRange('semester')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timeRange === 'semester'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  1 Semester
                </button>
              </div>
            </div>

            <div className="h-64 sm:h-72 my-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 12, right: 12, left: -22, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="appleBlueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
                    dy={8}
                  />
                  <YAxis
                    domain={[30, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-apple-hover text-xs font-sans">
                            <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                              {data.week} Calibration
                            </div>
                            <div className="font-display font-extrabold text-base text-slate-900 mt-0.5">
                              Readiness Score: {data.score}/100
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Artifact Coverage: {data.coverage}%
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#appleBlueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600 shrink-0" />
              <span>
                <strong>Steady upward trajectory:</strong> Gained +22 points since uploading unit tests and WebSocket telemetry.
              </span>
            </div>
            <button
              onClick={() => onSelectTab('Career intelligence')}
              className="text-blue-600 font-bold hover:underline shrink-0 ml-2 text-xs flex items-center gap-1"
            >
              <span>Explore Insights</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* B. Focus Areas (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-apple flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  High-Impact Priorities
                </span>
                <h2 className="font-display font-bold text-lg text-slate-900 mt-0.5">
                  Focus Areas
                </h2>
              </div>
              <span className="text-[10.5px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                Rubric-derived
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {/* Item 1: Document System Architecture */}
              <div
                onClick={() => onSelectTab('Roadmap')}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Document System Architecture
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock3 size={11} /> 2–3 hrs
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Publish an Architecture Decision Record (ADR) explaining WebSocket failover to close your top evidence gap.
                </p>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="font-semibold text-emerald-700">+14 pts System Design</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Open in Roadmap <ChevronRight size={12} />
                  </span>
                </div>
              </div>

              {/* Item 2: Practise Cache Eviction Viva */}
              <div
                onClick={() => onSelectTab('Project viva')}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Practise Cache Eviction Viva
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock3 size={11} /> 15 min
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Rehearse explaining your LRU doubly-linked list memory trade-offs out loud for technical recruiter screens.
                </p>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="font-semibold text-blue-700">+9 pts Technical Defense</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Start Viva Practice <ChevronRight size={12} />
                  </span>
                </div>
              </div>

              {/* Item 3: Strengthen DSA on LeetCode */}
              <div
                onClick={() => onSelectTab('Roadmap')}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Strengthen DSA on LeetCode
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock3 size={11} /> 1 hr
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Complete 5 graph partitioning and dynamic programming problems to reinforce algorithmic problem solving.
                </p>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="font-semibold text-slate-700">+6 pts Problem Solving</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Explore Tasks <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('Roadmap')}
            className="w-full mt-4 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Full 3-Phase Milestone Roadmap</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION C & D: RECENT ACTIVITY & CAREER AT A GLANCE
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* C. Recent Activity Feed (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-apple space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Application State
              </span>
              <h2 className="font-display font-bold text-lg text-slate-900 mt-0.5">
                Recent Activity
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Live Telemetry
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {activity.map((item) => (
              <div key={item.id} className="py-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  {item.type === 'analysis' && <Sparkles size={15} className="text-blue-600" />}
                  {item.type === 'evidence' && <Github size={15} className="text-slate-800" />}
                  {item.type === 'viva' && <MessageCircle size={15} className="text-amber-600" />}
                  {item.type === 'task' && <CheckCircle2 size={15} className="text-emerald-600" />}
                  {item.type === 'milestone' && <Award size={15} className="text-indigo-600" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Synchronized with active local session</span>
            <button
              onClick={onOpenAddEvidence}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Add New Artifact
            </button>
          </div>
        </div>

        {/* D. Career at a Glance Quick-Nav (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-apple space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Platform Navigation
              </span>
              <h2 className="font-display font-bold text-lg text-slate-900 mt-0.5">
                Career at a Glance
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">5 Core Modules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Nav Card 1: Career Intelligence */}
            <div
              onClick={() => onSelectTab('Career intelligence')}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Compass size={17} />
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                Career Intelligence
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Proficiency vs. evidence coverage & target-role rubrics.
              </p>
            </div>

            {/* Nav Card 2: ProofGraph */}
            <div
              onClick={() => onSelectTab('ProofGraph')}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Link2 size={17} />
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                ProofGraph Canvas
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Interactive topology linking skills to verifiable repositories.
              </p>
            </div>

            {/* Nav Card 3: Career Roadmap */}
            <div
              onClick={() => onSelectTab('Roadmap')}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <BookOpen size={17} />
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                Career Roadmap
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                3-phase journey turning capability into visible proof of work.
              </p>
            </div>

            {/* Nav Card 4: Project Viva */}
            <div
              onClick={() => onSelectTab('Project viva')}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <MessageCircle size={17} />
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                Project Viva Studio
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Oral defense simulator with real-time rubric evaluation.
              </p>
            </div>

            {/* Nav Card 5: Profile & Evidence (Full width on 2-col) */}
            <div
              onClick={() => onSelectTab('Profile & evidence')}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group shadow-2xs sm:col-span-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <UserRound size={17} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    Profile & Evidence Ledger
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Manage resume PDFs, GitHub sync, portfolio URL, and verified credentials.
                  </p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
