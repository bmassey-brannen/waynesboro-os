import React, { useMemo, useState } from 'react';
import {
  beautificationFactors,
  councilBrief,
  downtownProperties,
  economicPipeline,
  housing,
  infrastructure,
  integrationRoadmap,
  kpis,
  mapLayers,
  projects,
  safety
} from '../data/cityData.js';
import './WaynesboroTerminal.css';

const statusTone = {
  Active: 'good',
  Planning: 'neutral',
  Procurement: 'watch',
  Blocked: 'bad',
  'Site visit': 'good',
  'Incentive review': 'watch',
  'Property control': 'neutral',
  'Utility due diligence': 'watch',
  Financing: 'neutral'
};

function Sparkline({ points, inverse = false }) {
  const width = 112;
  const height = 30;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const d = points
    .map((p, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const positive = points[points.length - 1] >= points[0];
  const good = inverse ? !positive : positive;
  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} aria-label="trend sparkline">
      <path d={d} className={good ? 'spark-good' : 'spark-bad'} />
    </svg>
  );
}

function KpiCard({ item }) {
  const danger = item.mom.startsWith('-') && !item.inverse;
  return (
    <article className="kpi-card">
      <div className="kpi-topline">
        <span>{item.label}</span>
        <span className={danger ? 'delta bad' : 'delta good'}>{item.mom} MoM</span>
      </div>
      <div className="kpi-value">{item.value}</div>
      <div className="kpi-bottom">
        <span>YoY {item.yoy}</span>
        <Sparkline points={item.trend} inverse={item.inverse} />
      </div>
    </article>
  );
}

function DataTable({ title, eyebrow, rows, columns }) {
  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <span className="terminal-badge">LIVE MOCK</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`}>
                {columns.map((col) => (
                  <td key={col.key} className={col.numeric ? 'num' : ''}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ScoreBar({ score }) {
  return (
    <div className="score-bar" aria-label={`score ${score}`}>
      <span style={{ width: `${score}%` }} />
      <b>{score}</b>
    </div>
  );
}

function ExecutiveDashboard() {
  return (
    <section id="executive" className="module executive-grid">
      <div className="module-title">
        <span className="eyebrow">EXECUTIVE DASHBOARD</span>
        <h1>First-meeting city intelligence board</h1>
        <p>If you became Mayor tomorrow morning, these are the gauges you would check before sitting down with staff.</p>
      </div>
      <div className="kpi-grid">{kpis.map((item) => <KpiCard key={item.label} item={item} />)}</div>
    </section>
  );
}

function EconomicDevelopment() {
  return (
    <section id="economic" className="module two-col">
      <DataTable
        title="Ranked Development Pipeline"
        eyebrow="ECONOMIC DEVELOPMENT"
        rows={economicPipeline}
        columns={[
          { key: 'prospect', label: 'Prospect' },
          { key: 'industry', label: 'Industry' },
          { key: 'jobs', label: 'Jobs', numeric: true },
          { key: 'investment', label: 'CapEx', numeric: true },
          { key: 'status', label: 'Status', render: (row) => <span className={`pill ${statusTone[row.status] || 'neutral'}`}>{row.status}</span> },
          { key: 'probability', label: 'Prob.', render: (row) => <ScoreBar score={row.probability} /> }
        ]}
      />
      <section className="panel intelligence-card">
        <span className="eyebrow">EMPLOYERS / ASSETS / OPPORTUNITIES</span>
        <h2>Economic command notes</h2>
        <div className="metric-stack">
          <div><b>Active business licenses</b><span>312 · +18 YoY</span></div>
          <div><b>New businesses</b><span>14 this period · restaurants, trades, services</span></div>
          <div><b>Business closures</b><span>4 · concentrated in low-foot-traffic retail</span></div>
          <div><b>Largest employers</b><span>Government, healthcare, education, industrial employers</span></div>
          <div><b>Available commercial property</b><span>11 tracked spaces · 4 redevelopment-grade</span></div>
          <div><b>Industrial sites</b><span>3 priority pads · utilities diligence required</span></div>
        </div>
      </section>
    </section>
  );
}

function DowntownCommandCenter() {
  return (
    <section id="downtown" className="module three-col">
      <section className="panel map-panel">
        <div className="panel-head"><div><span className="eyebrow">DOWNTOWN COMMAND CENTER</span><h2>Core map / parcel operating picture</h2></div></div>
        <div className="city-map">
          <div className="gridlines" />
          {downtownProperties.map((p, index) => <button key={p.name} className={`map-node node-${index}`}>{p.name}</button>)}
          <span className="map-label label-a">Liberty St</span>
          <span className="map-label label-b">Sixth St</span>
          <span className="map-label label-c">Redevelopment seam</span>
        </div>
        <div className="layer-strip">{mapLayers.map((layer) => <span key={layer}>{layer}</span>)}</div>
      </section>
      <DataTable
        title="Storefront Intelligence"
        eyebrow="OCCUPANCY / OWNERSHIP / TRAFFIC"
        rows={downtownProperties}
        columns={[
          { key: 'name', label: 'Asset' },
          { key: 'occupancy', label: 'Occupancy', render: (row) => <span className={`pill ${row.occupancy === 'Vacant' ? 'bad' : row.occupancy === 'Partial' ? 'watch' : 'good'}`}>{row.occupancy}</span> },
          { key: 'owner', label: 'Owner' },
          { key: 'footTraffic', label: 'Foot traffic', render: (row) => <ScoreBar score={row.footTraffic} /> },
          { key: 'status', label: 'Readout' }
        ]}
      />
    </section>
  );
}

function BeautificationIndex() {
  const score = useMemo(() => Math.round(beautificationFactors.reduce((sum, item) => sum + item.score, 0) / beautificationFactors.length), []);
  return (
    <section id="beautification" className="module two-col compact">
      <section className="panel score-panel">
        <span className="eyebrow">PROPRIETARY CITY SCORE</span>
        <h2>Beautification Index</h2>
        <div className="big-score"><span>{score}</span><small>/100</small></div>
        <p>Composite of code pressure, vacancy, abandoned structures, downtown occupancy, landscaping, public art, and streetscape momentum.</p>
        <Sparkline points={[52, 55, 58, 60, 63, 66, 70, score]} />
      </section>
      <section className="panel factor-list">
        {beautificationFactors.map((item) => (
          <div className="factor" key={item.factor}>
            <div><b>{item.factor}</b><span>{item.signal}</span></div>
            <ScoreBar score={item.score} />
          </div>
        ))}
      </section>
    </section>
  );
}

function ProjectTracker() {
  return (
    <section id="projects" className="module two-col">
      <DataTable
        title="Project Tracker"
        eyebrow="GANTT + KANBAN DATA MODEL"
        rows={projects}
        columns={[
          { key: 'name', label: 'Project' },
          { key: 'owner', label: 'Owner' },
          { key: 'budget', label: 'Budget', numeric: true },
          { key: 'status', label: 'Status', render: (row) => <span className={`pill ${statusTone[row.status] || 'neutral'}`}>{row.status}</span> },
          { key: 'completion', label: 'Done', render: (row) => <ScoreBar score={row.completion} /> },
          { key: 'priority', label: 'Pri.' }
        ]}
      />
      <section className="panel kanban">
        <span className="eyebrow">KANBAN VIEW</span>
        <div className="kanban-grid">
          {['Planning', 'Active', 'Blocked', 'Procurement'].map((lane) => (
            <div key={lane} className="lane"><h3>{lane}</h3>{projects.filter((p) => p.status === lane).map((p) => <article key={p.name}><b>{p.name}</b><span>{p.owner} · {p.completion}%</span></article>)}</div>
          ))}
        </div>
      </section>
    </section>
  );
}

function InfrastructureSafetyHousing() {
  return (
    <section id="operations" className="module three-stack">
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">INFRASTRUCTURE</span><h2>System health</h2></div></div>
        {infrastructure.map((item) => <div key={item.system} className="ops-row"><b>{item.system}</b><ScoreBar score={item.health} /><span>{item.risk}</span><em>{item.next}</em></div>)}
      </section>
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">PUBLIC SAFETY</span><h2>Incidents / response / trends</h2></div></div>
        <div className="safety-grid">{safety.map((item) => <article key={item.metric} className={`safety-card ${item.severity}`}><span>{item.metric}</span><b>{item.value}</b><em>{item.trend}</em></article>)}</div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">HOUSING & DEVELOPMENT</span><h2>Development heat map</h2></div></div>
        {housing.map((zone) => <div key={zone.zone} className="heat-row"><b>{zone.zone}</b><div className="heat"><span style={{ width: `${zone.heat}%` }} /></div><em>{zone.note}</em></div>)}
      </section>
    </section>
  );
}

function Council() {
  return (
    <section id="council" className="module council-panel">
      <section className="panel council-main">
        <div className="panel-head"><div><span className="eyebrow">AI LAYER</span><h2>The Council</h2></div><span className="terminal-badge gold">MAYOR BRIEF</span></div>
        <div className="council-grid">
          <div className="orb">WOS</div>
          <div className="brief-list">{councilBrief.map((line, index) => <p key={line}><b>{String(index + 1).padStart(2, '0')}</b>{line}</p>)}</div>
        </div>
      </section>
      <section className="panel roadmap">
        <span className="eyebrow">FUTURE DATA CONNECTORS</span>
        <h2>Integration spine</h2>
        <div className="connector-grid">{integrationRoadmap.map((source) => <span key={source}>{source}</span>)}</div>
      </section>
    </section>
  );
}

export default function WaynesboroTerminal() {
  const [active, setActive] = useState('executive');
  const nav = [
    ['executive', 'Executive'], ['economic', 'Economic'], ['downtown', 'Downtown'], ['beautification', 'Beautification'],
    ['projects', 'Projects'], ['operations', 'Operations'], ['council', 'Council']
  ];
  return (
    <main className="terminal-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>W</span><div><b>Waynesboro OS</b><small>Municipal Intelligence Terminal</small></div></div>
        <nav>{nav.map(([id, label]) => <a key={id} onClick={() => setActive(id)} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
        <div className="sidebar-note"><b>Core question</b><span>If I became Mayor tomorrow morning, what do I need before my first meeting?</span></div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">WAYNESBORO, GEORGIA · CITY OPERATING PICTURE</span>
            <h1>Municipal Operating Picture for Waynesboro.</h1>
            <p className="public-disclaimer">Public-presentable demo interface using synthetic mock data. Built to show what a city intelligence terminal could become as official sources are connected.</p>
          </div>
          <div className="market-clock"><b>MOCK DATA MODE</b><span>Census · DCA · GIS · Tax · Utility ready</span></div>
        </header>
        <ExecutiveDashboard />
        <EconomicDevelopment />
        <DowntownCommandCenter />
        <BeautificationIndex />
        <ProjectTracker />
        <InfrastructureSafetyHousing />
        <Council />
      </section>
    </main>
  );
}
