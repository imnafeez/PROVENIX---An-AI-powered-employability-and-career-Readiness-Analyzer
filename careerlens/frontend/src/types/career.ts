export type Tab =
  | 'Overview'
  | 'Career intelligence'
  | 'ProofGraph'
  | 'Roadmap'
  | 'Project viva'
  | 'Profile & evidence'

export type EvidenceStatus = 'verified' | 'claimed' | 'not_observed'

export interface SkillItem {
  id: string
  name: string
  category: 'core' | 'frontend' | 'systems' | 'architecture' | 'engineering' | 'communication'
  score: number // 0-100 proficiency signal
  benchmark: number // benchmark required for target role
  coverage: number // 0-100 evidence coverage
  evidenceStatus: EvidenceStatus
  evidenceSources: {
    type: 'github_commit' | 'code_repo' | 'resume' | 'certificate' | 'viva_evaluation'
    label: string
    date: string
    detail: string
    verified: boolean
  }[]
  rationale: string
  recency: string
}

export type NodeType = 'skill' | 'project' | 'repo' | 'certificate' | 'resume'

export interface ProofNode {
  id: string
  label: string
  sublabel: string
  type: NodeType
  status: EvidenceStatus
  confidence: number // 0-100
  x: number
  y: number
  metrics?: {
    commits?: number
    linesOfCode?: string
    coverage?: string
    stars?: number
    testsCount?: number
  }
  description: string
  provenance: {
    source: string
    verifiedAt?: string
    snippet?: string
    linkText?: string
  }
}

export interface ProofEdge {
  id: string
  source: string
  target: string
  strength: 'primary' | 'supporting' | 'inferred'
  label?: string
}

export interface MilestoneTask {
  id: string
  title: string
  description: string
  effort: string // e.g. "45 min", "2-3 hrs"
  phase: 'Phase 1: Deep Project Evidence' | 'Phase 2: Reliability & Systems' | 'Phase 3: Viva & Storytelling'
  priority: 'Critical' | 'High' | 'Medium'
  category: 'Portfolio' | 'Engineering' | 'Systems' | 'Interview'
  status: 'completed' | 'in_progress' | 'upcoming'
  impactBadge: string
  actionItems: string[]
  completedAt?: string
}

export interface VivaQuestion {
  id: string
  projectId: string
  projectTitle: string
  category: 'Architecture & Constraints' | 'Ownership & Impact' | 'Failure & Technical Trade-offs' | 'Edge Cases & Scale'
  question: string
  context: string
  thinkingPrompt: string
  rubric: {
    criterion: string
    lookFor: string
  }[]
}

export interface VivaFeedback {
  overallScore: number
  rubricScores: {
    technicalDepth: number
    ownershipClarity: number
    architectureTradeoffs: number
    communicationPrecision: number
  }
  verdict: 'Exemplary' | 'Solid Demonstration' | 'Needs Specifics'
  strengths: string[]
  growthOpportunities: string[]
  coachNote: string
}

export interface ReadinessScoreComponent {
  name: string
  score: number
  weight: number
  coverage: number
  status: 'healthy' | 'developing' | 'action_needed'
  evidenceCount: number
  rationale: string
  topEvidence: string
}

export interface ReadinessScore {
  overall: number
  confidence: number
  confidenceLevel: 'High' | 'Moderate' | 'Preliminary'
  trend: {
    change: number
    period: string
    weekly: { week: string; score: number; coverage: number }[]
  }
  components: ReadinessScoreComponent[]
  disclaimer: string
}

export interface UserProfile {
  name: string
  role: string
  avatarInitials: string
  university: string
  year: string
  degree: string
  headline: string
  targetRole: string
  availableRoles: string[]
  profileCompleteness: number
  sources: {
    resume: {
      status: 'connected' | 'missing'
      filename?: string
      sectionsParsed?: number
      lastScan?: string
    }
    github: {
      status: 'connected' | 'disconnected'
      handle?: string
      reposIndexed?: number
      commitsTracked?: number
      lastSync?: string
    }
    portfolio: {
      status: 'connected' | 'unverified' | 'missing'
      url?: string
      lastVerified?: string
    }
    certificates: {
      count: number
      verifiedCount: number
      items: {
        id: string
        name: string
        issuer: string
        date: string
        credentialUrl?: string
        verified: boolean
      }[]
    }
    projects: {
      id: string
      title: string
      role: string
      description: string
      techStack: string[]
      metrics: string
      repoUrl: string
      evidenceCoverage: number
      vivaReadiness: 'practiced' | 'needs_practice'
    }[]
  }
}

export interface ActivityFeedItem {
  id: string
  title: string
  detail: string
  timestamp: string
  type: 'analysis' | 'evidence' | 'viva' | 'task' | 'milestone'
  badge?: string
}
