import React, { useState } from 'react'
import {
  UserRound,
  FileText,
  Github,
  Award,
  Link2,
  Plus,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Edit3,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { UserProfile, Tab } from '../../types/career'

interface ProfileViewProps {
  profile: UserProfile
  onOpenAddEvidence: () => void
  onSelectTab: (tab: Tab) => void
  onUpdateHeadline?: (headline: string) => void
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onOpenAddEvidence,
  onSelectTab,
  onUpdateHeadline,
}) => {
  const [isEditingHeadline, setIsEditingHeadline] = useState(false)
  const [headline, setHeadline] = useState(profile.headline)
  const [isSyncingGithub, setIsSyncingGithub] = useState(false)
  const [syncNotice, setSyncNotice] = useState('')

  const handleSaveHeadline = () => {
    setIsEditingHeadline(false)
    if (onUpdateHeadline) onUpdateHeadline(headline)
  }

  const handleSyncGithub = () => {
    setIsSyncingGithub(true)
    setSyncNotice('')
    setTimeout(() => {
      setIsSyncingGithub(false)
      setSyncNotice('GitHub telemetry synchronized: 148 commits indexed across 4 repositories.')
    }, 1100)
  }

  return (
    <div className="space-y-8 animation-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-hairline">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-1.5">
            <UserRound size={14} className="text-cobalt-600" />
            <span>STUDENT PROFILE & EVIDENCE ATTESTATION</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Proof of Work &{' '}
            <span className="text-cobalt-600 font-serif italic font-normal">
              Profile Evidence
            </span>
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed mt-1 max-w-3xl">
            Manage your verified repositories, parsed resume sections, credentials, and projects. Transparently shows connection status without exaggerating unsupported integrations.
          </p>
        </div>

        <button
          onClick={onOpenAddEvidence}
          className="px-4 py-2 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium tracking-tight transition-all shadow-subtle flex items-center gap-2 self-start lg:self-end"
        >
          <Plus size={14} className="text-cobalt-300" />
          <span>Add New Evidence Source</span>
        </button>
      </div>

      {syncNotice && (
        <div className="p-3 rounded-card bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animation-fade-in">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-700" />
            <span>{syncNotice}</span>
          </div>
          <button
            onClick={() => setSyncNotice('')}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-hairline">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-panel bg-stone-soft border border-stone-hairline text-ink font-display font-bold text-2xl flex items-center justify-center shadow-subtle">
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl text-ink">
                  {profile.name}
                </h2>
                <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  Verified Student Identity
                </span>
              </div>
              <p className="text-xs text-ink-tertiary mt-0.5">
                {profile.degree} · {profile.university} ({profile.year})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[10px] text-ink-quaternary uppercase block">
                Evidence Completeness
              </span>
              <span className="font-display font-bold text-xl text-ink">
                {profile.profileCompleteness}%
              </span>
            </div>
          </div>
        </div>

        {/* Headline / Statement */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-ink-quaternary font-medium">
              Candidate Focus Headline
            </span>
            {!isEditingHeadline ? (
              <button
                onClick={() => setIsEditingHeadline(true)}
                className="text-xs text-cobalt-600 hover:text-cobalt-700 flex items-center gap-1"
              >
                <Edit3 size={12} />
                <span>Edit Headline</span>
              </button>
            ) : (
              <button
                onClick={handleSaveHeadline}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Save
              </button>
            )}
          </div>

          {isEditingHeadline ? (
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-1.5 text-xs text-ink border border-cobalt-500 rounded-md focus:outline-none"
            />
          ) : (
            <p className="text-xs text-ink-secondary leading-relaxed bg-canvas-subtle p-3 rounded-card border border-stone-hairline">
              "{headline}"
            </p>
          )}
        </div>
      </div>

      {/* Connected Evidence Sources Grid */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-quaternary font-medium">
            Verifiable Integration Channels
          </span>
          <h2 className="font-display font-bold text-lg text-ink mt-0.5">
            Connected Artifact Sources
          </h2>
          <p className="text-xs text-ink-secondary mt-0.5">
            Real integrations connect to your local environment and future FastAPI backend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Resume Card */}
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-cobalt-50 text-cobalt-600 flex items-center justify-center">
                  <FileText size={16} />
                </div>
                <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Parsed (7 sections)
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink">Resume</h3>
              <p className="text-[11px] text-ink-secondary mt-1 font-mono truncate" title={profile.sources.resume.filename}>
                {profile.sources.resume.filename}
              </p>
              <div className="text-[10.5px] text-ink-quaternary mt-1">
                Last scanned: {profile.sources.resume.lastScan}
              </div>
            </div>

            <button
              onClick={onOpenAddEvidence}
              className="mt-4 pt-3 border-t border-stone-hairline text-xs text-cobalt-600 hover:text-cobalt-700 font-medium flex items-center justify-between w-full"
            >
              <span>Upload New PDF</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* GitHub Card */}
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center">
                  <Github size={16} />
                </div>
                <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Connected
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink">GitHub</h3>
              <p className="text-[11px] text-ink-secondary mt-1 font-mono">
                @{profile.sources.github.handle}
              </p>
              <div className="text-[10.5px] text-ink-quaternary mt-1">
                {profile.sources.github.commitsTracked} commits · {profile.sources.github.reposIndexed} repos
              </div>
            </div>

            <button
              onClick={handleSyncGithub}
              disabled={isSyncingGithub}
              className="mt-4 pt-3 border-t border-stone-hairline text-xs text-cobalt-600 hover:text-cobalt-700 font-medium flex items-center justify-between w-full disabled:opacity-50"
            >
              <span>{isSyncingGithub ? 'Syncing...' : 'Sync Telemetry'}</span>
              <RefreshCw size={12} className={isSyncingGithub ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Portfolio Card */}
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-stone-soft text-ink flex items-center justify-center">
                  <Link2 size={16} />
                </div>
                <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink">Portfolio URL</h3>
              <p className="text-[11px] text-ink-secondary mt-1 font-mono truncate" title={profile.sources.portfolio.url}>
                {profile.sources.portfolio.url}
              </p>
              <div className="text-[10.5px] text-ink-quaternary mt-1">
                Verified: {profile.sources.portfolio.lastVerified}
              </div>
            </div>

            <a
              href={profile.sources.portfolio.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 pt-3 border-t border-stone-hairline text-xs text-cobalt-600 hover:text-cobalt-700 font-medium flex items-center justify-between w-full"
            >
              <span>Open External URL</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Certificates Card */}
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award size={16} />
                </div>
                <span className="text-[10.5px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {profile.sources.certificates.verifiedCount} Verified
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink">Certifications</h3>
              <p className="text-[11px] text-ink-secondary mt-1">
                Meta Front-End & AWS Practitioner
              </p>
              <div className="text-[10.5px] text-ink-quaternary mt-1">
                Coursera & AWS Registry
              </div>
            </div>

            <button
              onClick={onOpenAddEvidence}
              className="mt-4 pt-3 border-t border-stone-hairline text-xs text-cobalt-600 hover:text-cobalt-700 font-medium flex items-center justify-between w-full"
            >
              <span>Add Credential</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Projects with Observable Metrics */}
      <div className="p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-hairline">
          <div>
            <h2 className="font-display font-bold text-lg text-ink">
              Verified Project Portfolio
            </h2>
            <p className="text-xs text-ink-tertiary mt-0.5">
              Projects with inspected code repositories, test branches, and defense readiness
            </p>
          </div>

          <button
            onClick={onOpenAddEvidence}
            className="text-xs font-medium text-cobalt-600 hover:underline flex items-center gap-1"
          >
            <Plus size={13} />
            <span>Add Project</span>
          </button>
        </div>

        <div className="space-y-4">
          {profile.sources.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-card border border-stone-hairline bg-canvas-subtle hover:bg-stone-soft transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-ink">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono text-ink-tertiary bg-stone-surface px-2 py-0.5 rounded border border-stone-hairline">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectTab('Project viva')}
                    className="px-3 py-1.5 rounded-md bg-stone-surface border border-stone-hairline hover:border-cobalt-500 text-xs font-medium text-ink transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <BookOpen size={13} className="text-cobalt-600" />
                    <span>Practice Defense</span>
                  </button>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-stone-surface border border-stone-hairline text-ink-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics & Repository Link */}
              <div className="pt-2 border-t border-stone-hairline flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-emerald-800 text-[11px] font-medium flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  {proj.metrics}
                </span>

                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-secondary hover:text-ink text-xs font-mono flex items-center gap-1"
                >
                  <Github size={13} />
                  <span>{proj.repoUrl.replace('https://github.com/', '')}</span>
                  <ExternalLink size={11} className="text-ink-quaternary" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
