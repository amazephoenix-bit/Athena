import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronDown, Sparkles, Star, ArrowRight, X, Wand2, Shield } from 'lucide-react';
import CanvasScrollSequence from '../components/landing/CanvasScrollSequence';
import LogoMarqueeSection from '../components/landing/LogoMarqueeSection';
import BentoGridSection from '../components/landing/BentoGridSection';
import ModelCreatorSection from '../components/landing/ModelCreatorSection';

export default function LandingPage() {
  const navigate = useNavigate();
  const heroScrollContainerRef = useRef(null);

  const [showPromptModal, setShowPromptModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedPrompt, setSelectedPrompt] = useState(
    'Ethereal cosmic synthesis of human consciousness and neural light, violet aurora stardust, photorealistic 8k'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewResult, setPreviewResult] = useState(null);

  const samplePrompts = [
    {
      title: 'Cosmic Genesis',
      prompt: 'Two ethereal hands reaching across nebula stardust, luminous violet lightning, cinematic Renaissance lighting',
      tag: 'Neural Synthesis'
    },
    {
      title: 'Athena AI Twin',
      prompt: 'Photorealistic cyberpunk digital twin, ultra-detailed violet iris, ambient holographic reflections, soft rim light',
      tag: 'Digital Avatar'
    },
    {
      title: 'Bioluminescent Dream',
      prompt: 'Ancient marble sculpture dissolving into glowing purple flora and stardust particles in deep void',
      tag: 'Generative Art'
    }
  ];

  const handleSimulateGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewResult('/hero-art.jpg');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#06040a] text-neutral-100 font-sans relative selection:bg-purple-600/30 selection:text-purple-200">
      {/* ============================================================ */}
      {/* TALL SCROLL-LINKED HERO CONTAINER (h-[400vh])                */}
      {/* ============================================================ */}
      <div ref={heroScrollContainerRef} className="relative w-full h-[400vh]">
        {/* Sticky full-screen viewport pinned during scroll */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* ============================================================ */}
          {/* 1. CINEMATIC FULL-SCREEN STICKY CANVAS SEQUENCE             */}
          {/* ============================================================ */}
          <CanvasScrollSequence
            containerRef={heroScrollContainerRef}
            totalFrames={50}
            framePrefix="/frames/ezgif-frame-"
            frameSuffix=".png"
          />

          {/* ============================================================ */}
          {/* 2. ATMOSPHERIC CINEMATIC DARK SHADOW BEHIND LEFT/CENTER TEXT */}
          {/* Strongest at 10-25% left, fading out toward 45-50%           */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: `
                radial-gradient(ellipse 70% 80% at 20% 45%, rgba(6, 4, 10, 0.90) 0%, rgba(6, 4, 10, 0.75) 25%, rgba(6, 4, 10, 0.35) 45%, transparent 60%),
                radial-gradient(circle at 50% 10%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
                linear-gradient(to bottom, rgba(6, 4, 10, 0.55) 0%, transparent 22%, transparent 70%, rgba(6, 4, 10, 0.92) 100%)
              `
            }}
          />

          {/* Subtle celestial dust overlay */}
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none z-[2]"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 70px 90px, rgba(216,180,254,0.7), rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 140px 60px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 190px 140px, rgba(192,132,252,0.6), rgba(0,0,0,0))`,
              backgroundSize: '240px 240px'
            }}
          />

          {/* ============================================================ */}
          {/* 3. HERO UI CONTENT OVERLAY                                   */}
          {/* ============================================================ */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex-1 flex flex-col justify-between">
            {/* TOP NAVIGATION BAR */}
            <header className="w-full flex items-center justify-between py-2">
              {/* Brand Name: ATHENA */}
              <Link
                to="/"
                className="text-white text-base sm:text-lg font-medium tracking-[0.28em] hover:text-purple-200 transition-colors uppercase select-none"
              >
                ATHENA
              </Link>

              {/* Centered Floating Pill Navigation */}
              <nav className="hidden md:flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#13101c]/80 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] text-[13px] text-neutral-300">
                {['Home', 'How It Works', 'Philosophy', 'Use Cases'].map((tab, idx, arr) => (
                  <div key={tab} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(tab);
                        if (tab === 'How It Works') setShowPromptModal(true);
                      }}
                      className={`px-3 py-1 rounded-full transition-all duration-200 ${
                        activeTab === tab
                          ? 'text-white font-medium bg-white/[0.08]'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                    {idx < arr.length - 1 && (
                      <span className="mx-1.5 text-neutral-600 text-[10px] select-none">•</span>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Navigation Actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Language Selector */}
                <div className="flex items-center gap-1 text-xs text-neutral-300 cursor-pointer hover:text-white transition-colors">
                  <span className="font-medium tracking-wider">EN</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                {/* Search Icon */}
                <button
                  type="button"
                  onClick={() => setShowPromptModal(true)}
                  aria-label="Search or explore prompts"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Direct App Launch Button */}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400" />
                </button>
              </div>
            </header>

            {/* HERO CENTER HEADLINE & ACTIONS */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-2 my-auto">
              {/* Availability-Style Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181228]/90 border border-purple-500/35 text-purple-200 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-5 sm:mb-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400 shadow-[0_0_8px_#a855f7]" />
                </span>
                <span>AI IMAGE GENERATOR</span>
              </div>

              {/* Bolder Headline with White -> Lavender Gradient & Soft Glow */}
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-[-0.015em] leading-[1.14] max-w-4xl mx-auto bg-gradient-to-r from-white via-[#f3e8ff] to-[#e9d5ff] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(216,180,254,0.32)]">
                A New Kind of Intelligence
                <br />
                <span className="italic font-light text-neutral-100">– Human at Heart</span>
              </h1>

              {/* Subtitle with High Readability */}
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base font-light leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Athena is a collaborative AI designed to elevate thought, co-create ideas, and synthesize hyper-realistic imagination. It's in sync with how you think, dream, and feel.
              </p>

              {/* Call to Action Button */}
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPromptModal(true)}
                  className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-neutral-950 font-medium text-sm sm:text-[15px] tracking-tight transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:shadow-[0_0_45px_rgba(255,255,255,0.38)] cursor-pointer"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Reviews & Social Proof */}
              <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-neutral-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <span className="font-light tracking-wide">Reviews 1,042</span>
                <div className="flex items-center gap-1.5" aria-label="Rated 5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] bg-[#ea580c] flex items-center justify-center shadow-sm"
                    >
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <span className="font-light tracking-wide text-neutral-200">Excellent Score</span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 4. DREAMFRAME MAIN VISUAL: 90vw WIDE AT BOTTOM               */}
            {/* With large elegant typography, white/lavender gradient,      */}
            {/* subtle pink glow, and soft depth shadow                      */}
            {/* ============================================================ */}
            <div className="w-full flex items-center justify-center pb-2 pointer-events-none select-none">
              <span
                className="w-[90vw] text-center font-serif font-light uppercase tracking-[0.16em] text-[11vw] leading-none bg-gradient-to-b from-white via-[#f5d0fe] to-[#c084fc] bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 35px rgba(244, 114, 182, 0.35)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.95))'
                }}
              >
                DREAMFRAME
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: INFINITE LOGO CAROUSELS                           */}
      {/* ============================================================ */}
      <LogoMarqueeSection />

      {/* ============================================================ */}
      {/* SECTION 2: BENTO GRID                                        */}
      {/* ============================================================ */}
      <BentoGridSection />

      {/* ============================================================ */}
      {/* SECTION 3: 3D MODEL CREATOR SECTION                          */}
      {/* ============================================================ */}
      <ModelCreatorSection />

      {/* ============================================================ */}
      {/* FOOTER SECTION                                               */}
      {/* ============================================================ */}
      <footer className="w-full py-12 bg-[#06040a] border-t border-white/10 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-neutral-300 uppercase font-medium">ATHENA</span>
            <span>•</span>
            <span>DreamFrame Neural Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-neutral-300 transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-neutral-300 transition-colors">Create Account</Link>
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
          <div>© {new Date().getFullYear()} Athena AI Inc. All rights reserved.</div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* INTERACTIVE "SEE HOW IT WORKS" MODAL                         */}
      {/* ============================================================ */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0f0c18] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPromptModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Athena AI Visual Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal">
              Experience Visual Co-Creation
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 mb-6">
              Prompt Athena's generative intelligence or test curated twin aesthetic presets.
            </p>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              {samplePrompts.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedPrompt(item.prompt)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPrompt === item.prompt
                      ? 'bg-purple-950/40 border-purple-500 text-white'
                      : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-purple-500/30'
                  }`}
                >
                  <span className="inline-block text-[10px] text-purple-300 uppercase tracking-widest font-mono mb-1">
                    {item.tag}
                  </span>
                  <div className="text-xs font-medium text-white">{item.title}</div>
                </button>
              ))}
            </div>

            {/* Prompt Input Box */}
            <div className="relative mb-5">
              <textarea
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                rows={3}
                placeholder="Describe your vision..."
                className="w-full bg-[#171324] border border-white/15 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Powered by Athena Multi-Agent Orchestrator</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSimulateGenerate}
                  disabled={isGenerating}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Synthesizing...' : 'Synthesize Image'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPromptModal(false);
                    navigate('/login');
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                >
                  <span>Launch Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Preview image if synthesized */}
            {previewResult && (
              <div className="mt-5 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-4">
                <img
                  src={previewResult}
                  alt="Generated Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-purple-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-purple-200 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Synthesis Rendered in 8K Neural Resolution
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {selectedPrompt}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
