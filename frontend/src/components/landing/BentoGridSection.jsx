import { useState } from 'react';
import { Sparkles, Cpu, Layers, ShieldCheck, Zap, Sliders, CheckCircle2, ArrowUpRight, Compass, Wand2 } from 'lucide-react';

export default function BentoGridSection() {
  const [activeMaterial, setActiveMaterial] = useState('Iridescent Silk');
  const [denoiseValue, setDenoiseValue] = useState(48);

  const materials = ['Iridescent Silk', 'Celestial Gold', 'Liquid Glass', 'Cyber Matte'];

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
            <span>Architectural Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-neutral-100 font-normal tracking-tight leading-tight">
            Engineered for Extreme Visual Fidelity & Twin Agency
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            DreamFrame synthesizes high-dimensional creative prompts into cinematic reality through 7 coordinated AI agents and sub-second neural rendering.
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
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-purple-300 bg-purple-950/50 border border-purple-500/30">
                  Denoising Diffusion 8K
                </span>
                <span className="text-xs text-neutral-400 font-mono">v4.8 Neural Core</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-snug">
                Photorealistic Neural Synthesis with Sub-Pixel Depth Precision
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed max-w-lg font-light">
                Continuous latent trajectory rendering maintains perfect anatomical accuracy, cinematic lighting falloff, and realistic light ray refraction across all frames.
              </p>
            </div>

            {/* Interactive Preview Canvas Window inside Card 1 */}
            <div className="mt-8 rounded-2xl bg-[#090611] border border-white/10 p-4 relative overflow-hidden">
              <div className="relative h-60 sm:h-72 rounded-xl overflow-hidden">
                <img
                  src="/hero-art.jpg"
                  alt="Neural synthesis preview"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090611] via-transparent to-transparent opacity-80" />

                {/* Floating telemetry pills */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-white flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>8192 × 4608</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-purple-200 font-mono">
                    120ms Latency
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300 bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span>Denoising Steps: {denoiseValue}/50</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={denoiseValue}
                    onChange={(e) => setDenoiseValue(Number(e.target.value))}
                    className="w-24 sm:w-36 accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: Identity & Digital Twin Consistency (5 Cols)         */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-7 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                99.8% Identity Retention
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Persistent Identity Architecture
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Your digital twin maintains unwavering facial geometry, emotional nuance, and stylistic signature across infinite perspectives.
            </p>

            {/* Multi-angle visual cards */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { angle: 'Frontal 0°', sub: 'Baseline' },
                { angle: 'Profile 45°', sub: 'Contour' },
                { angle: 'Cinematic 90°', sub: 'Rim Light' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#090611] border border-white/8 p-2 text-center group-hover:border-purple-500/30 transition-colors"
                >
                  <div className="h-14 rounded-lg bg-gradient-to-b from-purple-900/30 to-violet-950/40 flex items-center justify-center mb-1.5 border border-purple-500/15">
                    <Sparkles className="w-4 h-4 text-purple-300/80" />
                  </div>
                  <div className="text-[11px] font-medium text-white">{item.angle}</div>
                  <div className="text-[9px] text-neutral-500 font-mono">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: 7 Orchestrated Multi-Agents (5 Cols)                 */}
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
              Seven specialized LLM micro-agents collaborate in parallel to parse intent, optimize aesthetics, and ensure safety constraints.
            </p>

            {/* Micro-agent pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                'Vision Agent',
                'Twin Memory',
                'PBR Shading',
                'Prompt Expander',
                'Ethical Safety',
                '3D Mesh Generator',
                'Color Harmonizer'
              ].map((agent, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/8 text-[11px] text-neutral-300 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  {agent}
                </span>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 4: Real-time PBR Materials (6 Cols)                     */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-neutral-400">Ray-Traced Shaders</span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Dynamic PBR Material Lab
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Test dynamic subsurface scattering, metallic roughness, and iridescent fresnel glow in real time.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {materials.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setActiveMaterial(mat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeMaterial === mat
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-white/[0.05] text-neutral-300 hover:bg-white/[0.09] border border-white/8'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-[#090611] border border-white/8 flex items-center justify-between text-xs text-neutral-300">
              <span className="font-mono text-purple-300">Material Shader: {activeMaterial}</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" /> Ready for Export
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 5: Global Multi-Cloud GPU Stream (6 Cols)               */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-[#130f24] to-[#0c0916] border border-white/10 hover:border-purple-500/40 p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                Global Edge Cluster
              </span>
            </div>

            <h3 className="text-xl font-serif text-white font-normal">
              Sub-Second Latency & Multi-Modal Streaming
            </h3>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Distributed high-throughput H100 GPU clusters stream synthesized frames progressively directly to your browser viewport.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-white">120ms</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Average TTFT</div>
              </div>
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-purple-300">99.99%</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">SLA Uptime</div>
              </div>
              <div className="p-3 rounded-xl bg-[#090611] border border-white/8 text-center">
                <div className="text-xl font-serif font-medium text-pink-300">10M+</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Daily Frames</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
