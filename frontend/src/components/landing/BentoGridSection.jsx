import { useState } from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck, HeartPulse, CheckSquare, Clock, User, Compass, ArrowRight, Zap, Sliders } from 'lucide-react';

export default function BentoGridSection() {
  const [evolutionAlignment, setEvolutionAlignment] = useState(88);
  const [selectedAgent, setSelectedAgent] = useState('Orchestrator');

  const agents = [
    { name: 'Orchestrator', role: 'Smart Intent Routing & Multi-Agent Dispatch', status: 'Active' },
    { name: 'Profile & Identity', role: 'Personal Details, Goals & Tone Alignment', status: 'Syncing' },
    { name: 'Productivity & Tasks', role: 'Schedule Optimization, Deadlines & Habits', status: 'Active' },
    { name: 'Wellness & Mood', role: 'Emotional Check-ins & Burnout Prevention', status: 'Listening' },
    { name: 'Lifestyle & Hobbies', role: 'Music, Reading, Pets & Weekend Plans', status: 'Learning' },
    { name: 'Memory & Adaptation', role: 'Persistent Vector Memory & Knowledge Vault', status: 'Active' },
    { name: 'Safety & Guardrails', role: 'Privacy, Consent & Responsible AI Safeguards', status: 'Enforced' },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#06040a] text-neutral-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-purple-900/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-pink-950/15 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/25 text-purple-300 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Multi-Agent Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-neutral-100 font-normal tracking-tight leading-tight">
            An Evolving Digital Twin Powered by 7 Specialized Agents
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            ATHENA does not just answer prompts. It observes your schedule, retains life context, optimizes productivity, and evolves to mirror your authentic personality.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* ============================================================ */}
          {/* CARD 1: Large Anchor Feature (7 Cols, Row Span 2)            */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 lg:row-span-2 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {/* Top gradient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-purple-300 bg-purple-950/50 border border-purple-500/30 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  Semantic Memory Vault
                </span>
                <span className="text-xs text-neutral-400 font-mono">Continuous Adaptation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-snug">
                Persistent Memory That Learns Your Habits, Routines & Authentic Tone
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed max-w-lg font-light">
                Every conversation, completed task, sleep log, and pet reminder refines Athena's understanding of your lifestyle. It remembers past decisions and anticipates upcoming needs before you have to ask.
              </p>
            </div>

            {/* Interactive Memory & Adaptation Visual */}
            <div className="mt-8 rounded-2xl bg-[#090611] border border-white/10 p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  Twin Persona Alignment: {evolutionAlignment}%
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  Adaptive Mirror Active
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-white/5 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-violet-400 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${evolutionAlignment}%` }}
                />
              </div>

              {/* Memory Nodes Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { tag: 'Morning Routine', desc: 'Focus block 8:30 AM' },
                  { tag: 'Diet & Coffee', desc: 'Oat milk latte at 10 AM' },
                  { tag: 'Fitness Goal', desc: '5km evening run' },
                  { tag: 'Pet Care', desc: 'Vet appointment Friday' },
                  { tag: 'Music Taste', desc: 'Ambient Lo-Fi for coding' },
                  { tag: 'Twin Tone', desc: 'Empathetic & direct' }
                ].map((node, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8 text-left">
                    <div className="text-[10px] text-purple-300 font-mono uppercase tracking-wider">{node.tag}</div>
                    <div className="text-xs text-neutral-300 font-medium truncate mt-0.5">{node.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: 7 Specialized Agents Orchestration (5 Cols)          */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-7 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                7 Active Agents
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Autonomous Agent Orchestration
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Athena's orchestrator analyzes your requests and routes them to specialized agents for tasks, wellness, lifestyle, memory, and safety.
            </p>

            {/* Agent Selector List */}
            <div className="mt-4 space-y-1.5">
              {agents.slice(0, 4).map((ag) => (
                <div
                  key={ag.name}
                  onClick={() => setSelectedAgent(ag.name)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedAgent === ag.name
                      ? 'bg-purple-950/50 border-purple-500/50 text-white'
                      : 'bg-white/[0.03] border-white/8 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">{ag.name}</span>
                    <span className="text-[10px] text-neutral-400 truncate">{ag.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full">
                    {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: Wellness & Emotional Intelligence (5 Cols)           */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-7 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-pink-300 bg-pink-950/40 border border-pink-500/30 px-2.5 py-0.5 rounded-full">
                Empathetic Health Support
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Wellness & Mood Intelligence
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Tracks daily emotional state, suggests restorative habits, reminds you to hydrate, and flags cognitive fatigue before burnout sets in.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#090611] border border-white/8 flex items-center justify-between text-xs">
              <span className="text-neutral-300">Today's Balance Score:</span>
              <span className="font-mono text-emerald-400 font-bold">94 / 100 Optimal</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 4: Personal Productivity & Smart Reminders (6 Cols)     */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <CheckSquare className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                Task & Routine Engine
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Context-Aware Task Prioritization
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Athena analyzes upcoming deadlines, meeting schedules, energy rhythms, and commitments to build proactive, realistic daily action plans.
            </p>

            <div className="mt-5 space-y-2">
              {[
                { title: 'GATEWAYS Hackathon Project Submission', time: '5:00 PM Today', tag: 'High Priority' },
                { title: 'Evening Hydration & 20-min Walk', time: '7:30 PM Today', tag: 'Wellness' },
              ].map((task, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#090611] border border-white/8 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{task.title}</span>
                    <span className="text-[10px] text-neutral-400">{task.time}</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-md">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 5: Privacy, Safety & Ethical Guardrails (6 Cols)        */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Zero-Leak Guarantee
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Safety Guardrails & Sovereign Privacy
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Your digital twin belongs strictly to you. With end-to-end memory encryption, local permission controls, and non-medical boundaries, your personal data is never shared.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-white">AES-256</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Encrypted Vault</div>
              </div>
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-purple-300">100%</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">User Consent</div>
              </div>
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-emerald-300">Safe</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Guardrails Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
