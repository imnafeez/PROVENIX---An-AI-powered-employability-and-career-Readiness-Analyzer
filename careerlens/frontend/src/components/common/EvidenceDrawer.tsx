import React from 'react'
import {
  X,
  ShieldCheck,
  ExternalLink,
  Code2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  GitCommit,
  BookOpen,
} from 'lucide-react'
import { ProofNode } from '../../types/career'

interface EvidenceDrawerProps {
  node: ProofNode | null
  onClose: () => void
  onPracticeViva?: (projectTitle: string) => void
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  node,
  onClose,
  onPracticeViva,
}) => {
  if (!node) return null

  const getStatusBadge = (status: ProofNode['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck size={13} className="text-emerald-600" />
            Verified Artifact
          </span>
        )
      case 'claimed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertCircle size={13} className="text-amber-600" />
            Self-Reported Claim
          </span>
        )
      case 'not_observed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-quaternary bg-stone-soft px-2 py-0.5 rounded border border-stone-hairline">
            <HelpCircle size={13} className="text-ink-quaternary" />
            Not Observed (Evidence Gap)
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animation-fade-in">
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-surface border-l border-stone-hairline shadow-floating flex flex-col animation-modal-in">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-hairline flex items-start justify-between bg-canvas-subtle">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-tertiary">
                  Proof Dossier · {node.type}
                </span>
                {getStatusBadge(node.status)}
              </div>
              <h2 className="font-display font-bold text-lg text-ink leading-tight">
                {node.label}
              </h2>
              <p className="text-xs text-ink-tertiary mt-0.5">{node.sublabel}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-ink-quaternary hover:text-ink hover:bg-stone-soft transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Confidence & Score Gauge */}
            <div className="p-4 rounded-card border border-stone-hairline bg-stone-surface shadow-subtle flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider">
                  Confidence Score
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display font-bold text-2xl text-ink">
                    {node.confidence}%
                  </span>
                  <span className="text-xs text-ink-quaternary">evidence strength</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-stone-soft border-t-cobalt-600 flex items-center justify-center font-mono font-bold text-xs text-ink">
                {node.confidence}%
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink-quaternary mb-1.5">
                Evaluation Rationale
              </h3>
              <p className="text-xs text-ink leading-relaxed">
                {node.description}
              </p>
            </div>

            {/* Metrics if present */}
            {node.metrics && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-ink-quaternary mb-2">
                  Observable Metrics
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {node.metrics.commits !== undefined && (
                    <div className="p-2.5 rounded-md bg-canvas-subtle border border-stone-hairline flex items-center gap-2">
                      <GitCommit size={14} className="text-cobalt-600" />
                      <div>
                        <div className="text-[10px] text-ink-tertiary">Indexed Commits</div>
                        <div className="font-mono font-bold text-ink">{node.metrics.commits} commits</div>
                      </div>
                    </div>
                  )}
                  {node.metrics.linesOfCode && (
                    <div className="p-2.5 rounded-md bg-canvas-subtle border border-stone-hairline flex items-center gap-2">
                      <Code2 size={14} className="text-emerald-600" />
                      <div>
                        <div className="text-[10px] text-ink-tertiary">Volume</div>
                        <div className="font-mono font-bold text-ink">{node.metrics.linesOfCode}</div>
                      </div>
                    </div>
                  )}
                  {node.metrics.coverage && (
                    <div className="p-2.5 rounded-md bg-canvas-subtle border border-stone-hairline flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-cobalt-600" />
                      <div>
                        <div className="text-[10px] text-ink-tertiary">Test Coverage</div>
                        <div className="font-mono font-bold text-ink">{node.metrics.coverage}</div>
                      </div>
                    </div>
                  )}
                  {node.metrics.testsCount !== undefined && (
                    <div className="p-2.5 rounded-md bg-canvas-subtle border border-stone-hairline flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-600" />
                      <div>
                        <div className="text-[10px] text-ink-tertiary">Automated Tests</div>
                        <div className="font-mono font-bold text-ink">{node.metrics.testsCount} passing</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Evidence Source & Provenance */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink-quaternary mb-2">
                Evidence Provenance
              </h3>
              <div className="p-3.5 rounded-card border border-stone-hairline bg-canvas-subtle space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink">{node.provenance.source}</span>
                  {node.provenance.verifiedAt && (
                    <span className="text-[10.5px] text-ink-quaternary flex items-center gap-1">
                      <Calendar size={11} /> {node.provenance.verifiedAt}
                    </span>
                  )}
                </div>

                {node.provenance.snippet && (
                  <div className="p-2.5 rounded bg-stone-surface border border-stone-hairline font-mono text-[11px] text-ink-secondary overflow-x-auto">
                    {node.provenance.snippet}
                  </div>
                )}

                {node.provenance.linkText && (
                  <button className="text-xs font-medium text-cobalt-600 hover:text-cobalt-700 flex items-center gap-1 mt-1 transition-colors">
                    <span>{node.provenance.linkText}</span>
                    <ExternalLink size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Explainable Principle Note */}
            <div className="p-3 rounded-md bg-stone-soft border border-stone-hairline text-[11px] text-ink-tertiary leading-relaxed">
              <strong>Provenance Guarantee:</strong> Provenix enforces traceable provenance. Unverified assertions receive lower confidence weighting until validated by Git commits, live telemetry, or defense transcripts.
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-stone-hairline bg-canvas-subtle flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md border border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink text-xs font-medium transition-colors"
            >
              Close Dossier
            </button>
            {node.type === 'project' && onPracticeViva && (
              <button
                onClick={() => {
                  onPracticeViva(node.label)
                  onClose()
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-medium transition-all shadow-subtle"
              >
                <BookOpen size={13} />
                <span>Practice Viva for this Project</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
