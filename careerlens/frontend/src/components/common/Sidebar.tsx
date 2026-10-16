import React from 'react'
import {
  Home,
  Compass,
  Link2,
  BookOpen,
  MessageCircle,
  UserRound,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Tab, UserProfile } from '../../types/career'

interface SidebarProps {
  activeTab: Tab
  onSelectTab: (tab: Tab) => void
  isOpen: boolean
  onClose: () => void
  profile: UserProfile
  readinessScore: number
  onOpenAnalyze: () => void
}

const navItems: { label: Tab; icon: typeof Home; badge?: string }[] = [
  { label: 'Overview', icon: Home },
  { label: 'Career intelligence', icon: Compass },
  { label: 'ProofGraph', icon: Link2, badge: 'Live' },
  { label: 'Roadmap', icon: BookOpen },
  { label: 'Project viva', icon: MessageCircle, badge: 'Practice' },
  { label: 'Profile & evidence', icon: UserRound },
]

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  profile,
  readinessScore,
  onOpenAnalyze,
}) => {
  return (
    <>
      {/* Mobile backdrop scrim */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
              <span className="w-3.5 h-3.5 border-1.5 border-white rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-lg tracking-tight text-slate-900">
                Prove<span className="text-blue-600">nix</span>
              </span>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Candidate Context Pill */}
        <div className="p-4">
          <div className="p-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-display font-bold text-xs flex items-center justify-center border border-blue-200">
                  {profile.avatarInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate leading-tight">
                    Target: {profile.targetRole}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-slate-900 block">
                  {readinessScore}%
                </span>
                <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5 justify-end">
                  <ShieldCheck size={9} /> High Proof
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-3 flex-1 overflow-y-auto space-y-1">
          <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase px-3 mb-2">
            Workspace
          </div>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon, badge }) => {
              const isActive = activeTab === label
              return (
                <button
                  key={label}
                  onClick={() => {
                    onSelectTab(label)
                    onClose()
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}
                    />
                    <span>{label === 'Overview' ? 'Home' : label}</span>
                  </div>
                  {badge && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full tracking-wide ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-slate-100 text-slate-500 font-medium'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Readiness Pulse Action Widget */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <Zap size={11} className="text-amber-500" />
                Readiness Engine
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Auditing candidate evidence against <strong>{profile.targetRole}</strong> rubric.
            </p>
            <button
              onClick={onOpenAnalyze}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs group"
            >
              <Sparkles size={12} className="text-blue-400" />
              <span>Run Verification Pass</span>
              <ArrowRight size={11} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400 text-center mt-3 font-mono">
            Candidate Workspace · v1.2
          </div>
        </div>
      </aside>
    </>
  )
}
