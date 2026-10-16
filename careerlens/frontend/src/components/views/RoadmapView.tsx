import React, { useState } from 'react'
import {
  BookOpen,
  Check,
  Clock3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { MilestoneTask, Tab } from '../../types/career'

interface RoadmapViewProps {
  tasks: MilestoneTask[]
  onToggleTask: (taskId: string) => void
  onSelectTab: (tab: Tab) => void
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTab,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all')
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>('task-2')

  const completedCount = tasks.filter((t) => t.status === 'completed').length
  const totalCount = tasks.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const filteredTasks = tasks.filter((t) => {
    if (selectedPhase !== 'all' && !t.phase.includes(selectedPhase)) return false
    return true
  })

  const phases = [
    { id: 'Phase 1', label: 'Phase 1: Deep Project Evidence', count: 2 },
    { id: 'Phase 2', label: 'Phase 2: Reliability & Systems', count: 2 },
    { id: 'Phase 3', label: 'Phase 3: Viva & Storytelling', count: 1 },
  ]

  return (
    <div className="space-y-8 animation-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-hairline">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-1.5">
            <BookOpen size={14} className="text-cobalt-600" />
            <span>CALIBRATED CAREER ACCELERATION JOURNEY</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Personalized Career{' '}
            <span className="text-cobalt-600 font-serif italic font-normal">Roadmap</span>
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed mt-1 max-w-3xl">
            A sequenced action plan prioritizing observable proof over generic certificates. Designed to turn unobserved skills into verifiable assets.
          </p>
        </div>

        {/* Milestone Overall Progress Pill */}
        <div className="flex items-center gap-4 p-3 rounded-card bg-stone-surface border border-stone-hairline shadow-subtle shrink-0">
          <div className="w-12 h-12 rounded-full border-3 border-stone-soft border-t-cobalt-600 flex items-center justify-center font-mono font-bold text-xs text-ink">
            {progressPercent}%
          </div>
          <div>
            <div className="text-xs font-semibold text-ink font-display">
              {completedCount} of {totalCount} Milestones Done
            </div>
            <div className="text-[11px] text-ink-tertiary mt-0.5">
              Est. 4.5 hours remaining to bridge top gaps
            </div>
          </div>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="p-3.5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
              selectedPhase === 'all'
                ? 'bg-ink text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            All Milestones ({tasks.length})
          </button>
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                selectedPhase === p.id
                  ? 'bg-cobalt-600 text-white font-semibold'
                  : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-ink-quaternary">
          Prioritizing high-weight rubric signals
        </div>
      </div>

      {/* Timeline Journey Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Timeline Tasks (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed'
            const isExpanded = expandedTaskId === task.id

            return (
              <div
                key={task.id}
                className={`rounded-panel border transition-all ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20 shadow-subtle'
                    : 'border-stone-hairline bg-stone-surface shadow-subtle hover:border-cobalt-300'
                }`}
              >
                <div className="p-5">
                  {/* Task Meta Row */}
                  <div className="flex items-center justify-between text-xs font-mono text-ink-quaternary mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cobalt-700 bg-cobalt-50 px-2 py-0.5 rounded border border-cobalt-100">
                      {task.phase}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[11px] text-ink-secondary">
                        <Clock3 size={12} /> {task.effort}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          task.priority === 'Critical'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-soft text-ink-secondary'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Title and Checkbox Trigger */}
                  <div className="flex items-start gap-3 mt-1">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-hairline bg-stone-surface hover:border-cobalt-500 text-transparent'
                      }`}
                      aria-label={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                    >
                      <Check size={14} />
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-display font-bold text-base text-ink ${
                          isCompleted ? 'line-through text-ink-tertiary' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Impact and Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-stone-hairline flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {task.impactBadge}
                      </span>
                      {task.completedAt && (
                        <span className="text-[10.5px] text-ink-quaternary font-mono">
                          Completed on {task.completedAt}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedTaskId(isExpanded ? null : task.id)
                        }
                        className="text-ink-secondary hover:text-ink text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Checklist' : 'View Action Items'}</span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Checklist Sub-Items */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-stone-hairline bg-canvas-subtle/50 space-y-2.5 animation-fade-in">
                    <div className="text-[11px] font-mono uppercase text-ink-quaternary tracking-wider">
                      Concrete Next Actions
                    </div>
                    <ul className="space-y-1.5 text-xs text-ink-secondary">
                      {task.actionItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2
                            size={14}
                            className={`shrink-0 mt-0.5 ${
                              isCompleted ? 'text-emerald-600' : 'text-cobalt-600'
                            }`}
                          />
                          <span className={isCompleted ? 'line-through text-ink-tertiary' : ''}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Roadmap Strategy Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-hairline">
              <Sparkles size={16} className="text-cobalt-600" />
              <h3 className="font-display font-bold text-sm text-ink">
                Why this sequence?
              </h3>
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed">
              Employers screen for <strong>architectural intention</strong> and <strong>verifiable testing</strong> before reviewing resumes.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-card bg-canvas-subtle border border-stone-hairline">
                <span className="font-semibold text-ink block mb-0.5">
                  1. Eliminate the System Design Gap
                </span>
                <span className="text-ink-tertiary text-[11px] leading-snug block">
                  ADRs and caching case studies convert subjective claims into peer-reviewable artifacts.
                </span>
              </div>

              <div className="p-3 rounded-card bg-canvas-subtle border border-stone-hairline">
                <span className="font-semibold text-ink block mb-0.5">
                  2. Calibrate Out Loud
                </span>
                <span className="text-ink-tertiary text-[11px] leading-snug block">
                  Practicing project defense with the Viva simulator prevents freezing during live technical screens.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-hairline">
              <button
                onClick={() => onSelectTab('Project viva')}
                className="w-full py-2 px-3 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium transition-all shadow-subtle flex items-center justify-center gap-1.5"
              >
                <span>Launch Project Viva Practice</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Quick Metrics Widget */}
          <div className="p-4 rounded-panel border border-stone-hairline bg-canvas-subtle text-xs space-y-2">
            <div className="text-[10.5px] font-mono uppercase text-ink-quaternary tracking-wider">
              Roadmap Velocity
            </div>
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-ink-tertiary">Weekly Completion Rate:</span>
              <span className="font-bold text-ink">2 tasks / week</span>
            </div>
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-ink-tertiary">Estimated Time to Target:</span>
              <span className="font-bold text-cobalt-700">12 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
