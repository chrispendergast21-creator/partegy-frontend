'use client';

import { useState } from 'react';
import { PageNavigation } from '@/components/PageNavigation';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Activity
} from 'lucide-react';

export default function GovernanceDashboard() {
  const [activeFilter, setActiveFilter] = useState('All Partnerships');

  const partners = ['Acme Corp', 'NextGen Tech', 'Enterprise Systems Co', 'Apex Dynamics', 'Cloud Services'];

  const riskMatrix = [
    { partner: 'NextGen Tech', trust: 'low', engagement: 'low', alignment: 'medium', velocity: 'low' },
    { partner: 'Enterprise Co', trust: 'medium', engagement: 'low', alignment: 'low', velocity: 'medium' },
    { partner: 'Cloud Services', trust: 'medium', engagement: 'medium', alignment: 'high', velocity: 'medium' },
    { partner: 'Apex Dynamics', trust: 'high', engagement: 'high', alignment: 'medium', velocity: 'high' },
    { partner: 'Acme Corp', trust: 'high', engagement: 'high', alignment: 'high', velocity: 'high' },
  ];

  const maturityData = [
    { partner: 'Acme Corp', initiating: 0, defined: 10, managed: 35, optimizing: 55 },
    { partner: 'NextGen Tech', initiating: 40, defined: 35, managed: 20, optimizing: 5 },
    { partner: 'Enterprise Co', initiating: 20, defined: 45, managed: 30, optimizing: 5 },
  ];

  const milestones = [
    { date: 'Sep 22', name: 'Acme Corp QBR', urgent: false },
    { date: 'Sep 28', name: 'Risk Workshop — NextGen', urgent: true },
    { date: 'Oct 5', name: 'Apex Dynamics Renewal', urgent: false },
    { date: 'Oct 12', name: 'Portfolio Review', urgent: false },
  ];

  const alerts = [
    { type: 'critical', title: 'Anomaly Detected', desc: 'Sudden 47% decrease in NextGen Tech executive meeting attendance over 30 days.' },
    { type: 'warning', title: 'Flagged Trend', desc: 'Increasing friction signals during joint roadmap sessions with Enterprise Systems Co.' },
    { type: 'info', title: 'Positive Signal', desc: 'Acme Corp engagement frequency up 23% — expansion opportunity detected.' },
  ];

  const sentimentMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const positiveData = [45, 52, 48, 61, 58, 72, 68, 75, 82];
  const negativeData = [30, 28, 35, 22, 25, 18, 20, 15, 12];
  const chartH = 80;

  const communicationNodes = [
    { id: 'acme', label: 'Acme', x: 200, y: 80, size: 24, color: '#10b981' },
    { id: 'apex', label: 'Apex', x: 380, y: 60, size: 20, color: '#10b981' },
    { id: 'cloud', label: 'Cloud', x: 480, y: 160, size: 18, color: '#f59e0b' },
    { id: 'enterprise', label: 'Enterprise', x: 300, y: 200, size: 16, color: '#f59e0b' },
    { id: 'nextgen', label: 'NextGen', x: 160, y: 200, size: 14, color: '#ef4444' },
    { id: 'you', label: 'YOU', x: 320, y: 130, size: 28, color: '#3b82f6' },
  ];

  const commsEdges = [
    { from: 'you', to: 'acme', strength: 3 },
    { from: 'you', to: 'apex', strength: 3 },
    { from: 'you', to: 'cloud', strength: 2 },
    { from: 'you', to: 'enterprise', strength: 2 },
    { from: 'you', to: 'nextgen', strength: 1 },
    { from: 'acme', to: 'apex', strength: 2 },
    { from: 'cloud', to: 'enterprise', strength: 1 },
  ];

  const getNodeById = (id: string) => communicationNodes.find(n => n.id === id);

  const getCell = (val: string) => {
    if (val === 'high') return 'bg-emerald-500/30 text-emerald-400';
    if (val === 'medium') return 'bg-amber-500/30 text-amber-400';
    return 'bg-red-500/30 text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Governance Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Strategic Partnership Behavioral Intelligence</p>
          </div>
          <div className="flex items-center space-x-3">
            <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Partnerships</option>
              {partners.map(p => <option key={p}>{p}</option>)}
            </select>
            <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-sm">Live</span>
            </div>
          </div>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Health Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Partnership Health Overview</div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.83} ${2 * Math.PI * 50}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-white">83</div>
                  <div className="text-emerald-400 text-xs font-semibold">Healthy</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Engagement', score: 78, color: 'bg-blue-400' },
                { label: 'Trust Index', score: 85, color: 'bg-emerald-400' },
                { label: 'Strategic Alignment', score: 72, color: 'bg-purple-400' },
                { label: 'Commitment Level', score: 80, color: 'bg-amber-400' },
                { label: 'Execution Velocity', score: 68, color: 'bg-orange-400' },
              ].map((dim) => (
                <div key={dim.label} className="flex items-center space-x-3">
                  <div className="text-slate-400 text-xs w-32 flex-shrink-0">{dim.label}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${dim.color}`} style={{ width: `${dim.score}%` }}></div>
                  </div>
                  <div className="text-slate-300 text-xs w-6 text-right">{dim.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Risk Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Behavioral Risk Assessment</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left text-slate-500 pb-3 font-medium">Partner</th>
                    <th className="text-center text-slate-500 pb-3 font-medium">Trust</th>
                    <th className="text-center text-slate-500 pb-3 font-medium">Engage</th>
                    <th className="text-center text-slate-500 pb-3 font-medium">Align</th>
                    <th className="text-center text-slate-500 pb-3 font-medium">Velocity</th>
                    <th className="text-center text-slate-500 pb-3 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {riskMatrix.map((row) => {
                    const isRisk = [row.trust, row.engagement, row.alignment, row.velocity].filter(v => v === 'low').length >= 2;
                    return (
                      <tr key={row.partner} className="border-t border-slate-800">
                        <td className="py-2 text-slate-300 pr-2 whitespace-nowrap">{row.partner.split(' ')[0]}</td>
                        {[row.trust, row.engagement, row.alignment, row.velocity].map((val, i) => (
                          <td key={i} className="py-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getCell(val)}`}>
                              {val.charAt(0).toUpperCase()}
                            </span>
                          </td>
                        ))}
                        <td className="py-2 text-center">
                          {isRisk
                            ? <TrendingDown className="w-3.5 h-3.5 text-red-400 mx-auto" />
                            : <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded bg-emerald-500"></div><span className="text-slate-400">High</span></div>
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded bg-amber-500"></div><span className="text-slate-400">Medium</span></div>
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded bg-red-500"></div><span className="text-slate-400">Low</span></div>
            </div>
          </div>

          {/* Alliance Maturity */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Key Alliance Maturity</div>
            <div className="space-y-5">
              {maturityData.map((p) => (
                <div key={p.partner}>
                  <div className="text-slate-300 text-xs mb-2">{p.partner}</div>
                  <div className="flex h-5 rounded-lg overflow-hidden gap-0.5">
                    <div className="bg-slate-600" style={{ width: `${p.initiating}%` }}></div>
                    <div className="bg-blue-500" style={{ width: `${p.defined}%` }}></div>
                    <div className="bg-amber-500" style={{ width: `${p.managed}%` }}></div>
                    <div className="bg-emerald-500" style={{ width: `${p.optimizing}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Initiating', color: 'bg-slate-600' },
                { label: 'Defined', color: 'bg-blue-500' },
                { label: 'Managed', color: 'bg-amber-500' },
                { label: 'Optimizing', color: 'bg-emerald-500' },
              ].map(l => (
                <div key={l.label} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded ${l.color}`}></div>
                  <span className="text-slate-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sentiment */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Interaction Patterns & Climate</div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs text-slate-500 mb-3">Positive Signals</div>
                <div className="space-y-1">
                  {['Transparency', 'Innovation', 'Collaboration', 'Trust', 'Alignment'].map((kw, i) => (
                    <div key={kw} className="text-emerald-400 font-bold" style={{ fontSize: `${16 - i * 2}px` }}>{kw}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-3">Risk Signals</div>
                <div className="space-y-1">
                  {['Delays', 'Misaligned', 'Conflict', 'Resource Gaps', 'Friction'].map((kw, i) => (
                    <div key={kw} className="text-red-400 font-bold" style={{ fontSize: `${16 - i * 2}px` }}>{kw}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-2">Sentiment Trends (Monthly)</div>
            <svg viewBox={`0 0 400 ${chartH}`} className="w-full h-20">
              <polyline
                points={positiveData.map((v, i) => `${i * 50},${chartH - (v / 100) * chartH}`).join(' ')}
                fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline
                points={negativeData.map((v, i) => `${i * 50},${chartH - (v / 100) * chartH}`).join(' ')}
                fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex justify-between mt-1 mb-3">
              {sentimentMonths.map(m => <span key={m} className="text-slate-600 text-xs">{m}</span>)}
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1"><div className="w-3 h-0.5 bg-emerald-400"></div><span className="text-slate-400">Positive</span></div>
              <div className="flex items-center space-x-1"><div className="w-3 h-0.5 bg-red-400"></div><span className="text-slate-400">Risk</span></div>
            </div>
          </div>

          {/* Communication Flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Communication Flow Analysis</div>
            <svg viewBox="0 0 560 240" className="w-full h-48">
              {commsEdges.map((edge, i) => {
                const from = getNodeById(edge.from);
                const to = getNodeById(edge.to);
                if (!from || !to) return null;
                const colors = ['#ef4444', '#f59e0b', '#10b981'];
                return (
                  <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={colors[edge.strength - 1]} strokeWidth={edge.strength} strokeOpacity={0.4} />
                );
              })}
              {communicationNodes.map((node) => (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} fillOpacity={0.3} stroke={node.color} strokeWidth={2} />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{node.label}</text>
                </g>
              ))}
            </svg>
            <div className="flex items-center space-x-4 mt-2 text-xs">
              <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-emerald-500 opacity-70"></div><span className="text-slate-400">High Flow</span></div>
              <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-amber-500 opacity-70"></div><span className="text-slate-400">Medium Flow</span></div>
              <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div><span className="text-slate-400">Bottleneck</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Strategic Alignment */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Strategic Alignment Tracker</div>
            <div className="space-y-4">
              {[
                { label: 'Product Development', values: [40, 55, 60, 70, 72], color: '#3b82f6' },
                { label: 'Market Expansion', values: [30, 35, 50, 65, 80], color: '#10b981' },
                { label: 'Customer Success', values: [50, 52, 58, 62, 68], color: '#f59e0b' },
              ].map((track) => (
                <div key={track.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-400 text-xs">{track.label}</span>
                    <span className="text-white text-xs font-bold">{track.values[track.values.length - 1]}%</span>
                  </div>
                  <svg viewBox="0 0 200 40" className="w-full h-8">
                    <polyline
                      points={track.values.map((v, i) => `${i * 50},${40 - (v / 100) * 40}`).join(' ')}
                      fill="none" stroke={track.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Upcoming Milestones & Reviews</div>
            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${m.urgent ? 'border-amber-900/50 bg-amber-950/20' : 'border-slate-800 bg-slate-800/50'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                    <div>
                      <div className="text-white text-sm font-medium">{m.name}</div>
                      <div className="text-slate-500 text-xs">{m.date}</div>
                    </div>
                  </div>
                  {m.urgent && <span className="text-xs text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full">Urgent</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Behavioral Insights Alerts</div>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'border-red-500 bg-red-950/20' :
                  alert.type === 'warning' ? 'border-amber-500 bg-amber-950/20' :
                  'border-blue-500 bg-blue-950/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {alert.type === 'critical' && <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                    {alert.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                    {alert.type === 'info' && <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />}
                    <span className={`text-xs font-bold ${
                      alert.type === 'critical' ? 'text-red-400' :
                      alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                    }`}>{alert.title}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
