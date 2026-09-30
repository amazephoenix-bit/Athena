import { useState } from 'react';
import { Box, Download, Eye, RotateCw, ZoomIn, ZoomOut, Layers, Sparkles, Sliders, CheckCircle2, ChevronRight, FileCode } from 'lucide-react';

export default function ModelCreatorSection() {
  const [wireframe, setWireframe] = useState(false);
  const [activeFormat, setActiveFormat] = useState('GLTF');
  const [subdivision, setSubdivision] = useState(3);
  const [lighting, setLighting] = useState('Studio Soft');
  const [zoomLevel, setZoomLevel] = useState(1);

  const formats = ['GLTF 2.0', 'USDZ (iOS AR)', 'FBX (Unreal/Unity)', 'OBJ + MTL'];
  const lightingPresets = ['Studio Soft', 'Cyber Violet', 'Sunset Gold', 'Neutral Ambient'];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#f4f5f8] text-neutral-900 overflow-hidden border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-300 text-purple-700 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-sm mb-4">
            <Box className="w-3.5 h-3.5 text-purple-600" />
            <span>3D Model Creator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-normal tracking-tight leading-tight">
            Turn Any 2D Synthesis into Production-Ready 3D Geometry
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Instantly convert conceptual artwork into clean quad-topology 3D meshes with automated UV unwrapping and full PBR material stacks.
          </p>
        </div>

        {/* 3D Studio Workspace */}
        <div className="rounded-3xl bg-white border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Studio Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-neutral-200 bg-neutral-50/70">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono font-medium text-neutral-500">
                DreamFrame 3D Viewport — v2.4 Native WebGL
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500">Lighting Environment:</span>
              <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 shadow-xs">
                {lightingPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setLighting(preset)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      lighting === preset
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Viewport Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            {/* LEFT TOOL PANEL (3 cols) */}
            <div className="lg:col-span-3 p-6 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/40 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  Mesh Synthesis Engine
                </h4>

                <div className="space-y-5">
                  {/* Subdivision Level */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-1.5">
                      <span>Subdivision Density</span>
                      <span className="font-mono text-purple-700 font-bold">{subdivision}x (High)</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={subdivision}
                      onChange={(e) => setSubdivision(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                      <span>Low Poly</span>
                      <span>Production</span>
                      <span>Sub-Pixel</span>
                    </div>
                  </div>

                  {/* Wireframe Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                      <Layers className="w-4 h-4 text-purple-600" />
                      <span>Wireframe Overlay</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWireframe(!wireframe)}
                      className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                        wireframe ? 'bg-purple-600' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          wireframe ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* PBR Layer Checklist */}
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                      Baked 4K Material Channels
                    </span>
                    <div className="space-y-2 text-xs text-neutral-700">
                      {['Albedo / Base Color', 'Normal Map (DirectX/OpenGL)', 'Roughness & Metallic', 'Ambient Occlusion', 'Height / Displacement'].map((map, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{map}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <span className="text-[11px] text-neutral-500 font-mono block">
                  Processing Time: 1.4s on H100 GPU
                </span>
              </div>
            </div>

            {/* CENTER VIEWPORT STAGE (6 cols) */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-gradient-to-b from-neutral-100/70 to-neutral-200/50 overflow-hidden">
              {/* Perspective grid floor */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)`,
                  backgroundSize: '36px 36px',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
              />

              {/* Viewport Floating Controls */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-lg p-1 shadow-xs z-20">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  className="p-1.5 rounded hover:bg-neutral-100 text-neutral-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  className="p-1.5 rounded hover:bg-neutral-100 text-neutral-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded hover:bg-neutral-100 text-neutral-700 font-mono text-[10px]"
                  title="Reset Orientation"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* The 3D Model Asset Frame */}
              <div
                className="relative z-10 transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `scale(${zoomLevel}) translateY(-10px)`,
                  filter: wireframe ? 'drop-shadow(0 20px 30px rgba(147,51,234,0.25))' : 'drop-shadow(0 25px 40px rgba(0,0,0,0.15))'
                }}
              >
                <img
                  src="/hero-3d.png"
                  alt="Athena 3D Model Plate with glowing purple accents"
                  className="w-80 sm:w-96 h-auto object-contain transition-all duration-300 hover:scale-105"
                />

                {/* Violet Edge Glow Overlay */}
                <div className="absolute -inset-2 bg-purple-500/10 rounded-3xl blur-xl -z-10 pointer-events-none" />
              </div>

              {/* Bottom floor label */}
              <div className="mt-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-[11px] font-mono text-neutral-500 shadow-xs z-10">
                Interactive Orthographic Camera • 35mm Equivalent
              </div>
            </div>

            {/* RIGHT METRICS & EXPORT PANEL (3 cols) */}
            <div className="lg:col-span-3 p-6 border-t lg:border-t-0 lg:border-l border-neutral-200 bg-neutral-50/40 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  Mesh Topology & Format
                </h4>

                {/* Mesh Stats */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Polygons</span>
                    <div className="text-lg font-bold text-neutral-900 font-mono mt-0.5">2,420,180</div>
                    <span className="text-[11px] text-emerald-600 font-medium">100% Quad Geometry</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Vertices</span>
                    <div className="text-lg font-bold text-neutral-900 font-mono mt-0.5">1,210,094</div>
                    <span className="text-[11px] text-neutral-500 font-medium">Non-manifold: 0</span>
                  </div>
                </div>

                {/* Export Formats */}
                <div>
                  <span className="text-xs font-semibold text-neutral-700 block mb-2">Target Format:</span>
                  <div className="space-y-1.5">
                    {formats.map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setActiveFormat(fmt)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                          activeFormat === fmt
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 opacity-80" />
                          <span>{fmt}</span>
                        </div>
                        {activeFormat === fmt && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download CTA Button */}
              <div className="pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-98 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export 3D Package (.zip)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
