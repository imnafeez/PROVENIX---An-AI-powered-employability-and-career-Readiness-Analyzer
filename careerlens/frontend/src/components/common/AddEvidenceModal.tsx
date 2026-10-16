import React, { useState } from 'react'
import {
  X,
  Upload,
  FileText,
  Github,
  Award,
  Code2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

interface AddEvidenceModalProps {
  isOpen: boolean
  onClose: () => void
  onEvidenceAdded: (message: string) => void
}

type EvidenceTab = 'resume' | 'github' | 'certificate' | 'project'

export const AddEvidenceModal: React.FC<AddEvidenceModalProps> = ({
  isOpen,
  onClose,
  onEvidenceAdded,
}) => {
  const [activeTab, setActiveTab] = useState<EvidenceTab>('resume')
  const [dragOver, setDragOver] = useState(false)
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [githubRepo, setGithubRepo] = useState('')
  const [certName, setCertName] = useState('')
  const [certIssuer, setCertIssuer] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectStack, setProjectStack] = useState('')

  if (!isOpen) return null

  const handleResumeSimulate = () => {
    setResumeUploaded(true)
    setTimeout(() => {
      onEvidenceAdded('Resume uploaded and 7 evidence sections parsed for Alex Rivera.')
      onClose()
    }, 900)
  }

  const handleGithubSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEvidenceAdded(`GitHub repository "${githubRepo || 'alexrivera-dev/repo'}" scheduled for commit telemetry indexing.`)
    onClose()
  }

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEvidenceAdded(`Certificate "${certName || 'Professional Credential'}" added to evidence graph with registry verification.`)
    onClose()
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEvidenceAdded(`Project "${projectTitle || 'New System Project'}" added with tech stack evidence.`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animation-fade-in">
      <div
        className="w-full max-w-lg bg-stone-surface rounded-panel border border-stone-hairline shadow-modal overflow-hidden animation-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-hairline flex items-center justify-between bg-canvas-subtle">
          <div>
            <h2 className="font-display font-bold text-base text-ink">
              Add Career Evidence
            </h2>
            <p className="text-xs text-ink-tertiary">
              Ground your employability score with verifiable artifacts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-ink-quaternary hover:text-ink hover:bg-stone-soft transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-hairline px-5 bg-stone-surface gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('resume')}
            className={`py-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'resume'
                ? 'border-cobalt-600 text-cobalt-700 font-semibold'
                : 'border-transparent text-ink-tertiary hover:text-ink'
            }`}
          >
            <FileText size={14} />
            <span>Resume</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`py-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'github'
                ? 'border-cobalt-600 text-cobalt-700 font-semibold'
                : 'border-transparent text-ink-tertiary hover:text-ink'
            }`}
          >
            <Github size={14} />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'certificate'
                ? 'border-cobalt-600 text-cobalt-700 font-semibold'
                : 'border-transparent text-ink-tertiary hover:text-ink'
            }`}
          >
            <Award size={14} />
            <span>Certificate</span>
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`py-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'project'
                ? 'border-cobalt-600 text-cobalt-700 font-semibold'
                : 'border-transparent text-ink-tertiary hover:text-ink'
            }`}
          >
            <Code2 size={14} />
            <span>Project</span>
          </button>
        </div>

        {/* Tab contents */}
        <div className="p-6">
          {activeTab === 'resume' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  handleResumeSimulate()
                }}
                onClick={handleResumeSimulate}
                className={`border-2 border-dashed rounded-card p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-cobalt-500 bg-cobalt-50/50'
                    : 'border-stone-hairline hover:border-ink-quaternary bg-canvas-subtle'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-cobalt-50 text-cobalt-600 mx-auto flex items-center justify-center mb-3">
                  <Upload size={22} />
                </div>
                <div className="text-xs font-semibold text-ink">
                  {resumeUploaded ? 'Processing Resume...' : 'Drop your resume (PDF or DOCX)'}
                </div>
                <p className="text-[11px] text-ink-tertiary mt-1">
                  Drag and drop file here, or click to browse local documents
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                  <ShieldCheck size={12} /> Privacy safe: parsed locally & on backend
                </div>
              </div>

              <div className="p-3 rounded-md bg-stone-soft border border-stone-hairline text-[11px] text-ink-secondary">
                <strong>Honest integration status:</strong> In this demo, uploading parses an illustrative 7-section document. When your FastAPI backend is running, it will send multipart data to <code className="font-mono text-ink">/api/profile/resume</code>.
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <form onSubmit={handleGithubSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  GitHub Profile Handle or Repository URL
                </label>
                <div className="flex items-center rounded-md border border-stone-hairline bg-stone-surface focus-within:border-cobalt-500">
                  <span className="pl-3 text-xs text-ink-quaternary font-mono">github.com/</span>
                  <input
                    type="text"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    placeholder="alexrivera-dev/distributed-system"
                    className="flex-1 px-2 py-2 text-xs bg-transparent focus:outline-none text-ink"
                  />
                </div>
                <span className="block text-[11px] text-ink-tertiary mt-1">
                  Provenix will inspect commit frequency, test suites, and language distributions.
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium transition-all shadow-subtle"
              >
                <span>Index Repository Evidence</span>
                <ArrowRight size={13} />
              </button>
            </form>
          )}

          {activeTab === 'certificate' && (
            <form onSubmit={handleCertSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Certificate or Credential Title
                </label>
                <input
                  type="text"
                  required
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. Meta Front-End Developer Specialization"
                  className="w-full px-3 py-2 text-xs bg-stone-surface border border-stone-hairline rounded-md focus:outline-none focus:border-cobalt-500 text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Issuing Organization & Verification Link
                </label>
                <input
                  type="text"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="e.g. Coursera / Meta (https://coursera.org/verify/...)"
                  className="w-full px-3 py-2 text-xs bg-stone-surface border border-stone-hairline rounded-md focus:outline-none focus:border-cobalt-500 text-ink"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium transition-all shadow-subtle mt-4"
              >
                <span>Add Verified Credential</span>
                <ArrowRight size={13} />
              </button>
            </form>
          )}

          {activeTab === 'project' && (
            <form onSubmit={handleProjectSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Project Title & Role
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full px-3 py-2 text-xs bg-stone-surface border border-stone-hairline rounded-md focus:outline-none focus:border-cobalt-500 text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Key Technologies & Measurable Outcome
                </label>
                <input
                  type="text"
                  value={projectStack}
                  onChange={(e) => setProjectStack(e.target.value)}
                  placeholder="e.g. TypeScript, Redis, Vitest · 50k jobs/sec at 99.9% uptime"
                  className="w-full px-3 py-2 text-xs bg-stone-surface border border-stone-hairline rounded-md focus:outline-none focus:border-cobalt-500 text-ink"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium transition-all shadow-subtle mt-4"
              >
                <span>Connect Project to ProofGraph</span>
                <ArrowRight size={13} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
