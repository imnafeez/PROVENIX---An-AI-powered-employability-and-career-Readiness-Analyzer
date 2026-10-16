import { useState, useEffect } from 'react'
import {
  Sparkles,
  X,
} from 'lucide-react'
import {
  Tab,
  UserProfile,
  ReadinessScore,
  SkillItem,
  ProofNode,
  ProofEdge,
  MilestoneTask,
  ActivityFeedItem,
} from './types/career'
import {
  mockProfile,
  mockReadinessScore,
  mockSkills,
  mockProofNodes,
  mockProofEdges,
  mockRoadmapTasks,
  mockVivaQuestions,
  mockRecentActivity,
} from './data/mockData'
import { Sidebar } from './components/common/Sidebar'
import { Header } from './components/common/Header'
import { WatchIntroModal } from './components/common/WatchIntroModal'
import { AnalyzeModal } from './components/common/AnalyzeModal'
import { AddEvidenceModal } from './components/common/AddEvidenceModal'
import { EvidenceDrawer } from './components/common/EvidenceDrawer'

import { OverviewView } from './components/views/OverviewView'
import { CareerIntelligenceView } from './components/views/CareerIntelligenceView'
import { ProofGraphView } from './components/views/ProofGraphView'
import { RoadmapView } from './components/views/RoadmapView'
import { ProjectVivaView } from './components/views/ProjectVivaView'
import { ProfileView } from './components/views/ProfileView'

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [targetRole, setTargetRole] = useState('Frontend Engineer')
  const [searchQuery, setSearchQuery] = useState('')
  const [globalNotice, setGlobalNotice] = useState<string | null>(null)

  // Domain states
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [score, setScore] = useState<ReadinessScore>(mockReadinessScore)
  const [skills] = useState<SkillItem[]>(mockSkills)
  const [proofNodes] = useState<ProofNode[]>(mockProofNodes)
  const [proofEdges] = useState<ProofEdge[]>(mockProofEdges)

  // Roadmap tasks with local storage persistence
  const [tasks, setTasks] = useState<MilestoneTask[]>(() => {
    try {
      const saved = localStorage.getItem('provenix_roadmap_tasks')
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback to default
    }
    return mockRoadmapTasks
  })

  const [activity, setActivity] = useState<ActivityFeedItem[]>(mockRecentActivity)

  // Interactive drawers and modals
  const [isWatchIntroOpen, setIsWatchIntroOpen] = useState(false)
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false)
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false)
  const [selectedDrawerNode, setSelectedDrawerNode] = useState<ProofNode | null>(null)

  // Save tasks to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('provenix_roadmap_tasks', JSON.stringify(tasks))
    } catch {
      // Ignore
    }
  }, [tasks])

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K focuses search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) searchInput.focus()
      }
      // 1 - 6 switches tabs when not in input
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          const tabMap: Record<string, Tab> = {
            '1': 'Overview',
            '2': 'Career intelligence',
            '3': 'ProofGraph',
            '4': 'Roadmap',
            '5': 'Project viva',
            '6': 'Profile & evidence',
          }
          if (tabMap[e.key]) setActiveTab(tabMap[e.key])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === 'completed' ? 'in_progress' : 'completed'
          return {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'completed' ? 'Just now' : undefined,
          }
        }
        return t
      })
    )

    // Add activity trail
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setActivity((prev) => [
        {
          id: `act-${Date.now()}`,
          title: `Milestone status updated: ${task.title.slice(0, 32)}...`,
          detail: 'Task progress updated and saved to local session.',
          timestamp: 'Just now',
          type: 'task',
        },
        ...prev,
      ])
    }
  }

  const handleEvidenceAdded = (message: string) => {
    setGlobalNotice(message)
    setActivity((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New Artifact Evidence Registered',
        detail: message,
        timestamp: 'Just now',
        type: 'evidence',
      },
      ...prev,
    ])
  }

  const handleInspectSkill = (skillId: string) => {
    const node = proofNodes.find((n) => n.id === skillId)
    if (node) {
      setSelectedDrawerNode(node)
    } else {
      setActiveTab('ProofGraph')
    }
  }

  const handlePracticeVivaFromDrawer = (_projectTitle: string) => {
    setActiveTab('Project viva')
    setSelectedDrawerNode(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profile={profile}
        readinessScore={score.overall}
        onOpenAnalyze={() => setIsAnalyzeOpen(true)}
      />

      {/* Main App Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenAnalyze={() => setIsAnalyzeOpen(true)}
          onOpenAddEvidence={() => setIsAddEvidenceOpen(true)}
          onSelectTab={setActiveTab}
          targetRole={targetRole}
          onSelectTargetRole={(role) => {
            setTargetRole(role)
            setGlobalNotice(`Active target role updated to ${role}. Rubric benchmarks recalculated.`)
          }}
          availableRoles={profile.availableRoles}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          profile={profile}
        />

        {/* Global Toast Notice */}
        {globalNotice && (
          <div className="px-4 sm:px-6 lg:px-8 pt-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between animate-fade-in shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600 shrink-0" />
                <span>{globalNotice}</span>
              </div>
              <button
                onClick={() => setGlobalNotice(null)}
                className="p-1 text-blue-700 hover:text-blue-900 rounded-lg transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'Overview' && (
            <OverviewView
              profile={profile}
              score={score}
              skills={skills}
              activity={activity}
              onSelectTab={setActiveTab}
              onOpenAnalyze={() => setIsAnalyzeOpen(true)}
              onOpenAddEvidence={() => setIsAddEvidenceOpen(true)}
              onOpenWatchIntro={() => setIsWatchIntroOpen(true)}
            />
          )}

          {activeTab === 'Career intelligence' && (
            <CareerIntelligenceView
              score={score}
              skills={skills}
              targetRole={targetRole}
              onSelectTargetRole={setTargetRole}
              onSelectTab={setActiveTab}
              onInspectSkill={handleInspectSkill}
            />
          )}

          {activeTab === 'ProofGraph' && (
            <ProofGraphView
              nodes={proofNodes}
              edges={proofEdges}
              onSelectNode={(node) => setSelectedDrawerNode(node)}
              onOpenAddEvidence={() => setIsAddEvidenceOpen(true)}
            />
          )}

          {activeTab === 'Roadmap' && (
            <RoadmapView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'Project viva' && (
            <ProjectVivaView
              questions={mockVivaQuestions}
              onSaveFeedback={(fb) => {
                setGlobalNotice(`Viva defense evaluated! Scored ${fb.overallScore}/100 on ${fb.verdict}.`)
              }}
            />
          )}

          {activeTab === 'Profile & evidence' && (
            <ProfileView
              profile={profile}
              onOpenAddEvidence={() => setIsAddEvidenceOpen(true)}
              onSelectTab={setActiveTab}
              onUpdateHeadline={(h) => {
                setProfile((p) => ({ ...p, headline: h }))
                setGlobalNotice('Headline updated.')
              }}
            />
          )}
        </main>

        {/* Cohesive Apple-Style Footer */}
        <footer className="border-t border-slate-200/80 bg-white/90 px-4 sm:px-6 lg:px-8 py-5 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900">
                Prove<span className="text-blue-600">nix</span>
              </span>
              <span>·</span>
              <span>Prove Your Skills. Earn Your Future.</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Decoupled for FastAPI Backend
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-400">
                Demonstration Workspace
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Drawers */}
      <WatchIntroModal
        isOpen={isWatchIntroOpen}
        onClose={() => setIsWatchIntroOpen(false)}
        onExploreProfile={() => setActiveTab('Profile & evidence')}
      />

      <AnalyzeModal
        isOpen={isAnalyzeOpen}
        onClose={() => setIsAnalyzeOpen(false)}
        targetRole={targetRole}
        onApplyScore={(updated) => setScore(updated)}
      />

      <AddEvidenceModal
        isOpen={isAddEvidenceOpen}
        onClose={() => setIsAddEvidenceOpen(false)}
        onEvidenceAdded={handleEvidenceAdded}
      />

      <EvidenceDrawer
        node={selectedDrawerNode}
        onClose={() => setSelectedDrawerNode(null)}
        onPracticeViva={handlePracticeVivaFromDrawer}
      />
    </div>
  )
}

export default App
