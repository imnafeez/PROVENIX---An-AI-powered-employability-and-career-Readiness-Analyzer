import React, { useState } from 'react'
import {
  Compass,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  SkillItem,
  ReadinessScore,
  EvidenceStatus,
  Tab,
} from '../../types/career'

interface CareerIntelligenceViewProps {
  score: ReadinessScore
  skills: SkillItem[]
  targetRole: string
  onSelectTargetRole: (role: string) => void
  onSelectTab: (tab: Tab) => void
  onInspectSkill: (skillId: string) => void
}

export const CareerIntelligenceView: React.FC<CareerIntelligenceViewProps> = ({
  score,
  skills,
  targetRole,
  onSelectTargetRole,
  onSelectTab,
  onInspectSkill,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | EvidenceStatus>('all')

  const filteredSkills = skills.filter((s) => {
    if (statusFilter !== 'all' && s.evidenceStatus !== statusFilter) return false
    return true
  })

  // Comparison data for component scores vs coverage
  const componentChartData = score.components.map((c) => ({
    name: c.name.length > 20 ? c.name.slice(0, 18) + '...' : c.name,
    score: c.score,
    coverage: c.coverage,
    weight: `${c.weight}%`,
  }))

  const roleComparisons = [
    {
      role: 'Frontend Engineer',
      alignment: 81,
      strengths: 'React, TypeScript, Web Perf',
      gap: 'System Design Architecture',
      matchTone: 'emerald',
    },
    {
      role: 'Product Engineer',
      alignment: 74,
      strengths: 'UX Execution, Full-stack Prototypes',
      gap: 'Database Schema Modeling',
      matchTone: 'cobalt',
    },
    {
      role: 'Full-stack Developer',
      alignment: 68,
      strengths: 'API Integration, Client UI',
      gap: 'Server Concurrency & SQL',
      matchTone: 'amber',
    },
    {
      role: 'Systems & Platform Associate',
      alignment: 52,
      strengths: 'Algorithm Complexity, LRU Cache',
      gap: 'Distributed Systems & K8s',
      matchTone: 'stone',
    },
  ]

  return (
    <div className="space-y-8 animation-fade-in max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-hairline">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-2">
            <Compass size={14} className="text-cobalt-600" />
            <span>EXPLAINABLE CAREER INTELLIGENCE & AUDIT RUBRIC</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Explainable readiness,{' '}
            <span className="italic font-serif font-normal text-cobalt-700">
              grounded in evidence.
            </span>
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed mt-1 max-w-3xl">
            Provenix rejects black-box scoring. Every metric separates actual proficiency signals from observable evidence coverage, ensuring missing artifacts are never misdiagnosed as lack of talent.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('Roadmap')}
          className="px-3.5 py-1.5 rounded-md border border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink text-xs font-medium transition-colors shadow-subtle flex items-center gap-1.5 shrink-0"
        >
          <span>Bridge Gaps in Roadmap</span>
          <ArrowRight size={13} className="text-ink-quaternary" />
        </button>
      </div>

      {/* Target Role Selector & Alignment Hero Banner */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-ink-quaternary font-medium">
            Active Target Role Rubric
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={targetRole}
              onChange={(e) => onSelectTargetRole(e.target.value)}
              className="font-display font-bold text-2xl sm:text-3xl text-ink bg-transparent border-b-2 border-stone-hairline hover:border-cobalt-500 focus:outline-none focus:border-cobalt-600 transition-colors py-1 cursor-pointer"
            >
              <option value="Frontend Engineer">Frontend Engineer</option>
              <option value="Product Engineer">Product Engineer</option>
              <option value="Full-stack Developer">Full-stack Developer</option>
              <option value="Systems & Platform Associate">Systems & Platform Associate</option>
            </select>
          </div>
          <p className="text-xs text-ink-tertiary leading-relaxed pt-1">
            Evaluated against industry benchmarks for junior/entry-level roles at high-growth engineering teams.
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-card bg-canvas-subtle border border-stone-hairline shrink-0">
          <div className="text-center">
            <span className="text-[10px] font-mono text-ink-quaternary uppercase">
              Role Match
            </span>
            <div className="font-display font-extrabold text-3xl text-ink mt-0.5">
              81<span className="text-sm font-sans font-normal text-ink-tertiary">%</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
              High Match
            </span>
          </div>

          <div className="w-px h-12 bg-stone-hairline" />

          <div className="text-center">
            <span className="text-[10px] font-mono text-ink-quaternary uppercase">
              Evidence Coverage
            </span>
            <div className="font-display font-extrabold text-3xl text-cobalt-700 mt-0.5">
              88<span className="text-sm font-sans font-normal text-ink-tertiary">%</span>
            </div>
            <span className="text-[10px] font-mono text-ink-tertiary">
              14 verified sources
            </span>
          </div>
        </div>
      </div>

      {/* Component Scores Visualization: Proficiency vs Evidence Coverage */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-hairline">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-quaternary">
              Dual-Signal Evaluation
            </span>
            <h2 className="font-display font-bold text-lg text-ink mt-0.5">
              Proficiency Signal vs Observable Evidence Coverage
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              High proficiency with lower coverage indicates an undocumented skill waiting for proof.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-cobalt-600 rounded-xs" />
              <span>Proficiency (0-100)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-stone-soft border border-stone-hairline rounded-xs" />
              <span>Evidence Coverage (%)</span>
            </span>
          </div>
        </div>

        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={componentChartData}
              margin={{ top: 15, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F1ED" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: '#E8E8E3' }}
                tick={{ fill: '#6B737A', fontSize: 11 }}
                dy={6}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#889096', fontSize: 11, fontFamily: 'monospace' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="p-3 bg-stone-surface border border-stone-hairline rounded-card shadow-elevated text-xs font-sans">
                        <div className="font-display font-bold text-ink mb-1">{data.name}</div>
                        <div className="flex justify-between gap-4 font-mono text-[11px] text-cobalt-600">
                          <span>Proficiency Score:</span>
                          <span className="font-bold">{data.score}/100</span>
                        </div>
                        <div className="flex justify-between gap-4 font-mono text-[11px] text-ink-secondary mt-0.5">
                          <span>Evidence Coverage:</span>
                          <span className="font-bold">{data.coverage}%</span>
                        </div>
                        <div className="text-[10px] text-ink-tertiary mt-1 pt-1 border-t border-stone-hairline">
                          Rubric Weight: {data.weight}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="score" fill="#1D4ED8" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="coverage" fill="#E2E8F0" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deep-Dive Explainable Evidence Table */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
        {/* Table controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-hairline">
          <div>
            <h2 className="font-display font-bold text-lg text-ink">
              Evidence Ledger & Rubric Provenance
            </h2>
            <p className="text-xs text-ink-tertiary mt-0.5">
              Showing why each score was awarded, backed by code repositories and credentials
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Buttons */}
            <div className="flex items-center p-1 rounded-md bg-canvas-subtle border border-stone-hairline text-xs font-medium">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-stone-surface text-ink font-semibold shadow-2xs'
                    : 'text-ink-tertiary hover:text-ink'
                }`}
              >
                All ({skills.length})
              </button>
              <button
                onClick={() => setStatusFilter('verified')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  statusFilter === 'verified'
                    ? 'bg-stone-surface text-emerald-800 font-semibold shadow-2xs'
                    : 'text-ink-tertiary hover:text-ink'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setStatusFilter('claimed')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  statusFilter === 'claimed'
                    ? 'bg-stone-surface text-amber-800 font-semibold shadow-2xs'
                    : 'text-ink-tertiary hover:text-ink'
                }`}
              >
                Claimed
              </button>
              <button
                onClick={() => setStatusFilter('not_observed')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  statusFilter === 'not_observed'
                    ? 'bg-stone-surface text-ink-secondary font-semibold shadow-2xs'
                    : 'text-ink-tertiary hover:text-ink'
                }`}
              >
                Evidence Gaps
              </button>
            </div>
          </div>
        </div>

        {/* The Evidence Rows */}
        <div className="divide-y divide-stone-hairline">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="py-4 hover:bg-canvas-subtle/70 rounded-card p-3 transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-display font-bold text-sm text-ink">
                    {skill.name}
                  </span>
                  {skill.evidenceStatus === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck size={12} className="text-emerald-600" />
                      Verified
                    </span>
                  )}
                  {skill.evidenceStatus === 'claimed' && (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertCircle size={12} className="text-amber-600" />
                      Self-Reported Claim
                    </span>
                  )}
                  {skill.evidenceStatus === 'not_observed' && (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono text-ink-quaternary bg-stone-soft px-2 py-0.5 rounded border border-stone-hairline">
                      <HelpCircle size={12} />
                      Not Observed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-ink-quaternary text-[11px]">Score:</span>
                    <span className="font-bold text-ink">{skill.score}%</span>
                    <span className="text-ink-quaternary text-[10.5px]">(Target: {skill.benchmark}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-ink-quaternary text-[11px]">Evidence Coverage:</span>
                    <span className="font-semibold text-cobalt-700">{skill.coverage}%</span>
                  </div>
                </div>
              </div>

              {/* Rationale and Evidence provenance pill */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
                <div className="lg:col-span-8 p-3 rounded-md bg-stone-surface border border-stone-hairline">
                  <span className="text-[10px] font-mono text-ink-quaternary uppercase block mb-1">
                    Scoring Rationale
                  </span>
                  <p className="text-ink-secondary leading-relaxed">
                    {skill.rationale}
                  </p>
                </div>

                <div className="lg:col-span-4 p-3 rounded-md bg-stone-surface border border-stone-hairline flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-ink-quaternary uppercase block mb-1">
                      Supporting Artifact
                    </span>
                    {skill.evidenceSources.length > 0 ? (
                      <span className="font-medium text-ink leading-tight block">
                        {skill.evidenceSources[0].label}
                      </span>
                    ) : (
                      <span className="text-ink-quaternary italic leading-tight block">
                        No supporting repository or certificate attached
                      </span>
                    )}
                  </div>

                  <div className="pt-2 mt-2 border-t border-stone-hairline flex items-center justify-between text-[11px]">
                    <span className="text-ink-tertiary">{skill.recency}</span>
                    <button
                      onClick={() => onInspectSkill(skill.id)}
                      className="text-cobalt-600 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Dossier</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Target Roles Comparison Matrix */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-quaternary">
            Multi-Role Rubric Analysis
          </span>
          <h2 className="font-display font-bold text-lg text-ink mt-0.5">
            How your evidence compares across roles
          </h2>
          <p className="text-xs text-ink-secondary mt-0.5">
            Your evidence carries varying weight depending on the required skill hierarchy of each career pathway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {roleComparisons.map((item) => (
            <div
              key={item.role}
              onClick={() => onSelectTargetRole(item.role)}
              className={`p-4 rounded-card border transition-all cursor-pointer ${
                item.role === targetRole
                  ? 'border-cobalt-500 bg-cobalt-50/40 shadow-subtle'
                  : 'border-stone-hairline bg-canvas-subtle hover:bg-stone-soft hover:border-ink-quaternary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-sm text-ink">
                  {item.role}
                </span>
                <span className="font-mono font-bold text-sm text-ink">
                  {item.alignment}%
                </span>
              </div>

              <div className="w-full bg-stone-soft h-1.5 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${
                    item.role === targetRole ? 'bg-cobalt-600' : 'bg-ink-tertiary'
                  }`}
                  style={{ width: `${item.alignment}%` }}
                />
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-ink-quaternary block">Primary Strength:</span>
                  <span className="text-ink font-medium">{item.strengths}</span>
                </div>
                <div>
                  <span className="text-amber-800 block">Critical Gap:</span>
                  <span className="text-amber-900">{item.gap}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-hairline text-right">
                <span className="text-[11px] font-medium text-cobalt-600 flex items-center justify-end gap-1">
                  <span>Switch Rubric</span>
                  <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
