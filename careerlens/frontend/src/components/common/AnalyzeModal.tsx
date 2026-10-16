import React, { useState, useEffect } from 'react'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Cpu,
} from 'lucide-react'
import { ReadinessScore } from '../../types/career'

interface AnalyzeModalProps {
  isOpen: boolean
  onClose: () => void
  targetRole: string
  onApplyScore: (score: ReadinessScore) => void
}

const auditSteps = [
  { id: 1, label: 'Indexing Git Repositories & Commits', sub: 'Analyzing 4 repositories, commit velocity, and test suites' },
  { id: 2, label: 'Verifying Credentials & Resume Claims', sub: 'Auditing Coursera API hash & 7 parsed PDF sections' },
  { id: 3, label: 'Evaluating System Design & Viva Proof', sub: 'Checking Architecture Decision Records and defense depth' },
  { id: 4, label: 'Synthesizing Explainable Rubric Score', sub: 'Applying deterministic role weights against benchmark' },
]

export const AnalyzeModal: React.FC<AnalyzeModalProps> = ({
  isOpen,
  onClose,
  targetRole,
  onApplyScore,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setIsRunning(true)
      setCompleted(false)

      const timer1 = setTimeout(() => setCurrentStep(1), 700)
      const timer2 = setTimeout(() => setCurrentStep(2), 1500)
      const timer3 = setTimeout(() => setCurrentStep(3), 2300)
      const timer4 = setTimeout(() => {
        setCurrentStep(4)
        setIsRunning(false)
        setCompleted(true)
      }, 3100)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animation-fade-in">
      <div
        className="w-full max-w-xl bg-stone-surface rounded-panel border border-stone-hairline shadow-modal overflow-hidden animation-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-stone-hairline flex items-start justify-between bg-canvas-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-200 text-cobalt-600 flex items-center justify-center shadow-subtle">
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-ink">
                  Readiness Intelligence Engine
                </h2>
                <span className="text-[10px] font-mono uppercase bg-cobalt-100 text-cobalt-700 px-1.5 py-0.5 rounded font-semibold">
                  Deterministic
                </span>
              </div>
              <p className="text-xs text-ink-tertiary mt-0.5">
                Evaluating evidence coverage against <strong className="text-ink">{targetRole}</strong> rubric
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-ink-quaternary hover:text-ink hover:bg-stone-soft transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Progress telemetry */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ink-secondary flex items-center gap-2">
                {isRunning ? (
                  <>
                    <RefreshCw size={13} className="animate-spin text-cobalt-600" />
                    <span>Auditing Artifacts...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Analysis Complete</span>
                  </>
                )}
              </span>
              <span className="text-ink-quaternary">
                Step {Math.min(currentStep + 1, 4)} / 4
              </span>
            </div>

            {/* Stepper items */}
            <div className="space-y-2 border border-stone-hairline rounded-card p-3 bg-canvas-subtle">
              {auditSteps.map((step, idx) => {
                const isPast = currentStep > idx
                const isCurrent = currentStep === idx && isRunning

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-2.5 p-2 rounded-md transition-all ${
                      isCurrent
                        ? 'bg-stone-surface border border-cobalt-200 shadow-2xs'
                        : isPast
                        ? 'opacity-85'
                        : 'opacity-40'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isPast ? (
                        <CheckCircle2 size={15} className="text-emerald-600" />
                      ) : isCurrent ? (
                        <RefreshCw size={14} className="text-cobalt-600 animate-spin" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-stone-hairline bg-stone-soft" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-ink leading-tight">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-ink-tertiary leading-tight mt-0.5">
                        {step.sub}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Result Card when completed */}
          {completed && (
            <div className="p-4 rounded-card border border-stone-hairline bg-stone-surface shadow-subtle space-y-3 animation-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-ink-quaternary tracking-wider">
                    Computed Readiness Index
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display font-bold text-3xl text-ink">
                      74
                    </span>
                    <span className="text-xs text-ink-tertiary">/ 100</span>
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      +8 pts past 6 weeks
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-ink-quaternary tracking-wider">
                    Evidence Confidence
                  </span>
                  <div className="text-sm font-semibold text-ink mt-0.5 flex items-center justify-end gap-1">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>81% Coverage (High)</span>
                  </div>
                  <span className="text-[10.5px] text-ink-tertiary">14 verified sources</span>
                </div>
              </div>

              {/* Rubric Breakdown Pills */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-hairline text-xs">
                <div className="p-2 rounded bg-canvas-subtle border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10.5px]">Technical Proficiency</div>
                  <div className="font-mono font-bold text-ink">82% <span className="text-emerald-600 font-normal text-[10px]">Verified</span></div>
                </div>
                <div className="p-2 rounded bg-canvas-subtle border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10.5px]">Applied Project Depth</div>
                  <div className="font-mono font-bold text-ink">76% <span className="text-emerald-600 font-normal text-[10px]">Verified</span></div>
                </div>
                <div className="p-2 rounded bg-canvas-subtle border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10.5px]">System Design Evidence</div>
                  <div className="font-mono font-bold text-amber-700">46% <span className="text-amber-600 font-normal text-[10px]">Top Gap</span></div>
                </div>
                <div className="p-2 rounded bg-canvas-subtle border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10.5px]">Viva Articulation</div>
                  <div className="font-mono font-bold text-ink">68% <span className="text-cobalt-600 font-normal text-[10px]">Practiced</span></div>
                </div>
              </div>

              {/* Explainability disclosure */}
              <div className="p-2.5 rounded bg-amber-50/50 border border-amber-100 flex items-start gap-2 text-[11px] text-amber-900 leading-snug">
                <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>SCORING PRINCIPLE:</strong> Missing evidence is never treated as lack of skill. Scores are calculated deterministically against the published role rubric.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-hairline bg-canvas-subtle flex items-center justify-between">
          <div className="text-[11px] text-ink-tertiary">
            Demo analysis workspace · Model ready for FastAPI
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md border border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              disabled={!completed}
              onClick={() => {
                onApplyScore({
                  overall: 74,
                  confidence: 81,
                  confidenceLevel: 'High',
                  trend: {
                    change: 8,
                    period: 'Past 6 weeks',
                    weekly: [
                      { week: 'W1', score: 52, coverage: 45 },
                      { week: 'W2', score: 55, coverage: 50 },
                      { week: 'W3', score: 58, coverage: 58 },
                      { week: 'W4', score: 62, coverage: 65 },
                      { week: 'W5', score: 67, coverage: 72 },
                      { week: 'W6', score: 74, coverage: 81 },
                    ],
                  },
                  components: [
                    {
                      name: 'Technical Proficiency',
                      score: 82,
                      weight: 35,
                      coverage: 88,
                      status: 'healthy',
                      evidenceCount: 14,
                      rationale: 'Strong commit history in TypeScript & React; validated via 4 repositories and Meta front-end certification.',
                      topEvidence: '42 passing Vitest unit tests in TraceableCache',
                    },
                    {
                      name: 'Project Proof & Architecture',
                      score: 76,
                      weight: 25,
                      coverage: 80,
                      status: 'healthy',
                      evidenceCount: 9,
                      rationale: 'Substantial production-grade code present in Campus Connect. Good demonstration of optimistic updates and rendering trade-offs.',
                      topEvidence: 'Lighthouse 98 audit & WebSocket messaging implementation',
                    },
                    {
                      name: 'System Design & Scalability',
                      score: 46,
                      weight: 20,
                      coverage: 38,
                      status: 'action_needed',
                      evidenceCount: 2,
                      rationale: 'Primary gap: no documented architecture diagrams, load testing evidence, or edge case mitigation notes observed in submitted work.',
                      topEvidence: 'Limited to basic in-memory caching logic in TraceableCache',
                    },
                    {
                      name: 'Technical Articulation & Viva',
                      score: 68,
                      weight: 15,
                      coverage: 70,
                      status: 'developing',
                      evidenceCount: 3,
                      rationale: 'Demonstrated good clarity during project reasoning viva. Needs deeper precision when discussing failure recovery and trade-offs.',
                      topEvidence: 'Completed 2 recorded project defense mock sessions',
                    },
                    {
                      name: 'Evidence Traceability',
                      score: 85,
                      weight: 5,
                      coverage: 85,
                      status: 'healthy',
                      evidenceCount: 8,
                      rationale: 'Direct links between declared resume skills and verifiable Git commits across 3 public repositories.',
                      topEvidence: '7 verified credential & repository mappings',
                    },
                  ],
                  disclaimer: 'Illustrative scoring model derived from deterministic evidence evaluation principles.',
                })
                onClose()
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-ink hover:bg-ink-secondary disabled:opacity-50 text-white text-xs font-medium transition-all shadow-subtle"
            >
              <span>Explore Roadmap</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
