import {
  UserProfile,
  ReadinessScore,
  ProofNode,
  ProofEdge,
  MilestoneTask,
  VivaFeedback,
} from './types/career'
import {
  mockProfile,
  mockReadinessScore,
  mockProofNodes,
  mockProofEdges,
  mockRoadmapTasks,
} from './data/mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

/**
 * Clean fetch wrapper for future FastAPI backend.
 * Gracefully falls back to structured demo data if backend is offline.
 */
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), 2500)
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    })
    clearTimeout(id)
    if (!response.ok) {
      throw new Error(`API returned HTTP ${response.status}`)
    }
    return (await response.json()) as T
  } catch (err) {
    // Expected during standalone frontend evaluation before FastAPI is running
    throw err
  }
}

export async function fetchProfile(): Promise<UserProfile> {
  try {
    return await apiFetch<UserProfile>('/api/profile/me')
  } catch {
    return mockProfile
  }
}

export async function fetchLatestAnalysis(): Promise<ReadinessScore> {
  try {
    return await apiFetch<ReadinessScore>('/api/analysis/latest')
  } catch {
    return mockReadinessScore
  }
}

export async function runReadinessAnalysis(targetRole: string): Promise<ReadinessScore> {
  try {
    return await apiFetch<ReadinessScore>('/api/analysis/run', {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    })
  } catch {
    // Return updated mock score reflecting target role calculation
    return {
      ...mockReadinessScore,
      overall: targetRole === 'Frontend Engineer' ? 74 : targetRole === 'Product Engineer' ? 71 : 62,
    }
  }
}

export async function fetchProofGraph(): Promise<{ nodes: ProofNode[]; edges: ProofEdge[] }> {
  try {
    return await apiFetch<{ nodes: ProofNode[]; edges: ProofEdge[] }>('/api/proofgraph')
  } catch {
    return { nodes: mockProofNodes, edges: mockProofEdges }
  }
}

export async function fetchRoadmap(): Promise<MilestoneTask[]> {
  try {
    return await apiFetch<MilestoneTask[]>('/api/roadmap')
  } catch {
    return mockRoadmapTasks
  }
}

export async function evaluateVivaResponse(
  questionId: string,
  answerText: string
): Promise<VivaFeedback> {
  try {
    return await apiFetch<VivaFeedback>('/api/viva/evaluate', {
      method: 'POST',
      body: JSON.stringify({ questionId, answerText }),
    })
  } catch {
    const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length
    const hasTechnicalKeywords = /trade-off|latency|reconnect|socket|complexity|vitest|in-memory|pointer|state/i.test(answerText)
    
    const depthScore = Math.min(95, Math.max(45, Math.round(wordCount * 0.4 + (hasTechnicalKeywords ? 28 : 10))))
    const ownershipScore = Math.min(94, Math.max(50, /i built|i designed|my role|i implemented/i.test(answerText) ? 88 : 65))
    const tradeOffScore = Math.min(90, Math.max(40, /trade-off|rather than|instead of|alternative|overhead/i.test(answerText) ? 84 : 52))
    const commScore = Math.min(92, Math.max(55, wordCount > 40 ? 82 : 60))
    const overall = Math.round((depthScore * 0.35) + (ownershipScore * 0.25) + (tradeOffScore * 0.25) + (commScore * 0.15))

    return {
      overallScore: overall,
      rubricScores: {
        technicalDepth: depthScore,
        ownershipClarity: ownershipScore,
        architectureTradeoffs: tradeOffScore,
        communicationPrecision: commScore,
      },
      verdict: overall >= 80 ? 'Exemplary' : overall >= 65 ? 'Solid Demonstration' : 'Needs Specifics',
      strengths: [
        hasTechnicalKeywords
          ? 'Articulated core engineering mechanisms with relevant technical terminology.'
          : 'Directly engaged with the fundamental question.',
        wordCount > 45 ? 'Provided thorough situational context with sufficient depth.' : 'Kept response concise and focused.',
      ],
      growthOpportunities: [
        !/benchmark|metric|ms|latency|%|user/i.test(answerText)
          ? 'Quantify results with measurable metrics (e.g. latency impact, user count, or memory saved).'
          : 'Deepen the explanation of how edge-case failures were monitored in production.',
        tradeOffScore < 70
          ? 'Explicitly name the rejected architectural alternative to demonstrate critical trade-off evaluation.'
          : 'Clarify how you tested this behavior under degraded network conditions.',
      ],
      coachNote:
        'A strong interview defense doesn\'t just defend the happy path—it proves why other approaches were rejected and how failure modes are mitigated.',
    }
  }
}
