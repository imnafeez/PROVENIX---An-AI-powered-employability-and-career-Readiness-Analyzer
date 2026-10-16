import React, { useState } from 'react'
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Plus,
  CheckCircle2,
  X,
  User,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'
import { Tab, UserProfile } from '../../types/career'

interface HeaderProps {
  activeTab: Tab
  onOpenSidebar: () => void
  onOpenAnalyze: () => void
  onOpenAddEvidence: () => void
  onSelectTab: (tab: Tab) => void
  targetRole: string
  onSelectTargetRole: (role: string) => void
  availableRoles: string[]
  searchQuery: string
  onSearchChange: (query: string) => void
  profile: UserProfile
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenSidebar,
  onOpenAnalyze,
  onOpenAddEvidence,
  onSelectTab,
  targetRole,
  onSelectTargetRole,
  availableRoles,
  searchQuery,
  onSearchChange,
  profile,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const notifications = [
    {
      id: 'n1',
      title: 'GitHub synchronization complete',
      time: '14m ago',
      desc: '6 commits indexed in alexrivera-dev/campus-connect. 2 custom hooks verified.',
      read: false,
    },
    {
      id: 'n2',
      title: 'System Design Evidence Gap',
      time: '2h ago',
      desc: 'Architecture Decision Records are recommended to bridge your 46% System Design benchmark.',
      read: false,
    },
    {
      id: 'n3',
      title: 'Meta Credential Verified',
      time: 'Yesterday',
      desc: 'Public verification hash confirmed via Coursera registry API.',
      read: true,
    },
  ]

  // Filtered search results for quick-jump
  const searchResults = searchQuery.trim()
    ? [
        { label: 'Campus Connect Web App', type: 'Project', tab: 'Profile & evidence' as Tab },
        { label: 'React 18 & Component Lifecycle', type: 'Skill', tab: 'Career intelligence' as Tab },
        { label: 'Document System Architecture (ADR)', type: 'Roadmap', tab: 'Roadmap' as Tab },
        { label: 'Cache Eviction Defense Question', type: 'Project Viva', tab: 'Project viva' as Tab },
        { label: 'ProofGraph Topology Canvas', type: 'Module', tab: 'ProofGraph' as Tab },
      ].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile trigger & Provenix Wordmark & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar navigation"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-900/10">
            <span className="w-4 h-4 border-2 border-white/90 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </span>
          </div>
          <div className="hidden sm:flex items-baseline gap-1.5">
            <span className="font-display font-bold text-lg tracking-tight text-slate-900">
              Prove<span className="text-blue-600">nix</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100/80 px-1.5 py-0.5 rounded-md font-semibold">
              Pro
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs">
          <span className="text-slate-400 font-medium">Workspace</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900 font-display">
            {activeTab}
          </span>
        </div>
      </div>

      {/* Center: Wide Elegant Search Field */}
      <div className="relative flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills, projects, proof, roadmap..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-14 py-2 text-xs bg-slate-100/70 border border-slate-200/80 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-inner/5"
          />
          <span className="absolute right-3 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
            ⌘K
          </span>
        </div>

        {/* Live Search Results Popover */}
        {searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-apple-modal z-50 p-2 animate-fade-in">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100">
              Search Results
            </div>
            {searchResults.length > 0 ? (
              <div className="py-1">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectTab(item.tab)
                      onSearchChange('')
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors group"
                  >
                    <span className="text-slate-700 font-medium group-hover:text-blue-600">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching artifacts found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Target Role, Notifications, Avatar Dropdown, CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Target Role Selector Pill */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-xs text-slate-700 transition-all"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Role:
            </span>
            <span className="font-semibold text-slate-800">{targetRole}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {showRoleDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowRoleDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white shadow-apple-modal z-50 py-2 animate-fade-in">
                <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Target Evaluation Rubric
                </div>
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onSelectTargetRole(role)
                      setShowRoleDropdown(false)
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      role === targetRole ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{role}</span>
                    {role === targetRole && <CheckCircle2 size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-apple-modal z-50 p-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-display">Notifications</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                      2 Unread
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-3 px-1 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 leading-tight">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Candidate profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-display font-bold text-xs flex items-center justify-center shadow-sm">
              {profile.avatarInitials}
            </div>
            <ChevronDown size={12} className="text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white shadow-apple-modal z-50 p-2 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900 font-display">{profile.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{profile.degree}</div>
                  <div className="text-[10px] font-mono text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <ShieldCheck size={11} /> 14 Verifiable Proof Artifacts
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onSelectTab('Profile & evidence')
                      setShowProfileMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <User size={14} className="text-slate-400" />
                    <span>View Profile & Evidence</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAddEvidence()
                      setShowProfileMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <Plus size={14} className="text-slate-400" />
                    <span>Add New Evidence</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('Roadmap')
                      setShowProfileMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <BookOpen size={14} className="text-slate-400" />
                    <span>Milestone Journey</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Primary CTA: Analyze Readiness */}
        <button
          onClick={onOpenAnalyze}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-tight transition-all shadow-sm hover:shadow active:scale-[0.98]"
        >
          <Sparkles size={13} />
          <span>Analyze Readiness</span>
        </button>
      </div>
    </header>
  )
}
