import { Sparkles, Layers, Box, Cpu, Eye, Aperture, Compass, Globe, Hexagon, Zap, ShieldCheck } from 'lucide-react';

export default function LogoMarqueeSection() {
  const rowOneBrands = [
    { name: 'DreamFrame AI', icon: Aperture, label: 'Visual Synthesis' },
    { name: 'Athena Neural', icon: Cpu, label: 'Digital Twin' },
    { name: 'Omnicraft 3D', icon: Box, label: 'Mesh Generation' },
    { name: 'HyperTwin Labs', icon: Layers, label: 'Identity Models' },
    { name: 'QuantumArt', icon: Sparkles, label: '8K Render' },
    { name: 'PrismFlow', icon: Hexagon, label: 'Color Gradients' },
    { name: 'Synthetix', icon: Zap, label: 'Real-time Latency' },
  ];

  const rowTwoBrands = [
    { name: 'Lumina3D Engine', icon: Box, label: 'PBR Shading' },
    { name: 'Visionary Core', icon: Eye, label: 'Creative Studio' },
    { name: 'Nexus Sphere', icon: Globe, label: 'Global API' },
    { name: 'Aetheria Protocol', icon: ShieldCheck, label: 'Safe Guardrails' },
    { name: 'CosmoCraft', icon: Compass, label: 'Spatial AI' },
    { name: 'NovaScale AI', icon: Cpu, label: 'Multi-GPU Cluster' },
    { name: 'DreamCraft 8K', icon: Sparkles, label: 'Diffusion Core' },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#06040a] overflow-hidden border-t border-b border-purple-500/10">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-purple-900/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md mb-3">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Ecosystem & Partnerships</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-light text-neutral-200">
          Trusted by Next-Generation Creative Studios & AI Innovators
        </h3>
      </div>

      {/* Marquee Wrapper with horizontal mask fade at edges */}
      <div
        className="relative w-full flex flex-col gap-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)'
        }}
      >
        {/* ROW 1: Moves right → left continuously */}
        <div className="flex overflow-hidden select-none py-1">
          <div className="animate-marquee-left flex items-center gap-6 pr-6">
            {[...rowOneBrands, ...rowOneBrands].map((brand, i) => {
              const Icon = brand.icon;
              return (
                <div
                  key={`r1-${i}`}
                  className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-[#0f0c18]/80 border border-white/8 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 group hover:bg-[#161224]"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-purple-200 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors tracking-tight">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 tracking-wider uppercase">
                      {brand.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Moves left → right continuously */}
        <div className="flex overflow-hidden select-none py-1">
          <div className="animate-marquee-right flex items-center gap-6 pr-6">
            {[...rowTwoBrands, ...rowTwoBrands].map((brand, i) => {
              const Icon = brand.icon;
              return (
                <div
                  key={`r2-${i}`}
                  className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-[#0f0c18]/80 border border-white/8 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 group hover:bg-[#161224]"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-purple-200 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors tracking-tight">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 tracking-wider uppercase">
                      {brand.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
