import React, { useState } from 'react'
import {
  X,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  Link2,
  BookOpen,
  ArrowRight,
} from 'lucide-react'

interface WatchIntroModalProps {
  isOpen: boolean
  onClose: () => void
  onExploreProfile: () => void
}

export const WatchIntroModal: React.FC<WatchIntroModalProps> = ({
  isOpen,
  onClose,
  onExploreProfile,
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'proofgraph' | 'viva' | 'roadmap'>('overview')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-3xl bg-white/95 rounded-3xl border border-white/80 shadow-apple-modal overflow-hidden animate-modal-in flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles size={14} />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-tight">
                Welcome to Provenix
              </h2>
              <p className="text-[11px] text-slate-500">
                Interactive platform introduction & methodology walkthrough
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Showcase Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 shadow-lg group">
            {/* Poster / Video Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/hero-mountain.jpg')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-900/20" />
            </div>

            {/* Simulated Animated Interface Playback Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium tracking-wide bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {isPlaying ? 'Platform Tour Active' : 'Paused'}
                </span>
                <span className="text-[11px] font-mono text-white/70">
                  01:42 / 03:15
                </span>
              </div>

              {/* Center Play/Pause Control */}
              <div className="self-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={22} className="fill-slate-900" /> : <Play size={22} className="ml-1 fill-slate-900" />}
                </button>
              </div>

              {/* Progress and Feature Headline */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-semibold block mb-1">
                  Core Principle 01
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Separating actual proficiency from evidence coverage
                </h3>
                <p className="text-xs text-white/80 max-w-xl mt-1 leading-relaxed">
                  Provenix never treats missing evidence as a lack of skill. Every result explains the supporting repository artifacts and missing signals.
                </p>

                {/* Scrubber bar */}
                <div className="w-full bg-white/25 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-400 h-full w-[54%] rounded-full transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div>
            <div className="flex border-b border-slate-200 gap-4 text-xs font-medium pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-1.5 transition-colors pb-1 ${
                  activeTab === 'overview'
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles size={13} />
                <span>Readiness Index</span>
              </button>
              <button
                onClick={() => setActiveTab('proofgraph')}
                className={`flex items-center gap-1.5 transition-colors pb-1 ${
                  activeTab === 'proofgraph'
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Link2 size={13} />
                <span>ProofGraph Topology</span>
              </button>
              <button
                onClick={() => setActiveTab('viva')}
                className={`flex items-center gap-1.5 transition-colors pb-1 ${
                  activeTab === 'viva'
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck size={13} />
                <span>Project Viva</span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex items-center gap-1.5 transition-colors pb-1 ${
                  activeTab === 'roadmap'
                    ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen size={13} />
                <span>Career Roadmap</span>
              </button>
            </div>

            <div className="pt-3 text-xs text-slate-600 leading-relaxed">
              {activeTab === 'overview' && (
                <p>
                  The Readiness Index calculates a deterministic benchmark score comparing candidate artifacts against published industry rubrics for software roles.
                </p>
              )}
              {activeTab === 'proofgraph' && (
                <p>
                  ProofGraph links verified GitHub commits, Vitest suites, and certificates to candidate skills with clickable node dossiers and topology highlights.
                </p>
              )}
              {activeTab === 'viva' && (
                <p>
                  Project Viva puts candidates in the interviewer’s chair, evaluating oral defenses of architectural trade-offs using rubric criteria.
                </p>
              )}
              {activeTab === 'roadmap' && (
                <p>
                  The Roadmap prioritizes tangible proof of work—like Architecture Decision Records and unit test suites—over passive certificates.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Provenix · Product Tour
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose()
                onExploreProfile()
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Your Profile</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
