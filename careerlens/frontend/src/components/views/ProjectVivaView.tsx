import React, { useState } from 'react'
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Mic,
  MicOff,
  Send,
  Award,
} from 'lucide-react'
import { VivaQuestion, VivaFeedback } from '../../types/career'
import { evaluateVivaResponse } from '../../api'

interface ProjectVivaViewProps {
  questions: VivaQuestion[]
  onSaveFeedback?: (feedback: VivaFeedback) => void
}

export const ProjectVivaView: React.FC<ProjectVivaViewProps> = ({
  questions,
  onSaveFeedback,
}) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [answerText, setAnswerText] = useState('')
  const [showThinkingPrompt, setShowThinkingPrompt] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [feedback, setFeedback] = useState<VivaFeedback | null>(null)

  const activeQuestion = questions[selectedQuestionIndex] || questions[0]
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length

  // Quick fill sample high-scoring answer for study / testing
  const handleLoadSampleAnswer = () => {
    if (activeQuestion.id === 'viva-q1') {
      setAnswerText(
        'For Campus Connect, I chose WebSockets over Server-Sent Events primarily because student messaging is inherently bidirectional—clients must both transmit keystrokes/messages and receive immediate peer notifications with minimal overhead. While SSE is lighter for unidirectional streams, pairing it with separate HTTP POST mutations for every message would incur repeated TLS handshakes and headers, creating notable latency on mobile networks. For network drops, I implemented an exponential backoff reconnection loop with jitter and stored outgoing pending messages in an in-memory queue marked with client-generated idempotency UUIDs to ensure no messages were dropped or duplicated.'
      )
    } else {
      setAnswerText(
        'In TraceableCache, I chose a Doubly Linked List coupled with an in-memory Hash Map to ensure deterministic O(1) time complexity for both key lookup and node eviction. If I had used a traditional JavaScript Array, evicting the least recently used item with shift() would trigger an O(n) memory re-indexing on every write. The trade-off was allocating an extra ~32 bytes per node for the previous and next pointers, but under our Vitest benchmark harness at 1.2M operations per second, memory predictability took precedence over pointer overhead.'
      )
    }
  }

  const handleSubmitAnswer = async () => {
    if (!answerText.trim() || isEvaluating) return

    setIsEvaluating(true)
    try {
      const result = await evaluateVivaResponse(activeQuestion.id, answerText)
      setFeedback(result)
      if (onSaveFeedback) onSaveFeedback(result)
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="space-y-8 animation-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-hairline">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-1.5">
            <MessageCircle size={14} className="text-cobalt-600" />
            <span>ORAL DEFENSE & PROJECT VIVA SIMULATOR</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Know your code.{' '}
            <span className="text-cobalt-600 font-serif italic font-normal">
              Own your decisions.
            </span>
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed mt-1 max-w-3xl">
            In competitive hiring, recruiters probe the reasoning behind your architecture. Rehearse real-world trade-off defenses and receive rubric evaluations before your phone screens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSampleAnswer}
            className="px-3.5 py-1.5 rounded-md border border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink-secondary hover:text-ink text-xs font-medium transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <Sparkles size={13} className="text-cobalt-600" />
            <span>Load High-Scoring Response Sample</span>
          </button>
        </div>
      </div>

      {/* Question Selector Carousel / Stepper */}
      <div className="p-3.5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-mono text-ink-quaternary uppercase mr-1">
            Question:
          </span>
          {questions.map((q, idx) => {
            const isSelected = idx === selectedQuestionIndex
            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestionIndex(idx)
                  setFeedback(null)
                  setAnswerText('')
                  setShowThinkingPrompt(false)
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-ink text-white font-semibold shadow-subtle'
                    : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10.5px]">0{idx + 1}</span>
                <span>{q.projectTitle}</span>
              </button>
            )
          })}
        </div>

        <span className="text-xs font-mono text-ink-quaternary shrink-0 hidden sm:inline">
          {selectedQuestionIndex + 1} of {questions.length} questions
        </span>
      </div>

      {/* Main Viva Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Question & Input Form (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-6">
          {/* Question Banner */}
          <div className="space-y-3 pb-5 border-b border-stone-hairline">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-cobalt-700 bg-cobalt-50 px-2 py-0.5 rounded border border-cobalt-100">
                {activeQuestion.category} · Project: {activeQuestion.projectTitle}
              </span>
              <span className="text-[10.5px] font-mono text-ink-quaternary">
                Un-timed rehearsal
              </span>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-ink leading-snug">
              {activeQuestion.question}
            </h2>

            <p className="text-xs text-ink-tertiary leading-relaxed">
              <strong>Context for interviewers:</strong> {activeQuestion.context}
            </p>
          </div>

          {/* Thinking Prompts Accordion */}
          <div className="rounded-card border border-stone-hairline bg-canvas-subtle p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowThinkingPrompt(!showThinkingPrompt)}
                className="text-xs font-semibold text-cobalt-700 hover:text-cobalt-800 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles size={14} />
                <span>{showThinkingPrompt ? 'Hide Recommended Defense Structure' : 'Show Recommended Defense Structure (STAR)'}</span>
              </button>
              <span className="text-[10px] font-mono text-ink-quaternary">Rubric guidance</span>
            </div>

            {showThinkingPrompt && (
              <p className="text-xs text-ink-secondary leading-relaxed pt-1 animation-fade-in">
                {activeQuestion.thinkingPrompt}
              </p>
            )}
          </div>

          {/* Response Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="viva-input" className="font-mono text-[11px] uppercase tracking-wider text-ink-quaternary font-medium">
                Your Spoken or Written Response
              </label>
              <div className="flex items-center gap-3 font-mono text-[11px] text-ink-tertiary">
                <span className={wordCount > 60 ? 'text-emerald-700 font-semibold' : ''}>
                  {wordCount} words
                </span>
                <span>(Target: 70–150 words)</span>
              </div>
            </div>

            <textarea
              id="viva-input"
              rows={7}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Structure your answer clearly: state the problem context, the specific alternative rejected, why this choice was made, and how you validated the outcome with tests or metrics..."
              className="w-full p-4 text-xs font-sans text-ink bg-canvas-subtle/50 border border-stone-hairline rounded-card focus:outline-none focus:border-cobalt-500 focus:bg-stone-surface leading-relaxed resize-y transition-all"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  isRecording
                    ? 'border-red-300 bg-red-50 text-red-700 animate-pulse'
                    : 'border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink-secondary hover:text-ink'
                }`}
                title="Simulate speech-to-text recording"
              >
                {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                <span>{isRecording ? 'Listening (Simulated)...' : 'Dictate with Voice'}</span>
              </button>

              {answerText && (
                <button
                  onClick={() => setAnswerText('')}
                  className="px-2.5 py-1.5 rounded-md text-xs text-ink-quaternary hover:text-ink hover:bg-stone-soft transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={handleSubmitAnswer}
              disabled={wordCount < 5 || isEvaluating}
              className="px-5 py-2 rounded-md bg-ink hover:bg-ink-secondary disabled:opacity-40 text-white text-xs font-medium tracking-tight transition-all shadow-subtle flex items-center gap-2 active:scale-[0.98]"
            >
              {isEvaluating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Evaluating against rubric...</span>
                </>
              ) : (
                <>
                  <span>Evaluate Response</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </div>

          {/* Feedback Display Card (Appears after submission) */}
          {feedback && (
            <div className="p-5 rounded-panel border border-stone-hairline bg-canvas-subtle shadow-subtle space-y-4 animation-modal-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-hairline">
                <div>
                  <span className="text-[10px] font-mono uppercase text-ink-quaternary tracking-wider">
                    Rubric Evaluation Result
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display font-extrabold text-3xl text-ink">
                      {feedback.overallScore}
                    </span>
                    <span className="text-xs text-ink-tertiary">/ 100</span>
                    <span
                      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
                        feedback.overallScore >= 80
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {feedback.verdict}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10.5px] font-mono text-ink-quaternary block">
                    Telemetry Updated
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                    <CheckCircle2 size={13} /> +9 pts Technical Viva
                  </span>
                </div>
              </div>

              {/* Rubric Criteria 4-Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded bg-stone-surface border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10px]">Technical Depth</div>
                  <div className="font-mono font-bold text-ink text-sm">
                    {feedback.rubricScores.technicalDepth}%
                  </div>
                </div>
                <div className="p-2.5 rounded bg-stone-surface border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10px]">Ownership Clarity</div>
                  <div className="font-mono font-bold text-ink text-sm">
                    {feedback.rubricScores.ownershipClarity}%
                  </div>
                </div>
                <div className="p-2.5 rounded bg-stone-surface border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10px]">Architecture Trade-offs</div>
                  <div className="font-mono font-bold text-ink text-sm">
                    {feedback.rubricScores.architectureTradeoffs}%
                  </div>
                </div>
                <div className="p-2.5 rounded bg-stone-surface border border-stone-hairline">
                  <div className="text-ink-tertiary text-[10px]">Communication</div>
                  <div className="font-mono font-bold text-ink text-sm">
                    {feedback.rubricScores.communicationPrecision}%
                  </div>
                </div>
              </div>

              {/* Strengths & Growth Areas */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                    <CheckCircle2 size={13} /> Noted Strengths:
                  </span>
                  <ul className="list-disc list-inside text-ink-secondary space-y-0.5">
                    {feedback.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-amber-800 flex items-center gap-1 mb-1">
                    <AlertCircle size={13} /> Opportunities for Distinction:
                  </span>
                  <ul className="list-disc list-inside text-ink-secondary space-y-0.5">
                    {feedback.growthOpportunities.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coach Note */}
              <div className="p-3 rounded bg-stone-surface border border-stone-hairline text-[11px] text-ink-secondary leading-relaxed">
                <strong>Coach's Synthesis:</strong> {feedback.coachNote}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Rubric Checklist & Guidance (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-hairline">
              <Award size={16} className="text-cobalt-600" />
              <h3 className="font-display font-bold text-sm text-ink">
                Evaluation Rubric
              </h3>
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed">
              Examiners evaluate your response on whether you can defend trade-offs without buzzwords:
            </p>

            <div className="space-y-3 pt-1 text-xs">
              {activeQuestion.rubric.map((r, i) => (
                <div key={i} className="p-3 rounded-card bg-canvas-subtle border border-stone-hairline">
                  <div className="font-semibold text-ink flex items-center justify-between mb-1">
                    <span>{r.criterion}</span>
                    <span className="text-[10px] font-mono text-ink-quaternary">Criterion {i + 1}</span>
                  </div>
                  <div className="text-[11px] text-ink-tertiary leading-relaxed">
                    {r.lookFor}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-md bg-stone-soft border border-stone-hairline text-[11px] text-ink-tertiary leading-relaxed">
              <strong>Scoring Integrity:</strong> Viva evaluations are simulated locally against deterministic rubrics. Real backend integration can connect to customized evaluation models.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
