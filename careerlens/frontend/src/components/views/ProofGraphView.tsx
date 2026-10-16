import React, { useState } from 'react'
import {
  Link2,
  ShieldCheck,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import {
  ProofNode,
  ProofEdge,
  NodeType,
  EvidenceStatus,
} from '../../types/career'

interface ProofGraphViewProps {
  nodes: ProofNode[]
  edges: ProofEdge[]
  onSelectNode: (node: ProofNode) => void
  onOpenAddEvidence: () => void
}

export const ProofGraphView: React.FC<ProofGraphViewProps> = ({
  nodes,
  edges,
  onSelectNode,
  onOpenAddEvidence,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('proj-campus')
  const [filterType, setFilterType] = useState<NodeType | 'all'>('all')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter nodes based on type and search query
  const filteredNodes = nodes.filter((node) => {
    if (filterType !== 'all' && node.type !== filterType) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        node.label.toLowerCase().includes(q) ||
        node.sublabel.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q)
      )
    }
    return true
  })

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null

  // Find all neighbor nodes connected to the selected node
  const connectedNodeIds = new Set(
    edges
      .filter((e) => e.source === selectedNodeId || e.target === selectedNodeId)
      .flatMap((e) => [e.source, e.target])
  )

  const getNodeBg = (status: EvidenceStatus, isSelected: boolean) => {
    if (isSelected) return 'fill-stone-surface stroke-cobalt-600 stroke-[2.5]'
    switch (status) {
      case 'verified':
        return 'fill-stone-surface stroke-emerald-500 stroke-[1.5]'
      case 'claimed':
        return 'fill-stone-surface stroke-amber-400 stroke-[1.5]'
      case 'not_observed':
        return 'fill-stone-soft stroke-stone-hairline stroke-[1] stroke-dasharray-[3,3]'
    }
  }

  return (
    <div className="space-y-6 animation-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-stone-hairline">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-1.5">
            <Link2 size={14} className="text-cobalt-600" />
            <span>INTERACTIVE PROOF OF WORK & EVIDENCE TOPOLOGY</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Proof<span className="text-cobalt-600 font-serif italic font-normal">Graph</span>
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed mt-1 max-w-3xl">
            A real-time network connecting claims to verifiable code repositories, automated test suites, and third-party certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddEvidence}
            className="px-3.5 py-1.5 rounded-md border border-stone-hairline bg-stone-surface hover:bg-stone-soft text-ink text-xs font-medium transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <span>Connect New Evidence Node</span>
            <ExternalLink size={13} className="text-ink-quaternary" />
          </button>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="p-3.5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-wrap items-center justify-between gap-3">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          <span className="text-[11px] font-mono text-ink-quaternary uppercase mr-1">
            Filter:
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filterType === 'all'
                ? 'bg-ink text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            All Nodes ({nodes.length})
          </button>
          <button
            onClick={() => setFilterType('skill')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filterType === 'skill'
                ? 'bg-cobalt-600 text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            Skills (4)
          </button>
          <button
            onClick={() => setFilterType('project')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filterType === 'project'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            Projects (3)
          </button>
          <button
            onClick={() => setFilterType('repo')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filterType === 'repo'
                ? 'bg-ink text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            Repositories
          </button>
          <button
            onClick={() => setFilterType('certificate')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              filterType === 'certificate'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-canvas-subtle border border-stone-hairline text-ink-secondary hover:text-ink'
            }`}
          >
            Credentials
          </button>
        </div>

        {/* Search & Zoom controls */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-ink-quaternary" />
            <input
              type="text"
              placeholder="Search graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-3 py-1 text-xs bg-canvas-subtle border border-stone-hairline rounded-md text-ink placeholder:text-ink-quaternary focus:outline-none focus:border-cobalt-500 w-36 sm:w-44"
            />
          </div>

          <div className="flex items-center border border-stone-hairline rounded-md bg-canvas-subtle p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 text-ink-tertiary hover:text-ink rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-ink-secondary">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 text-ink-tertiary hover:text-ink rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-ink-tertiary hover:text-ink rounded border-l border-stone-hairline transition-colors ml-0.5"
              title="Reset view"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Graph Canvas & Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Interactive Canvas (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle relative overflow-hidden">
          {/* Legend Banner */}
          <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-stone-hairline">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-ink-secondary text-[11px]">Verified Proof</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-ink-secondary text-[11px]">Self-Reported</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-soft border border-dashed border-ink-quaternary inline-block" />
                <span className="text-ink-tertiary text-[11px]">Evidence Gap</span>
              </span>
            </div>
            <span className="text-[10px] text-ink-quaternary hidden sm:inline">
              Click node to inspect dossier
            </span>
          </div>

          {/* Working Interactive Graph SVG */}
          <div className="w-full overflow-x-auto py-2">
            <div
              className="transition-transform duration-200 origin-top-left min-w-[760px]"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 880 540"
                className="w-full h-auto select-none"
                role="img"
                aria-label="Interactive ProofGraph Network"
              >
                <defs>
                  {/* Subtle link gradients */}
                  <linearGradient id="edgeGlowPrimary" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="edgeMuted" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>

                  <filter id="nodeShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.04" />
                  </filter>
                </defs>

                {/* Graph Edges */}
                <g className="edges">
                  {edges.map((edge) => {
                    const srcNode = nodes.find((n) => n.id === edge.source)
                    const tgtNode = nodes.find((n) => n.id === edge.target)
                    if (!srcNode || !tgtNode) return null

                    const isConnected =
                      selectedNodeId !== null &&
                      (edge.source === selectedNodeId || edge.target === selectedNodeId)
                    const isMuted = selectedNodeId !== null && !isConnected

                    // Curved bezier path between nodes
                    const dx = tgtNode.x - srcNode.x
                    const c1x = srcNode.x + dx * 0.45
                    const c1y = srcNode.y
                    const c2x = srcNode.x + dx * 0.55
                    const c2y = tgtNode.y
                    const pathData = `M ${srcNode.x} ${srcNode.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tgtNode.x} ${tgtNode.y}`

                    return (
                      <g key={edge.id} className="transition-opacity duration-200">
                        <path
                          d={pathData}
                          fill="none"
                          stroke={isConnected ? 'url(#edgeGlowPrimary)' : '#E2E8F0'}
                          strokeWidth={isConnected ? 2.5 : 1.5}
                          strokeDasharray={edge.strength === 'supporting' ? '4,4' : 'none'}
                          opacity={isMuted ? 0.25 : 1}
                        />
                        {/* Midpoint Label if connected */}
                        {isConnected && edge.label && (
                          <text
                            x={(srcNode.x + tgtNode.x) / 2}
                            y={(srcNode.y + tgtNode.y) / 2 - 6}
                            textAnchor="middle"
                            fill="#1E40AF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="600"
                            className="bg-white"
                          >
                            {edge.label}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>

                {/* Graph Nodes */}
                <g className="nodes">
                  {filteredNodes.map((node) => {
                    const isSelected = node.id === selectedNodeId
                    const isNeighbor = connectedNodeIds.has(node.id)
                    const isDimmed = selectedNodeId !== null && !isSelected && !isNeighbor

                    const width = 168
                    const height = 58
                    const rx = 10

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x - width / 2}, ${node.y - height / 2})`}
                        onClick={() => {
                          setSelectedNodeId(node.id)
                          onSelectNode(node)
                        }}
                        className={`cursor-pointer transition-all duration-200 ${
                          isDimmed ? 'opacity-35' : 'opacity-100'
                        }`}
                      >
                        {/* Card background */}
                        <rect
                          width={width}
                          height={height}
                          rx={rx}
                          className={`${getNodeBg(node.status, isSelected)} transition-all`}
                          filter="url(#nodeShadow)"
                        />

                        {/* Node Type Top Indicator Strip */}
                        <rect
                          x={1.5}
                          y={1.5}
                          width={width - 3}
                          height={3.5}
                          rx={1.5}
                          className={
                            node.status === 'verified'
                              ? 'fill-emerald-500'
                              : node.status === 'claimed'
                              ? 'fill-amber-400'
                              : 'fill-stone-hairline'
                          }
                        />

                        {/* Title & Subtitle */}
                        <text
                          x={14}
                          y={26}
                          fill="#111418"
                          fontSize="11.5"
                          fontWeight={isSelected ? '700' : '600'}
                          fontFamily="sans-serif"
                        >
                          {node.label}
                        </text>
                        <text
                          x={14}
                          y={42}
                          fill="#6B737A"
                          fontSize="9.5"
                          fontFamily="sans-serif"
                        >
                          {node.sublabel.length > 25
                            ? node.sublabel.slice(0, 24) + '...'
                            : node.sublabel}
                        </text>

                        {/* Score/Confidence badge at right */}
                        <rect
                          x={width - 42}
                          y={16}
                          width={32}
                          height={18}
                          rx={4}
                          className="fill-stone-soft"
                        />
                        <text
                          x={width - 26}
                          y={29}
                          textAnchor="middle"
                          fill="#111418"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          {node.confidence}%
                        </text>
                      </g>
                    )
                  })}
                </g>
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-hairline flex items-center justify-between text-[11px] text-ink-tertiary">
            <span>Graph computed deterministically from active workspace artifacts</span>
            <span className="font-mono text-ink-secondary">11 edges · 10 nodes</span>
          </div>
        </div>

        {/* Selected Node Detailed Inspector Dossier (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-panel border border-stone-hairline bg-stone-surface shadow-subtle flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-stone-hairline">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-quaternary">
                      Node Inspector
                    </span>
                    {selectedNode.status === 'verified' && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 flex items-center gap-0.5">
                        <ShieldCheck size={10} /> Verified
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base text-ink">
                    {selectedNode.label}
                  </h3>
                  <p className="text-xs text-ink-tertiary mt-0.5">{selectedNode.sublabel}</p>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="p-3 rounded-card bg-canvas-subtle border border-stone-hairline flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-ink-tertiary uppercase">
                    Verification Confidence
                  </span>
                  <div className="font-display font-bold text-xl text-ink mt-0.5">
                    {selectedNode.confidence}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-3 border-cobalt-600 flex items-center justify-center font-mono font-bold text-xs text-ink">
                  {selectedNode.confidence}
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-[10px] font-mono uppercase text-ink-quaternary tracking-wider block mb-1">
                  Evidence Context
                </span>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Observable Metrics */}
              {selectedNode.metrics && (
                <div className="p-3 rounded-card bg-stone-soft border border-stone-hairline space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase text-ink-quaternary block">
                    Telemetry Invariants
                  </span>
                  {selectedNode.metrics.commits && (
                    <div className="flex justify-between font-mono">
                      <span className="text-ink-tertiary">Indexed Commits:</span>
                      <span className="font-semibold text-ink">{selectedNode.metrics.commits}</span>
                    </div>
                  )}
                  {selectedNode.metrics.coverage && (
                    <div className="flex justify-between font-mono">
                      <span className="text-ink-tertiary">Branch Coverage:</span>
                      <span className="font-semibold text-emerald-700">{selectedNode.metrics.coverage}</span>
                    </div>
                  )}
                  {selectedNode.metrics.linesOfCode && (
                    <div className="flex justify-between font-mono">
                      <span className="text-ink-tertiary">Volume:</span>
                      <span className="font-semibold text-ink">{selectedNode.metrics.linesOfCode}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Provenance source */}
              <div className="p-3 rounded-card bg-canvas-subtle border border-stone-hairline space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-ink-quaternary block">
                  Artifact Provenance
                </span>
                <div className="text-xs font-medium text-ink">{selectedNode.provenance.source}</div>
                {selectedNode.provenance.snippet && (
                  <div className="font-mono text-[10.5px] p-2 bg-stone-surface rounded border border-stone-hairline text-ink-secondary overflow-x-auto">
                    {selectedNode.provenance.snippet}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-ink-tertiary text-xs">
              Select a node in the ProofGraph to inspect its evidence dossier.
            </div>
          )}

          {selectedNode && (
            <div className="pt-4 border-t border-stone-hairline">
              <button
                onClick={() => onSelectNode(selectedNode)}
                className="w-full py-2 px-3 rounded-md bg-ink hover:bg-ink-secondary text-white text-xs font-medium transition-all shadow-subtle flex items-center justify-center gap-1.5"
              >
                <span>Open Full Dossier Drawer</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
